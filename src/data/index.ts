import {
  AlphabetItem,
  ConversationScenario,
  CourseLevel,
  GrammarTopic,
  LanguageId,
  QuizQuestion,
  SentenceItem,
  VocabularyWord,
} from '../types';
import { MALAYALAM_ALPHABET } from './malayalam/alphabet';
import { MALAYALAM_CONVERSATIONS } from './malayalam/conversations';
import { MALAYALAM_COURSE_LEVELS } from './malayalam/courseLevels';
import { MALAYALAM_DAILY_SENTENCES } from './malayalam/dailyConversation';
import { MALAYALAM_GRAMMAR_TOPICS } from './malayalam/grammar';
import { MALAYALAM_QUIZZES } from './malayalam/quizzes';
import { MALAYALAM_VOCABULARY } from './malayalam/vocabulary';
import { OTHER_LANGUAGES_PACKAGES } from './otherLanguagesData';

export function getVocabularyForLanguage(langId: LanguageId): VocabularyWord[] {
  if (langId === 'malayalam') {
    return MALAYALAM_VOCABULARY;
  }
  const pkg = OTHER_LANGUAGES_PACKAGES[langId];
  if (pkg && pkg.vocabulary.length > 0) {
    return pkg.vocabulary;
  }
  // Fallback to sample items adapted
  return MALAYALAM_VOCABULARY;
}

export function getSentencesForLanguage(langId: LanguageId): SentenceItem[] {
  if (langId === 'malayalam') {
    return MALAYALAM_DAILY_SENTENCES;
  }
  const pkg = OTHER_LANGUAGES_PACKAGES[langId];
  if (pkg && pkg.sentences.length > 0) {
    return pkg.sentences;
  }
  return MALAYALAM_DAILY_SENTENCES;
}

export function getAlphabetForLanguage(langId: LanguageId): AlphabetItem[] {
  if (langId === 'malayalam') {
    return MALAYALAM_ALPHABET;
  }
  return [];
}

export function getCourseLevelsForLanguage(langId: LanguageId): CourseLevel[] {
  if (langId === 'malayalam') {
    return MALAYALAM_COURSE_LEVELS;
  }
  // Create modular starter level for other languages
  const vocabs = getVocabularyForLanguage(langId);
  const sentences = getSentencesForLanguage(langId);
  return [
    {
      id: `${langId}_lvl_1`,
      levelNumber: 1,
      title: 'Level 1: Essential Foundations',
      banglaTitle: 'লেভেল ১: প্রাথমিক বুনিয়াদ ও প্রয়োজনীয় শব্দ',
      description: 'দৈনন্দিন অভিবাদন ও প্রয়োজনীয় কথাবার্তা।',
      chapters: [
        {
          id: `${langId}_ch_1`,
          chapterNumber: 1,
          title: 'Chapter 1: Starter Phrases',
          banglaTitle: 'অধ্যায় ১: প্রথম বাক্য ও শব্দ',
          description: 'সহজ উচ্চারণ ও অনুবাদ।',
          lessons: [
            {
              id: `${langId}_l_1`,
              lessonNumber: 1,
              title: 'Greetings & Basics',
              banglaTitle: 'পাঠ ১: অভিবাদন ও সৌজন্য',
              estimatedMinutes: 6,
              content: {
                introductionBangla: 'এই পাঠে আমরা সবচেয়ে দরকারি কিছু শব্দ ও বাক্য শিখব।',
                vocabularyItems: vocabs.slice(0, 3),
                sentences: sentences.slice(0, 2),
              },
            },
          ],
        },
      ],
    },
  ];
}

export function getGrammarForLanguage(langId: LanguageId): GrammarTopic[] {
  if (langId === 'malayalam') {
    return MALAYALAM_GRAMMAR_TOPICS;
  }
  return [
    {
      id: `${langId}_g_intro`,
      title: 'Basic Sentence Structure',
      banglaTitle: 'প্রাথমিক বাক্য গঠন প্রণালী',
      summary: 'কীভাবে সহজে বাক্য সাজানো যায়।',
      explanation: 'দৈনন্দিন ব্যবহারের জন্য কর্তা, কর্ম ও ক্রিয়া সাজানোর সাধারণ নিয়মাবলী।',
      examples: [
        {
          target: 'Hello!',
          banglish: 'Hello',
          bangla: 'নমস্কার / শুভেচ্ছা',
          breakdown: 'প্রাথমিক অভিবাদন',
        },
      ],
    },
  ];
}

export function getConversationsForLanguage(langId: LanguageId): ConversationScenario[] {
  if (langId === 'malayalam') {
    return MALAYALAM_CONVERSATIONS;
  }
  return [
    {
      id: `${langId}_c_basic`,
      languageId: langId,
      title: 'First Greeting',
      banglaTitle: 'প্রথম সাক্ষাৎ',
      category: 'General',
      description: 'প্রাথমিক কথোপকথন',
      lines: [
        {
          id: 'gen_1',
          speaker: 'learner',
          speakerName: 'আপনি (You)',
          text: 'Hello, how are you?',
          banglish: 'Hello, how are you?',
          bangla: 'হ্যালো, আপনি কেমন আছেন?',
        },
        {
          id: 'gen_2',
          speaker: 'partner',
          speakerName: 'সাথী (Partner)',
          text: 'I am fine, thank you!',
          banglish: 'I am fine, thank you!',
          bangla: 'আমি ভালো আছি, ধন্যবাদ!',
        },
      ],
    },
  ];
}

export function getQuizzesForLanguage(langId: LanguageId): Record<string, QuizQuestion[]> {
  if (langId === 'malayalam') {
    return MALAYALAM_QUIZZES;
  }
  return {
    default_quiz: [
      {
        id: 'q_gen_1',
        type: 'mcq',
        prompt: '‘Hello’ এর বাংলা অর্থ কী?',
        options: ['হ্যালো / শুভেচ্ছা', 'ধন্যবাদ', 'বিদায়', 'পানি'],
        answer: 'হ্যালো / শুভেচ্ছা',
        explanationBangla: '‘Hello’ অভিবাদন জানাতে ব্যবহৃত হয়।',
      },
    ],
  };
}

export interface DailyLessonData {
  words: VocabularyWord[];
  sentences: SentenceItem[];
  grammar: GrammarTopic;
  listeningQuestion: QuizQuestion;
  speakingSentence: SentenceItem;
  quizQuestion: QuizQuestion;
}

export function getDailyLessonForLanguage(langId: LanguageId): DailyLessonData {
  const vocabs = getVocabularyForLanguage(langId);
  const sentences = getSentencesForLanguage(langId);
  const grammar = getGrammarForLanguage(langId);

  // 5 words, 3 sentences, 1 grammar topic, 1 listening exercise, 1 speaking exercise, 1 quiz
  const words = vocabs.slice(0, 5);
  const pickedSentences = sentences.slice(0, 3);
  const pickedGrammar = grammar[0];

  const listeningQuestion: QuizQuestion = {
    id: 'daily_listen_1',
    type: 'listen_choose',
    prompt: 'অডিও শুনে সঠিক অর্থ নির্বাচন করুন:',
    promptBangla: 'মনোযোগ দিয়ে অডিও শুনুন',
    audioText: words[0]?.word || 'നമസ്കാരം',
    options: [
      words[0]?.bangla || 'নমস্কার / শুভেচ্ছা',
      'ধন্যবাদ',
      'পানি',
      'কত টাকা?',
    ],
    answer: words[0]?.bangla || 'নমস্কার / শুভেচ্ছা',
    explanationBangla: `সঠিক উত্তর: ${words[0]?.word} (${words[0]?.banglish}) = ${words[0]?.bangla}`,
  };

  const speakingSentence: SentenceItem = pickedSentences[0] || {
    id: 'spk_default',
    languageId: langId,
    target: 'നമസ്കാരം, സുഖമാണോ?',
    banglish: 'Namaskaaram, sukhamaano?',
    bangla: 'নমস্কার, কেমন আছেন?',
    category: 'Greetings',
  };

  const quizQuestion: QuizQuestion = {
    id: 'daily_quiz_1',
    type: 'mcq',
    prompt: `‘${words[1]?.word || 'വെള്ളം'}’ এর বাংলা অর্থ কী?`,
    options: [
      words[1]?.bangla || 'পানি / জল',
      'চা',
      'ভাত',
      'টাকা',
    ],
    answer: words[1]?.bangla || 'পানি / জল',
    explanationBangla: `${words[1]?.word} এর অর্থ ${words[1]?.bangla}।`,
  };

  return {
    words,
    sentences: pickedSentences,
    grammar: pickedGrammar,
    listeningQuestion,
    speakingSentence,
    quizQuestion,
  };
}
