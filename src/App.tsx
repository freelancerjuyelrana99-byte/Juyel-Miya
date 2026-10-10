import React, { useState, useEffect } from 'react';
import { Navbar, NavPage } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { LanguagesPage } from './pages/LanguagesPage';
import { CoursesPage } from './pages/CoursesPage';
import { LessonReaderPage } from './pages/LessonReaderPage';
import { AlphabetPage } from './pages/AlphabetPage';
import { VocabularyPage } from './pages/VocabularyPage';
import { DailyConversationPage } from './pages/DailyConversationPage';
import { SpeakingPracticePage } from './pages/SpeakingPracticePage';
import { ListeningPracticePage } from './pages/ListeningPracticePage';
import { RoleplayPage } from './pages/RoleplayPage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { QuizPage } from './pages/QuizPage';
import { GrammarPage } from './pages/GrammarPage';
import { ProgressPage } from './pages/ProgressPage';
import { NotesAndSavedPage } from './pages/NotesAndSavedPage';
import { SettingsPage } from './pages/SettingsPage';
import { KeralaChatbotPage } from './pages/KeralaChatbotPage';
import { VoiceSettingsModal } from './components/VoiceSettingsModal';
import { AITutorModal } from './components/AITutorModal';
import { DailyLessonModal } from './components/DailyLessonModal';

import {
  CourseLesson,
  CourseLevel,
  LanguageMetadata,
  LearnerNote,
  UserProgress,
  VoiceSettings,
} from './types';
import { BASE_LANGUAGES, getLanguageById } from './data/languages';
import {
  loadUserProgress,
  saveUserProgress,
  loadVoiceSettings,
  saveVoiceSettings,
} from './services/storageService';
import { getCourseLevelsForLanguage } from './data';
import { Sparkles, Flame, Bot } from 'lucide-react';
import { User, onAuthStateChanged } from 'firebase/auth';
import {
  auth,
  signInWithGoogle,
  logOut,
  syncUserData,
  saveCloudNote,
  deleteCloudNote,
} from './services/firebase';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [progress, setProgress] = useState<UserProgress>(() => loadUserProgress('malayalam'));
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>(() => loadVoiceSettings());
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Listen to Firebase Auth state
  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setCurrentUser(user);
        if (user) {
          try {
            const synced = await syncUserData(user, progress);
            setProgress(synced);
            saveUserProgress(synced);
          } catch (e) {
            console.error('Error syncing user data on sign in:', e);
          }
        }
      });
      return () => unsubscribe();
    } catch (err) {
      console.warn('Firebase auth listener failed to initialize:', err);
    }
  }, []);

  const currentLanguage: LanguageMetadata = getLanguageById(progress.selectedLanguage || 'malayalam');

  // Currently opened lesson details
  const [selectedLessonContext, setSelectedLessonContext] = useState<{
    lesson: CourseLesson;
    level: CourseLevel;
    chapterTitle: string;
  } | null>(() => {
    const levels = getCourseLevelsForLanguage('malayalam');
    const firstLvl = levels[0];
    const firstCh = firstLvl?.chapters[0];
    const firstLess = firstCh?.lessons[0];
    if (firstLess && firstLvl && firstCh) {
      return {
        lesson: firstLess,
        level: firstLvl,
        chapterTitle: firstCh.title,
      };
    }
    return null;
  });

  // Modals state
  const [isVoiceSettingsOpen, setIsVoiceSettingsOpen] = useState(false);
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [isDailyLessonOpen, setIsDailyLessonOpen] = useState(false);

  // Sync progress changes to LocalStorage
  const updateProgress = (updater: (prev: UserProgress) => UserProgress) => {
    setProgress((prev) => {
      const next = updater(prev);
      saveUserProgress(next);
      return next;
    });
  };

  const handleSelectLanguage = (lang: LanguageMetadata) => {
    updateProgress((prev) => ({
      ...prev,
      selectedLanguage: lang.id,
    }));
  };

  const handleToggleFavorite = (id: string) => {
    updateProgress((prev) => {
      const exists = prev.favorites.includes(id);
      return {
        ...prev,
        favorites: exists
          ? prev.favorites.filter((favId) => favId !== id)
          : [...prev.favorites, id],
      };
    });
  };

  const handleCompleteLesson = (lessonId: string) => {
    updateProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      };
    });
  };

  const handleMarkWordLearned = (wordId: string) => {
    updateProgress((prev) => {
      if (prev.wordsLearned.includes(wordId)) return prev;
      return {
        ...prev,
        wordsLearned: [...prev.wordsLearned, wordId],
      };
    });
  };

  const handleRecordQuizResult = (quizId: string, score: number, total: number) => {
    updateProgress((prev) => ({
      ...prev,
      quizzesCompleted: [
        ...prev.quizzesCompleted.filter((q) => q.quizId !== quizId),
        { quizId, score, total, date: new Date().toISOString() },
      ],
    }));
  };

  const handleIncrementSpeakingCount = () => {
    updateProgress((prev) => ({
      ...prev,
      speakingPracticedCount: (prev.speakingPracticedCount || 0) + 1,
    }));
  };

  const handleIncrementListeningCount = () => {
    updateProgress((prev) => ({
      ...prev,
      listeningPracticedCount: (prev.listeningPracticedCount || 0) + 1,
    }));
  };

  const handleSaveNote = (note: LearnerNote) => {
    updateProgress((prev) => ({
      ...prev,
      notes: [note, ...prev.notes.filter((n) => n.id !== note.id)],
    }));
    if (currentUser) {
      saveCloudNote(currentUser.uid, note).catch((e) =>
        console.warn('Cloud note save error:', e)
      );
    }
  };

  const handleDeleteNote = (id: string) => {
    updateProgress((prev) => ({
      ...prev,
      notes: prev.notes.filter((n) => n.id !== id),
    }));
    if (currentUser) {
      deleteCloudNote(currentUser.uid, id).catch((e) =>
        console.warn('Cloud note delete error:', e)
      );
    }
  };

  const handleResetProgress = () => {
    const fresh: UserProgress = {
      selectedLanguage: currentLanguage.id,
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      wordsLearned: [],
      completedLessons: [],
      quizzesCompleted: [],
      speakingPracticedCount: 0,
      listeningPracticedCount: 0,
      favorites: [],
      notes: [],
    };
    setProgress(fresh);
    saveUserProgress(fresh);
  };

  const handleUpdateVoiceSettings = (newSettings: VoiceSettings) => {
    setVoiceSettings(newSettings);
    saveVoiceSettings(newSettings);
  };

  const handleOpenLesson = (
    lesson: CourseLesson,
    level: CourseLevel,
    chapterTitle: string
  ) => {
    setSelectedLessonContext({ lesson, level, chapterTitle });
    setCurrentPage('lesson');
  };

  const handleCompleteDailyLesson = () => {
    updateProgress((prev) => ({
      ...prev,
      dailyLessonCompletedDate: new Date().toISOString().split('T')[0],
      streak: prev.streak + 1,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900 pb-20 lg:pb-0">
      {/* Navigation Top Bar & Mobile bottom bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(p) => setCurrentPage(p)}
        currentLanguage={currentLanguage}
        onOpenVoiceSettings={() => setIsVoiceSettingsOpen(true)}
        onOpenAITutor={() => setIsAITutorOpen(true)}
        currentUser={currentUser}
        onSignInGoogle={signInWithGoogle}
        onSignOut={logOut}
      />

      {/* Floating Daily Lesson Quick Action Bar */}
      {(currentPage === 'home' || currentPage === 'courses') && (
        <aside aria-label="আজকের বিশেষ পাঠ" className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white border-b border-emerald-900/40 py-2.5 px-4 shadow-xs">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-white/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              </span>
              <span className="font-semibold">আজকের বিশেষ পাঠ (Daily Lesson):</span>
              <span className="text-emerald-100 hidden sm:inline">
                ৫টি নতুন শব্দ · ৩টি বাক্য · ব্যাকরণ · কুইজ
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsDailyLessonOpen(true)}
              className="px-3.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-xs"
            >
              Start Today's Lesson →
            </button>
          </div>
        </aside>
      )}

      {/* Page Routing Engine */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6 sm:pt-8">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={(p) => setCurrentPage(p)}
            onSelectLanguage={handleSelectLanguage}
            currentLanguage={currentLanguage}
            progress={progress}
            voiceSettings={voiceSettings}
          />
        )}

        {currentPage === 'languages' && (
          <LanguagesPage
            currentLanguage={currentLanguage}
            onSelectLanguage={handleSelectLanguage}
            onNavigate={(p) => setCurrentPage(p)}
          />
        )}

        {currentPage === 'courses' && (
          <CoursesPage
            currentLanguage={currentLanguage}
            progress={progress}
            onSelectLesson={handleOpenLesson}
            onNavigate={(p) => setCurrentPage(p)}
          />
        )}

        {currentPage === 'lesson' && selectedLessonContext && (
          <LessonReaderPage
            lesson={selectedLessonContext.lesson}
            level={selectedLessonContext.level}
            chapterTitle={selectedLessonContext.chapterTitle}
            language={currentLanguage}
            progress={progress}
            onCompleteLesson={handleCompleteLesson}
            onNavigate={(p) => setCurrentPage(p)}
            voiceSettings={voiceSettings}
          />
        )}

        {currentPage === 'alphabet' && (
          <AlphabetPage voiceSettings={voiceSettings} />
        )}

        {currentPage === 'vocabulary' && (
          <VocabularyPage
            language={currentLanguage}
            progress={progress}
            onToggleFavorite={handleToggleFavorite}
            voiceSettings={voiceSettings}
          />
        )}

        {currentPage === 'daily_conversation' && (
          <DailyConversationPage
            language={currentLanguage}
            progress={progress}
            onToggleFavorite={handleToggleFavorite}
            voiceSettings={voiceSettings}
          />
        )}

        {currentPage === 'speaking' && (
          <SpeakingPracticePage
            language={currentLanguage}
            voiceSettings={voiceSettings}
            onIncrementSpeakingCount={handleIncrementSpeakingCount}
          />
        )}

        {currentPage === 'listening' && (
          <ListeningPracticePage
            language={currentLanguage}
            voiceSettings={voiceSettings}
            onIncrementListeningCount={handleIncrementListeningCount}
          />
        )}

        {currentPage === 'roleplay' && (
          <RoleplayPage
            language={currentLanguage}
            voiceSettings={voiceSettings}
          />
        )}

        {currentPage === 'flashcards' && (
          <FlashcardsPage
            language={currentLanguage}
            progress={progress}
            onToggleFavorite={handleToggleFavorite}
            onMarkWordLearned={handleMarkWordLearned}
            voiceSettings={voiceSettings}
          />
        )}

        {currentPage === 'quiz' && (
          <QuizPage
            language={currentLanguage}
            voiceSettings={voiceSettings}
            onRecordQuizResult={handleRecordQuizResult}
            onNavigate={(p) => setCurrentPage(p)}
          />
        )}

        {currentPage === 'grammar' && (
          <GrammarPage
            language={currentLanguage}
            voiceSettings={voiceSettings}
          />
        )}

        {currentPage === 'progress' && (
          <ProgressPage
            language={currentLanguage}
            progress={progress}
            onResetProgress={handleResetProgress}
            onNavigate={(p) => setCurrentPage(p)}
          />
        )}

        {currentPage === 'notes' && (
          <NotesAndSavedPage
            language={currentLanguage}
            progress={progress}
            onToggleFavorite={handleToggleFavorite}
            onSaveNote={handleSaveNote}
            onDeleteNote={handleDeleteNote}
            voiceSettings={voiceSettings}
          />
        )}

        {currentPage === 'settings' && (
          <SettingsPage
            language={currentLanguage}
            voiceSettings={voiceSettings}
            onUpdateVoiceSettings={handleUpdateVoiceSettings}
            onResetProgress={handleResetProgress}
          />
        )}

        {currentPage === 'chatbot' && (
          <KeralaChatbotPage voiceSettings={voiceSettings} />
        )}
      </main>

      {/* Floating Action Button: Kerala Voice Chatbot */}
      {currentPage !== 'chatbot' && (
        <button
          type="button"
          onClick={() => {
            setCurrentPage('chatbot');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-40 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 border-2 border-white/30 group cursor-pointer"
          title="কেরালা ভয়েজ চ্যাটবট (বাংলায় বলুন, মালয়ালমে শুনুন)"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-amber-300" />
            <span className="w-2.5 h-2.5 bg-rose-500 rounded-full absolute -top-1 -right-1 animate-ping" />
            <span className="w-2.5 h-2.5 bg-rose-500 rounded-full absolute -top-1 -right-1" />
          </div>
          <span className="hidden sm:inline font-bold text-sm tracking-tight font-bangla">
            কেরালা চ্যাটবট (ভয়েজ)
          </span>
        </button>
      )}

      {/* Global Modals */}
      <VoiceSettingsModal
        isOpen={isVoiceSettingsOpen}
        onClose={() => setIsVoiceSettingsOpen(false)}
        settings={voiceSettings}
        onUpdateSettings={handleUpdateVoiceSettings}
        currentLocale={currentLanguage.voiceCode}
      />

      <AITutorModal
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
        language={currentLanguage}
        onOpenFullChatbot={() => setCurrentPage('chatbot')}
      />

      <DailyLessonModal
        isOpen={isDailyLessonOpen}
        onClose={() => setIsDailyLessonOpen(false)}
        language={currentLanguage}
        voiceSettings={voiceSettings}
        onCompleteDailyLesson={handleCompleteDailyLesson}
      />

      {/* Minimal Footer */}
      <footer className="border-t border-slate-200 mt-20 py-8 text-center text-xs text-slate-500 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} LingoBangla — বাংলা থেকে যেকোনো ভাষা শেখার উন্মুক্ত প্ল্যাটফর্ম</p>
          <div className="flex items-center gap-4 text-slate-600">
            <span>মালয়ালম বিশেষ কোর্স</span>
            <span>·</span>
            <span>অফলাইন-ফার্স্ট স্পিচ ইঞ্জিন</span>
            <span>·</span>
            <span>কোনো এপিআই কি প্রয়োজন নেই</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
