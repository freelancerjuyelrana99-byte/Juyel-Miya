import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
  getDocFromServer,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { UserProgress, LearnerNote } from '../types';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId); /* CRITICAL: The app will break without this line */
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test connection on startup
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or network unavailable.');
    }
  }
}
testConnection();

// Sign in with Google Popup
export async function signInWithGoogle(): Promise<User | null> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (err: any) {
    console.error('Google Sign-In Error:', err);
    throw err;
  }
}

// Sign out
export async function logOut(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (err) {
    console.error('Sign-out error:', err);
  }
}

// Sync progress to/from Firestore for authenticated users
export async function syncUserData(
  user: User,
  localProgress: UserProgress
): Promise<UserProgress> {
  const userDocPath = `users/${user.uid}`;
  try {
    const userRef = doc(db, 'users', user.uid);
    let docSnap;
    try {
      docSnap = await getDoc(userRef);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, userDocPath);
    }

    if (docSnap && docSnap.exists()) {
      const data = docSnap.data();
      // Fetch subcollection notes
      const notesPath = `users/${user.uid}/notes`;
      let cloudNotes: LearnerNote[] = [];
      try {
        const notesSnap = await getDocs(collection(db, 'users', user.uid, 'notes'));
        cloudNotes = notesSnap.docs.map((d) => d.data() as LearnerNote);
      } catch (e) {
        console.warn('Error fetching notes subcollection', e);
      }

      // Merge cloud and local data
      const merged: UserProgress = {
        selectedLanguage: data.selectedLanguage || localProgress.selectedLanguage,
        streak: Math.max(data.streak || 1, localProgress.streak || 1),
        lastActiveDate: data.lastActiveDate || localProgress.lastActiveDate,
        wordsLearned: Array.from(
          new Set([...(data.wordsLearned || []), ...(localProgress.wordsLearned || [])])
        ),
        completedLessons: Array.from(
          new Set([...(data.completedLessons || []), ...(localProgress.completedLessons || [])])
        ),
        quizzesCompleted: data.quizzesCompleted || localProgress.quizzesCompleted || [],
        speakingPracticedCount:
          (data.speakingPracticedCount || 0) + (localProgress.speakingPracticedCount || 0),
        listeningPracticedCount:
          (data.listeningPracticedCount || 0) + (localProgress.listeningPracticedCount || 0),
        favorites: Array.from(
          new Set([...(data.favorites || []), ...(localProgress.favorites || [])])
        ),
        notes: cloudNotes.length > 0 ? cloudNotes : localProgress.notes,
      };

      // Update cloud with merged state
      await setDoc(userRef, {
        userId: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        selectedLanguage: merged.selectedLanguage,
        streak: merged.streak,
        lastActiveDate: merged.lastActiveDate,
        wordsLearned: merged.wordsLearned,
        completedLessons: merged.completedLessons,
        favorites: merged.favorites,
        speakingPracticedCount: merged.speakingPracticedCount,
        listeningPracticedCount: merged.listeningPracticedCount,
        updatedAt: new Date().toISOString(),
      }, { merge: true });

      return merged;
    } else {
      // First time user, save current progress to Firestore
      const initialCloudProfile = {
        userId: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        selectedLanguage: localProgress.selectedLanguage,
        streak: localProgress.streak,
        lastActiveDate: localProgress.lastActiveDate,
        wordsLearned: localProgress.wordsLearned,
        completedLessons: localProgress.completedLessons,
        favorites: localProgress.favorites,
        speakingPracticedCount: localProgress.speakingPracticedCount,
        listeningPracticedCount: localProgress.listeningPracticedCount,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await setDoc(userRef, initialCloudProfile);

      // Save initial notes if any
      for (const note of localProgress.notes) {
        const noteRef = doc(db, 'users', user.uid, 'notes', note.id);
        await setDoc(noteRef, { ...note, userId: user.uid });
      }

      return localProgress;
    }
  } catch (err) {
    console.error('Error during cloud progress sync:', err);
    return localProgress;
  }
}

// Save single note to Firestore
export async function saveCloudNote(userId: string, note: LearnerNote) {
  const path = `users/${userId}/notes/${note.id}`;
  try {
    const ref = doc(db, 'users', userId, 'notes', note.id);
    await setDoc(ref, { ...note, userId });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// Delete single note from Firestore
export async function deleteCloudNote(userId: string, noteId: string) {
  const path = `users/${userId}/notes/${noteId}`;
  try {
    const ref = doc(db, 'users', userId, 'notes', noteId);
    await deleteDoc(ref);
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}
