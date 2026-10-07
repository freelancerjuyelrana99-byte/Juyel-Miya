import { LanguageMetadata } from '../types';

export const BASE_LANGUAGES: LanguageMetadata[] = [
  {
    id: 'malayalam',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    banglaName: 'মালয়ালম',
    flag: '🇮🇳',
    voiceCode: 'ml-IN',
    levelCount: 10,
    description: 'কেরালার মানুষের সাথে স্বাভাবিকভাবে কথা বলার জন্য সম্পূর্ণ কোর্স।',
    banglaSubtitle: 'কেরালার ভাষা শেখা শুরু করো',
    scriptName: 'Malayalam Script',
    greetingExample: {
      target: 'നമസ്കാരം',
      banglish: 'Namaskaaram',
      bangla: 'নমস্কার / আসসালামু আলাইকুম',
    },
    isFeatured: true,
  },
  {
    id: 'english',
    name: 'English',
    nativeName: 'English',
    banglaName: 'ইংরেজি',
    flag: '🇬🇧',
    voiceCode: 'en-US',
    levelCount: 8,
    description: 'আন্তর্জাতিক যোগাযোগ, চাকরি ও ইন্টারভিউয়ের জন্য স্পোকেন ইংলিশ।',
    banglaSubtitle: 'দৈনন্দিন ও ক্যারিয়ার স্পোকেন ইংলিশ',
    scriptName: 'Latin Script',
    greetingExample: {
      target: 'Hello, how are you?',
      banglish: 'Hello, how are you?',
      bangla: 'হ্যালো, আপনি কেমন আছেন?',
    },
  },
  {
    id: 'hindi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    banglaName: 'হিন্দি',
    flag: '🇮🇳',
    voiceCode: 'hi-IN',
    levelCount: 8,
    description: 'ভারত ভ্রমণ, ব্যবসা ও সিনেমা-কথোপকথনের জন্য সহজ হিন্দি।',
    banglaSubtitle: 'সহজেই হিন্দি বলা শিখুন',
    scriptName: 'Devanagari',
    greetingExample: {
      target: 'नमस्ते, आप कैसे हैं?',
      banglish: 'Namaste, aap kaise hain?',
      bangla: 'নমস্তে, আপনি কেমন আছেন?',
    },
  },
  {
    id: 'arabic',
    name: 'Arabic',
    nativeName: 'العربية',
    banglaName: 'আরবি',
    flag: '🇸🇦',
    voiceCode: 'ar-SA',
    levelCount: 8,
    description: 'মধ্যপ্রাচ্যে কাজ, ভ্রমণ ও ধর্মীয় শিক্ষার জন্য কথ্য আরবি।',
    banglaSubtitle: 'উপসাগরীয় কথ্য আরবি ও প্রয়োজনীয় শব্দ',
    scriptName: 'Arabic Script',
    greetingExample: {
      target: 'مرحبا، كيف حالك؟',
      banglish: 'Marhaban, kayfa haluk?',
      bangla: 'মারহাবা, আপনি কেমন আছেন?',
    },
  },
  {
    id: 'urdu',
    name: 'Urdu',
    nativeName: 'اردو',
    banglaName: 'উর্দু',
    flag: '🇵🇰',
    voiceCode: 'ur-PK',
    levelCount: 6,
    description: 'সুন্দর উচ্চারণ ও সাহিত্যিক বা কথ্য উর্দু আলাপচারিতা।',
    banglaSubtitle: 'সহজ উর্দু কথোপকথন',
    scriptName: 'Nastaliq / Perso-Arabic',
    greetingExample: {
      target: 'آداب، آپ کیسے ہیں؟',
      banglish: 'Aadaab, aap kaise hain?',
      bangla: 'আদাব, আপনি কেমন আছেন?',
    },
  },
  {
    id: 'tamil',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    banglaName: 'তামিল',
    flag: '🇮🇳',
    voiceCode: 'ta-IN',
    levelCount: 6,
    description: 'তামিলনাড়ু ও চেন্নাইয়ে ভ্রমণ ও কাজের জন্য কথ্য তামিল।',
    banglaSubtitle: 'দক্ষিণ ভারতের জনপ্রিয় তামিল ভাষা',
    scriptName: 'Tamil Script',
    greetingExample: {
      target: 'வணக்கம், எப்படி இருக்கிறீர்கள்?',
      banglish: 'Vanakkam, eppadi irukkeenga?',
      bangla: 'বণক্কম, আপনি কেমন আছেন?',
    },
  },
  {
    id: 'telugu',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    banglaName: 'তেলেগু',
    flag: '🇮🇳',
    voiceCode: 'te-IN',
    levelCount: 5,
    description: 'হায়দ্রাবাদ ও অন্ধ্রপ্রদেশে বসবাস ও যোগাযোগের জন্য।',
    banglaSubtitle: 'তেলেগু সহজ বচন ও শব্দভাণ্ডার',
    scriptName: 'Telugu Script',
    greetingExample: {
      target: 'నమస్కారం, మీరు ఎలా ఉన్నారు?',
      banglish: 'Namaskaram, meeru ela unnaru?',
      bangla: 'নমস্কারম, আপনি কেমন আছেন?',
    },
  },
  {
    id: 'kannada',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    banglaName: 'কন্নড়',
    flag: '🇮🇳',
    voiceCode: 'kn-IN',
    levelCount: 5,
    description: 'ব্যাঙ্গালোর ও কর্ণাটকে দৈনন্দিন চলাফেরার জন্য কন্নড়।',
    banglaSubtitle: 'ব্যাঙ্গালোর প্রবাসীদের জন্য প্রয়োজনীয় কন্নড়',
    scriptName: 'Kannada Script',
    greetingExample: {
      target: 'ನಮಸ್ಕಾರ, ನೀವು ಹೇಗಿದ್ದೀರಿ?',
      banglish: 'Namaskara, neevu hegiddiri?',
      bangla: 'নমস্কারা, আপনি কেমন আছেন?',
    },
  },
  {
    id: 'japanese',
    name: 'Japanese',
    nativeName: '日本語',
    banglaName: 'জাপানি',
    flag: '🇯🇵',
    voiceCode: 'ja-JP',
    levelCount: 7,
    description: 'জাপানে উচ্চশিক্ষা, চাকরি ও অ্যানিমে বোঝার জন্য বেসিক জাপানিজ।',
    banglaSubtitle: 'হিরাগানা, কাতাকানা ও বাস্তব কথোপকথন',
    scriptName: 'Kanji / Kana',
    greetingExample: {
      target: 'こんにちは、お元気ですか？',
      banglish: 'Konnichiwa, o-genki desu ka?',
      bangla: 'কোন্নিচিওয়া, আপনি কেমন আছেন?',
    },
  },
  {
    id: 'korean',
    name: 'Korean',
    nativeName: '한국어',
    banglaName: 'কোরিয়ান',
    flag: '🇰🇷',
    voiceCode: 'ko-KR',
    levelCount: 7,
    description: 'হাঙ্গুল বর্ণমালা, কে-ড্রামা ও দক্ষিণ কোরিয়ায় জীবনযাপন।',
    banglaSubtitle: 'সহজ হাঙ্গুল ও বাস্তব বাক্য',
    scriptName: 'Hangul',
    greetingExample: {
      target: '안녕하세요, 잘 지내세요?',
      banglish: 'Annyeonghaseyo, jal jinaeseyo?',
      bangla: 'আন্নিয়ংহাসেয়ো, আপনি ভালো আছেন?',
    },
  },
  {
    id: 'chinese',
    name: 'Chinese',
    nativeName: '中文',
    banglaName: 'চীনা (ম্যান্ডারিন)',
    flag: '🇨🇳',
    voiceCode: 'zh-CN',
    levelCount: 6,
    description: 'ব্যবসা ও আন্তর্জাতিক বাণিজ্যের জন্য পিনয়িন ও মৌলিক ম্যান্ডারিন।',
    banglaSubtitle: 'টোন ও মৌলিক চীনা সংলাপ',
    scriptName: 'Hanzi / Pinyin',
    greetingExample: {
      target: '你好，你好吗？',
      banglish: 'Nǐ hǎo, nǐ hǎo ma?',
      bangla: 'নি হাও, আপনি কেমন আছেন?',
    },
  },
  {
    id: 'spanish',
    name: 'Spanish',
    nativeName: 'Español',
    banglaName: 'স্প্যানিশ',
    flag: '🇪🇸',
    voiceCode: 'es-ES',
    levelCount: 6,
    description: 'ইউরোপ ও ল্যাটিন আমেরিকায় সবচেয়ে জনপ্রিয় রোমান্স ভাষা।',
    banglaSubtitle: 'সহজ উচ্চারণ ও কথোপকথন',
    scriptName: 'Latin Script',
    greetingExample: {
      target: '¡Hola! ¿Cómo estás?',
      banglish: 'Hola, komo estas?',
      bangla: 'ওলা! আপনি কেমন আছেন?',
    },
  },
  {
    id: 'french',
    name: 'French',
    nativeName: 'Français',
    banglaName: 'ফরাসি',
    flag: '🇫🇷',
    voiceCode: 'fr-FR',
    levelCount: 6,
    description: 'কানাডা ও ইউরোপ অভিবাসনের জন্য মিষ্টি ফরাসি ভাষা।',
    banglaSubtitle: 'ফ্রেঞ্চ উচ্চারণ ও প্রাথমিক লেভেল',
    scriptName: 'Latin Script',
    greetingExample: {
      target: 'Bonjour, comment allez-vous?',
      banglish: 'Bonjour, komon tali vu?',
      bangla: 'বোঁজুর, আপনি কেমন আছেন?',
    },
  },
  {
    id: 'german',
    name: 'German',
    nativeName: 'Deutsch',
    banglaName: 'জার্মান',
    flag: '🇩🇪',
    voiceCode: 'de-DE',
    levelCount: 6,
    description: 'জার্মানিতে উচ্চশিক্ষা ও কাজের জন্য A1-A2 প্রস্তুতি।',
    banglaSubtitle: 'জার্মান ব্যাকরণ ও সঠিক উচ্চারণ',
    scriptName: 'Latin Script',
    greetingExample: {
      target: 'Guten Tag, wie geht es Ihnen?',
      banglish: 'Guten tag, vi geet es inen?',
      bangla: 'গুটেন তাগ, আপনি কেমন আছেন?',
    },
  },
  {
    id: 'italian',
    name: 'Italian',
    nativeName: 'Italiano',
    banglaName: 'ইতালীয়',
    flag: '🇮🇹',
    voiceCode: 'it-IT',
    levelCount: 5,
    description: 'ইতালি প্রবাসী ও শিক্ষার্থীদের জন্য সহজ ইতালীয় কথা।',
    banglaSubtitle: 'ইতালিতে প্রাত্যহিক জীবনের প্রয়োজনীয় কথা',
    scriptName: 'Latin Script',
    greetingExample: {
      target: 'Ciao, come stai?',
      banglish: 'Chao, kome stai?',
      bangla: 'চাও, কেমন আছো?',
    },
  },
];

const CUSTOM_LANGUAGES_KEY = 'lingobangla_custom_languages_v1';

export function getAllLanguages(): LanguageMetadata[] {
  if (typeof window === 'undefined') return BASE_LANGUAGES;
  try {
    const raw = localStorage.getItem(CUSTOM_LANGUAGES_KEY);
    if (!raw) return BASE_LANGUAGES;
    const customs: LanguageMetadata[] = JSON.parse(raw);
    return [...BASE_LANGUAGES, ...customs];
  } catch {
    return BASE_LANGUAGES;
  }
}

export function saveCustomLanguage(lang: LanguageMetadata): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(CUSTOM_LANGUAGES_KEY);
    const list: LanguageMetadata[] = raw ? JSON.parse(raw) : [];
    const filtered = list.filter(l => l.id !== lang.id);
    filtered.push(lang);
    localStorage.setItem(CUSTOM_LANGUAGES_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Failed to save custom language', e);
  }
}

export function getLanguageById(id: string): LanguageMetadata {
  const all = getAllLanguages();
  return all.find(l => l.id === id) || BASE_LANGUAGES[0];
}
