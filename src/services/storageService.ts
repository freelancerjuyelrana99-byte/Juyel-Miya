import { LanguageId, LearnerNote, UserProgress, VoiceSettings } from '../types';

const PROGRESS_KEY = 'lingobangla_user_progress_v1';
const VOICE_KEY = 'lingobangla_voice_settings_v1';

const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  rate: 0.95,
  pitch: 1.0,
  volume: 1.0,
  slowMode: false,
  preferredVoiceName: '',
};

function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function calculateStreak(lastDate: string, currentStreak: number): { streak: number; today: string } {
  const today = getTodayString();
  if (!lastDate) {
    return { streak: 1, today };
  }
  if (lastDate === today) {
    return { streak: currentStreak, today };
  }

  const last = new Date(lastDate);
  const now = new Date(today);
  const diffTime = Math.abs(now.getTime() - last.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return { streak: currentStreak + 1, today };
  } else if (diffDays > 1) {
    // Streak reset if missed a day
    return { streak: 1, today };
  }
  return { streak: currentStreak, today };
}

export function loadUserProgress(initialLang: LanguageId = 'malayalam'): UserProgress {
  if (typeof window === 'undefined') {
    return {
      selectedLanguage: initialLang,
      streak: 1,
      lastActiveDate: getTodayString(),
      wordsLearned: [],
      completedLessons: [],
      quizzesCompleted: [],
      speakingPracticedCount: 0,
      listeningPracticedCount: 0,
      favorites: [],
      notes: [],
    };
  }

  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) {
      const init: UserProgress = {
        selectedLanguage: initialLang,
        streak: 1,
        lastActiveDate: getTodayString(),
        wordsLearned: ['ml_namaskaaram', 'ml_sukham', 'ml_nandi'],
        completedLessons: ['ml_lvl1_ch1_l1'],
        quizzesCompleted: [],
        speakingPracticedCount: 0,
        listeningPracticedCount: 0,
        favorites: ['ml_namaskaaram'],
        notes: [
          {
            id: 'note_1',
            title: 'কেরালা ভ্রমণের প্রাথমিক অভিবাদন',
            content: 'নমস্কার = Namaskaaram (നമസ്കാരം)\nধন্যবাদ = Nandi (നന്ദി)\nকেমন আছেন? = Sukhamaano? (സുഖമാണോ?)',
            languageId: 'malayalam',
            createdAt: new Date().toLocaleDateString('bn-BD'),
          },
        ],
      };
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(init));
      return init;
    }

    const data: UserProgress = JSON.parse(raw);
    const { streak, today } = calculateStreak(data.lastActiveDate, data.streak || 1);
    data.streak = streak;
    data.lastActiveDate = today;
    return data;
  } catch (e) {
    console.error('Error loading progress from localStorage', e);
    return {
      selectedLanguage: initialLang,
      streak: 1,
      lastActiveDate: getTodayString(),
      wordsLearned: [],
      completedLessons: [],
      quizzesCompleted: [],
      speakingPracticedCount: 0,
      listeningPracticedCount: 0,
      favorites: [],
      notes: [],
    };
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    progress.lastActiveDate = getTodayString();
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving progress to localStorage', e);
  }
}

export function loadVoiceSettings(): VoiceSettings {
  if (typeof window === 'undefined') return DEFAULT_VOICE_SETTINGS;
  try {
    const raw = localStorage.getItem(VOICE_KEY);
    if (!raw) return DEFAULT_VOICE_SETTINGS;
    return { ...DEFAULT_VOICE_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_VOICE_SETTINGS;
  }
}

export function saveVoiceSettings(settings: VoiceSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(VOICE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving voice settings', e);
  }
}
