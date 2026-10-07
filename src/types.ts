export type LanguageId =
  | 'malayalam'
  | 'english'
  | 'hindi'
  | 'arabic'
  | 'japanese'
  | 'korean'
  | 'spanish'
  | 'french'
  | 'german'
  | 'tamil'
  | 'telugu'
  | 'urdu'
  | 'chinese'
  | 'italian'
  | 'kannada'
  | string;

export interface LanguageMetadata {
  id: LanguageId;
  name: string;
  nativeName: string;
  banglaName: string;
  flag: string;
  voiceCode: string;
  levelCount: number;
  description: string;
  banglaSubtitle: string;
  scriptName: string;
  greetingExample: {
    target: string;
    banglish: string;
    bangla: string;
  };
  isFeatured?: boolean;
}

export interface VocabularyWord {
  id: string;
  languageId: LanguageId;
  word: string;
  banglish: string;
  bangla: string;
  category: string;
  exampleSentence?: string;
  exampleBanglish?: string;
  exampleBangla?: string;
  level?: number;
}

export interface SentenceItem {
  id: string;
  languageId: LanguageId;
  target: string;
  banglish: string;
  bangla: string;
  category: string;
  words?: {
    target: string;
    banglish: string;
    bangla: string;
  }[];
}

export interface AlphabetItem {
  id: string;
  letter: string;
  sound: string;
  banglish: string;
  banglaExplanation: string;
  exampleWord: string;
  exampleBanglish: string;
  exampleBangla: string;
  category: 'vowel' | 'consonant' | 'chillu' | 'other';
}

export interface CourseLevel {
  id: string;
  levelNumber: number;
  title: string;
  banglaTitle: string;
  description: string;
  chapters: CourseChapter[];
}

export interface CourseChapter {
  id: string;
  chapterNumber: number;
  title: string;
  banglaTitle: string;
  description: string;
  lessons: CourseLesson[];
  quizId?: string;
}

export interface CourseLesson {
  id: string;
  lessonNumber: number;
  title: string;
  banglaTitle: string;
  estimatedMinutes: number;
  content: {
    introductionBangla: string;
    keyPoints?: string[];
    vocabularyItems?: VocabularyWord[];
    sentences?: SentenceItem[];
    grammarNote?: {
      title: string;
      explanation: string;
      examples: { target: string; banglish: string; bangla: string }[];
    };
    practicePrompt?: string;
  };
  quickQuiz?: QuizQuestion[];
}

export type QuizQuestionType =
  | 'mcq'
  | 'translation'
  | 'fill_blank'
  | 'matching'
  | 'listen_choose'
  | 'word_order';

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  prompt: string;
  promptBangla?: string;
  audioText?: string;
  options?: string[];
  answer: string | string[];
  explanationBangla: string;
  words?: string[]; // For word ordering
  pairs?: { left: string; right: string }[]; // For matching
}

export interface ConversationLine {
  id: string;
  speaker: 'learner' | 'partner' | string;
  speakerName: string;
  text: string;
  banglish: string;
  bangla: string;
  words?: {
    target: string;
    banglish: string;
    bangla: string;
  }[];
}

export interface ConversationScenario {
  id: string;
  languageId: LanguageId;
  title: string;
  banglaTitle: string;
  category: string;
  description: string;
  lines: ConversationLine[];
}

export interface GrammarTopic {
  id: string;
  title: string;
  banglaTitle: string;
  summary: string;
  explanation: string;
  examples: {
    target: string;
    banglish: string;
    bangla: string;
    breakdown?: string;
  }[];
  tips?: string[];
}

export interface LearnerNote {
  id: string;
  title: string;
  content: string;
  languageId: LanguageId;
  createdAt: string;
}

export interface UserProgress {
  selectedLanguage: LanguageId;
  streak: number;
  lastActiveDate: string;
  wordsLearned: string[];
  completedLessons: string[];
  quizzesCompleted: {
    quizId: string;
    score: number;
    total: number;
    date: string;
  }[];
  speakingPracticedCount: number;
  listeningPracticedCount: number;
  favorites: string[]; // vocabulary/sentence IDs
  notes: LearnerNote[];
  dailyLessonCompletedDate?: string;
}

export interface VoiceSettings {
  rate: number; // 0.5 to 1.5
  pitch: number; // 0.8 to 1.2
  volume: number; // 0 to 1
  slowMode: boolean; // beginners mode 🐢 (0.65x)
  preferredVoiceName: string;
}
