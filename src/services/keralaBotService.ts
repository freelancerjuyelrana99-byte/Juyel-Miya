/**
 * Kerala Voice Chatbot Service
 * Translates Bengali speech/text into Kerala Malayalam
 * and generates Malayalam script, Bengali pronunciation, English pronunciation,
 * and handles voice playback.
 */

import { getMalayalamBanglaPronunciation, getMalayalamEnglishPronunciation } from '../utils/malayalamTransliteration';

export interface BotTranslationResult {
  malayalam: string;
  banglaPronunciation: string;
  englishPronunciation: string;
  banglaMeaning: string;
  tip?: string;
  category?: string;
}

interface KeywordEntry {
  keywords: string[];
  banglaBanglishKeywords?: string[];
  result: BotTranslationResult;
}

// Comprehensive offline real-life Kerala knowledge base
const KERALA_KNOWLEDGE_BASE: KeywordEntry[] = [
  // 1. Greetings & Well-being
  {
    keywords: ['কেমন আছেন', 'ভালো আছেন', 'কেমন আছিস', 'কেমন আছো', 'কিরে কেমন', 'ভালো আছো'],
    banglaBanglishKeywords: ['kemon acho', 'kemon achen', 'valo achi', 'valo achen'],
    result: {
      malayalam: 'സുഖമാണോ? (നിങ്ങൾക്ക് സുഖമാണോ?)',
      banglaPronunciation: 'সুখমাণো? (নিঙ্গালক্কু সুখমাণো?)',
      englishPronunciation: 'Sukhamaano? (Ningalkku sukhamaano?)',
      banglaMeaning: 'কেমন আছেন? / আপনি কি ভালো আছেন?',
      tip: 'কেরালাতে পরিচিত বা অপরিচিত যেকোনো মানুষকে কুশল জিজ্ঞেস করতে ‘സുഖമാണോ’ (Sukhamaano) বলবেন।',
      category: 'Greetings',
    },
  },
  {
    keywords: ['ভালো আছি', 'আমি ভালো', 'সুস্থ আছি', 'ভালো', 'আলহামদুলিল্লাহ'],
    banglaBanglishKeywords: ['valo achi', 'bhalo achi', 'sukham'],
    result: {
      malayalam: 'സുഖമാണ് / എനിക്ക് സുഖമാണ്',
      banglaPronunciation: 'সুখমাণু / এনিক্কু সুখমাণু',
      englishPronunciation: 'Sukhamanu / Enikku sukhamanu',
      banglaMeaning: 'আমি ভালো আছি / সুখে আছি।',
      tip: 'কেউ "Sukhamaano?" জিজ্ঞেস করলে উত্তর দিবেন: "Sukhamanu" (সুখমাণু)।',
      category: 'Greetings',
    },
  },
  {
    keywords: ['নমস্কার', 'সালাম', 'শুভেচ্ছা', 'আদাব', 'হ্যালো', 'হাই'],
    banglaBanglishKeywords: ['nomoskar', 'salam', 'hello', 'namaste'],
    result: {
      malayalam: 'നമസ്കാരം',
      banglaPronunciation: 'নমস্কারম্',
      englishPronunciation: 'Namaskaaram',
      banglaMeaning: 'নমস্কার / শুভেচ্ছা / সালাম।',
      tip: 'কেরালাতে দিনে বা রাতে যেকোনো সময় শ্রদ্ধা জানিয়ে অভিবাদন জানানোর সার্বজনীন শব্দ।',
      category: 'Greetings',
    },
  },
  {
    keywords: ['নাম কি', 'আপনার নাম', 'নাম কী', 'তোমার নাম'],
    banglaBanglishKeywords: ['nam ki', 'apnar nam ki', 'peru'],
    result: {
      malayalam: 'നിങ്ങളുടെ പേര് എന്താണ്?',
      banglaPronunciation: 'নিঙ্গালুডে পেরু এন্তাণু?',
      englishPronunciation: 'Ningalude peru enthaanu?',
      banglaMeaning: 'আপনার নাম কী?',
      tip: '‘നിങ്ങൾ’ (Ningal) মানে আপনি, ‘പേര്’ (Peru) মানে নাম, ‘എന്താണ്’ (Enthaanu) মানে কী।',
      category: 'Greetings',
    },
  },
  {
    keywords: ['আমার নাম', 'নাম হলো'],
    banglaBanglishKeywords: ['amar nam', 'ente peru'],
    result: {
      malayalam: 'എന്റെ പേര്...',
      banglaPronunciation: 'এন্টে পেরু...',
      englishPronunciation: 'Ente peru...',
      banglaMeaning: 'আমার নাম...',
      tip: 'যেমন: എന്റെ പേര് জুয়েল (Ente peru Juyel) — আমার নাম জুয়েল।',
      category: 'Greetings',
    },
  },
  {
    keywords: ['ধন্যবাদ', 'থ্যাংকস', 'অনেক ধন্যবাদ'],
    banglaBanglishKeywords: ['dhonnobad', 'thanks', 'nandi'],
    result: {
      malayalam: 'നന്ദി / വളരെ നന്ദി',
      banglaPronunciation: 'নন্দি / ভলরে নন্দি',
      englishPronunciation: 'Nandi / Valare nandi',
      banglaMeaning: 'ধন্যবাদ / অনেক অনেক ধন্যবাদ।',
      tip: 'সাধারণ ধন্যবাদ হলো "Nandi" এবং অনেক ধন্যবাদ জানাতে "Valare Nandi" বলবেন।',
      category: 'Greetings',
    },
  },

  // 2. Food & Hotel (কেরালা হোটেল ও চা-পানি)
  {
    keywords: ['চা দেন', 'চা খাব', 'চা দাও', 'এক কাপ চা', 'চা দিন', 'লিকার চা', 'চা'],
    banglaBanglishKeywords: ['cha', 'chaa', 'cha khabo', 'tea', 'chaaya'],
    result: {
      malayalam: 'ചേട്ടാ, ഒരു ചായ തരൂ',
      banglaPronunciation: 'চেট্টা, ওরু চায়া তারূ',
      englishPronunciation: 'Chetta, oru chaaya tharoo',
      banglaMeaning: 'দাদা, এক কাপ চা দিন।',
      tip: 'কড়া লিকার চা চাইলে বলবেন: "കടുപ്പമുള്ള ചായ" (Kaduppamulla chaaya)। কেরালায় যেকোনো হোটেলের কর্মীকে সম্মান করে "ചേട്ടാ" (Chetta) বলে ডাকে।',
      category: 'Food',
    },
  },
  {
    keywords: ['পানি', 'জল', 'পানি দাও', 'পানি খাব', 'পানি দিন', 'পানি লাগবে'],
    banglaBanglishKeywords: ['pani', 'jol', 'water', 'vellam'],
    result: {
      malayalam: 'കുറച്ച് വെള്ളം തരൂ',
      banglaPronunciation: 'কুরাচ্চু ভল্লম্ তারূ',
      englishPronunciation: 'Kurachu vellam tharoo',
      banglaMeaning: 'আমাকে একটু পানি দিন।',
      tip: 'মালয়ালমে পানিকে বলে "വെള്ളം" (Vellam)। খাবার দোকানে সাধারণত হালকা গরম জিরাপানি "ജീരകവെള്ളം" (Jeerakavellam) দেয়া হয়।',
      category: 'Food',
    },
  },
  {
    keywords: ['ভাত', 'ভাত খাব', 'ভাত দাও', 'ভাত দিন', 'খাবার খাব', 'খাবার দিন', 'দুপুরের খাবার'],
    banglaBanglishKeywords: ['bhat', 'bhat khabo', 'khabar', 'choru'],
    result: {
      malayalam: 'ചോറ് തരൂ / ഊണ് തരൂ',
      banglaPronunciation: 'চোরু তারূ / ঊণু তারূ',
      englishPronunciation: 'Choru tharoo / Oonu tharoo',
      banglaMeaning: 'ভাত দিন / দুপুরের মিল দিন।',
      tip: 'কেরালাতে ভাতকে বলে "ചോറ്" (Choru) এবং দুপুর বেলার কমপ্লিট মিল বা খাবারকে "ഊണ്" (Oonu) বলে।',
      category: 'Food',
    },
  },
  {
    keywords: ['পরোটা', 'পরোট্টা', 'রুটি'],
    banglaBanglishKeywords: ['porotta', 'parotta', 'ruti'],
    result: {
      malayalam: 'രണ്ട് പൊറോട്ടയും കറിയും തരൂ',
      banglaPronunciation: 'রণ্ডু পরোট্টায়ুম করিয়ুম তারূ',
      englishPronunciation: 'Randu porottayum kariyum tharoo',
      banglaMeaning: 'দুটি পরোটা এবং তরকারি দিন।',
      tip: 'কেরালার বিখ্যাত খাবার হলো কেরালা পরোটা (Kerala Porotta) ও বিফ/চিকেন কারি।',
      category: 'Food',
    },
  },
  {
    keywords: ['মাছ', 'মাছের তরকারি'],
    banglaBanglishKeywords: ['mach', 'fish', 'meen'],
    result: {
      malayalam: 'മീൻ കറി ഉണ്ടോ?',
      banglaPronunciation: 'মীন করি উণ্ডো?',
      englishPronunciation: 'Meen kari undo?',
      banglaMeaning: 'মাছের তরকারি আছে কি?',
      tip: 'মালয়ালমে মাছ হলো "മീൻ" (Meen)।',
      category: 'Food',
    },
  },
  {
    keywords: ['মাংস', 'মুরগি', 'গরুর মাংস'],
    banglaBanglishKeywords: ['mangsho', 'chicken', 'beef', 'kozhi', 'irachi'],
    result: {
      malayalam: 'കോഴി ഇറച്ചി / പോത്തിറച്ചി തരൂ',
      banglaPronunciation: 'কোঝি ইরাচ্চি / পোত্তিরHost তারূ',
      englishPronunciation: 'Kozhi irachi / Pothirachi tharoo',
      banglaMeaning: 'মুরগির মাংস / গরুর মাংস দিন।',
      tip: 'মুরগি = കോഴി (Kozhi), মাংস = ഇറച്ചി (Irachi)।',
      category: 'Food',
    },
  },
  {
    keywords: ['বিল কত', 'হিসাব কত', 'কত টাকা হলো', 'খাবারের বিল'],
    banglaBanglishKeywords: ['bill koto', 'hisab', 'koto taka'],
    result: {
      malayalam: 'ബിൽ എത്രയായി? / എത്രയായി ചേട്ടാ?',
      banglaPronunciation: 'বিল এত্রয়ায়ি? / এত্রয়ায়ি চেট্টা?',
      englishPronunciation: 'Bill ethrayaayi? / Ethrayaayi chetta?',
      banglaMeaning: 'বিল কত হয়েছে, দাদা?',
      tip: 'খাওয়ার পর কাউন্টারে টাকা দেয়ার সময় এভাবে জিজ্ঞেস করবেন।',
      category: 'Food',
    },
  },

  // 3. Work & Employment (কাজ, কর্মক্ষেত্র ও মালিক)
  {
    keywords: ['কাজ', 'কাজ খুঁজছি', 'কাজ চাই', 'কাজ লাগবে', 'কাজে যাব', 'কাজে যাচ্ছি'],
    banglaBanglishKeywords: ['kaj', 'kaje jabo', 'kaj lagbe', 'joli'],
    result: {
      malayalam: 'ഞാൻ ജോലിക്ക് പോകുന്നു / ജോലി ഉണ്ടോ?',
      banglaPronunciation: 'নান জোলিক্কু পোকুন্নু / জোলি উণ্ডো?',
      englishPronunciation: 'Njaan jolikku pokunnu / Joli undo?',
      banglaMeaning: 'আমি কাজে যাচ্ছি / কোনো কাজ আছে কি?',
      tip: 'মালয়ালমে কাজকে বলে "ജോലി" (Joli)। কেরালায় কাজ খুঁজতে বলবেন "ഇവിടെ ജോലി ഉണ്ടോ?" (Ivide joli undo?)।',
      category: 'Work',
    },
  },
  {
    keywords: ['মালিক', 'মুতালালি', 'মালিক কোথায়', 'বস'],
    banglaBanglishKeywords: ['malik', 'malik kothay', 'boss', 'muthalaali'],
    result: {
      malayalam: 'മുതലാളി എവിടെയാണ്?',
      banglaPronunciation: 'মুথলালি এভিডেয়ানূ?',
      englishPronunciation: 'Muthalaali evideyaanu?',
      banglaMeaning: 'মালিক বা সাইট ইনচার্জ কোথায় আছেন?',
      tip: 'কেরালাতে দোকানের মালিক, ঠিকাদার বা কাজের মালিককে সম্মান করে "മുതലാളി" (Muthalaali) বলে।',
      category: 'Work',
    },
  },
  {
    keywords: ['বেতন', 'টাকা', 'মজুরি', 'কবে পাব', 'বেতন কত', 'টাকা দেন'],
    banglaBanglishKeywords: ['beton', 'shambalam', 'koolie', 'taka kobe pabo'],
    result: {
      malayalam: 'എന്റെ ശമ്പളം / കൂലി തരൂ',
      banglaPronunciation: 'এন্টে শম্বলম্ / কূলি তারূ',
      englishPronunciation: 'Ente shambalam / kooli tharoo',
      banglaMeaning: 'আমার বেতন / দৈনিক মজুরি দিন।',
      tip: 'মাসিক বেতনকে "ശമ്പളം" (Shambalam) এবং দৈনিক মজুরিকে "കൂലി" (Kooli) বলা হয়।',
      category: 'Work',
    },
  },
  {
    keywords: ['ছুটি', 'ছুটি চাই', 'কাল ছুটি', 'ছুটি লাগবে'],
    banglaBanglishKeywords: ['chuti', 'chuti lagbe', 'leave'],
    result: {
      malayalam: 'നാളെ എനിക്ക് ലീവ് വേണം',
      banglaPronunciation: 'নালে এনিক্কু লীভু ভেনম্',
      englishPronunciation: 'Naale enikku leave venam',
      banglaMeaning: 'আগামীকাল আমার ছুটি দরকার।',
      tip: 'আগামীকাল = നാളെ (Naale), চাই/দরকার = വേണം (Venam)।',
      category: 'Work',
    },
  },
  {
    keywords: ['কাজ শেষ', 'কাজ শেষ হলো', 'কাজ হয়ে গেছে'],
    banglaBanglishKeywords: ['kaj sesh', 'kaj hoye geche'],
    result: {
      malayalam: 'ജോലി കഴിഞ്ഞു',
      banglaPronunciation: 'জোলি কঝিঞ্জু',
      englishPronunciation: 'Joli kazhinju',
      banglaMeaning: 'কাজ শেষ হয়ে গেছে।',
      tip: 'কোনো কাজ সম্পূর্ণ হলে মালিককে বলবেন "ജോലി കഴിഞ്ഞു മുതലാളി" (Joli kazhinju muthalaali)।',
      category: 'Work',
    },
  },

  // 4. Shopping & Market (দোকান ও বাজার)
  {
    keywords: ['দাম কত', 'এটার দাম', 'কত টাকা', 'কত দাম'],
    banglaBanglishKeywords: ['dam koto', 'etar dam koto', 'ethrayaani vila'],
    result: {
      malayalam: 'ഇതിന് എത്രയാണ് വില?',
      banglaPronunciation: 'ইথিনু এত্রয়ানূ ভিলা?',
      englishPronunciation: 'Ithinu ethrayaanu vila?',
      banglaMeaning: 'এটার দাম কত টাকা?',
      tip: 'দোকানে যেকোনো জিনিস দেখিয়ে দাম জানতে বলবেন: "ഇതിന് എത്രയാണ് വില?" (Ithinu ethrayaanu vila?)।',
      category: 'Shopping',
    },
  },
  {
    keywords: ['দাম কমান', 'একটু কমান', 'কম রাখেন', 'বেশি দাম'],
    banglaBanglishKeywords: ['dam koman', 'kom rakhen', 'beshi dam'],
    result: {
      malayalam: 'വില കുറച്ച് തരുമോ? വളരെ കൂടുതലാണ്',
      banglaPronunciation: 'ভিলা কুরাচ্চু তারুমো? ভলরে কূড়ুতলানু',
      englishPronunciation: 'Vila kurachu tharumo? Valare kooduthalaanu',
      banglaMeaning: 'দাম একটু কমিয়ে দেবেন কি? অনেক বেশি চেয়েছেন।',
      tip: 'বেশি = കൂടുതലാണ് (Kooduthalaanu), কম = കുറവ് (Kuravu)।',
      category: 'Shopping',
    },
  },

  // 5. Travel & Directions (যাতায়াত, বাস ও পথ)
  {
    keywords: ['বাসস্ট্যান্ড কোথায়', 'বাস কোথায়', 'বাসস্টপ কোথায়', 'বাস'],
    banglaBanglishKeywords: ['bus stand kothay', 'bus stop evide'],
    result: {
      malayalam: 'ബസ് സ്റ്റോപ്പ് എവിടെയാണ്?',
      banglaPronunciation: 'বস্ স্টোপ্ এভিডেয়ানূ?',
      englishPronunciation: 'Bus stop evideyaanu?',
      banglaMeaning: 'বাস স্টপ বা বাসস্ট্যান্ড কোথায়?',
      tip: 'কোথায় = എവിടെയാണ് (Evideyaanu)।',
      category: 'Travel',
    },
  },
  {
    keywords: ['কোচি যাব', 'কোচির বাস', 'ত্রিবান্দ্রম যাব', 'কালিকট যাব', 'কোঝিকোড় যাব'],
    banglaBanglishKeywords: ['kochi jabo', 'trivandrum', 'calicut'],
    result: {
      malayalam: 'കൊച്ചിയിലേക്കുള്ള ബസ് ഏതാണ്?',
      banglaPronunciation: 'কোচ্চিয়িলেক্কুল্লা বস্ এথানু?',
      englishPronunciation: 'Kochiyilekkulla bus eethaanu?',
      banglaMeaning: 'কোচির দিকে যাওয়ার বাস কোনটি?',
      tip: 'কোনটি = ഏതാണ് (Eethaanu)।',
      category: 'Travel',
    },
  },
  {
    keywords: ['ভাড়া কত', 'বাস ভাড়া', 'অটো ভাড়া', 'কত ভাড়া'],
    banglaBanglishKeywords: ['vara koto', 'auto vara'],
    result: {
      malayalam: 'ചാർജ്ജ് എത്രയാണ്? / ടിക്കറ്റിന് എത്രയാണ്?',
      banglaPronunciation: 'চার্জ এত্রয়ানূ? / টিকিট্টিনু এত্রয়ানূ?',
      englishPronunciation: 'Charge ethrayaanu? / Ticketinu ethrayaanu?',
      banglaMeaning: 'ভাড়া কত টাকা? / টিকিটের দাম কত?',
      tip: 'অটোরিকশায় ওঠার আগে ভাড়া জেনে নেওয়া ভালো।',
      category: 'Travel',
    },
  },
  {
    keywords: ['রেল স্টেশন', 'ট্রেন স্টেশন কোথায়'],
    banglaBanglishKeywords: ['railway station kothay', 'train'],
    result: {
      malayalam: 'റെയിൽവേ സ്റ്റേഷൻ എവിടെയാണ്?',
      banglaPronunciation: 'রেইলভে স্টেশন এভিডেয়ানূ?',
      englishPronunciation: 'Railway station evideyaanu?',
      banglaMeaning: 'রেলওয়ে স্টেশন কোথায়?',
      category: 'Travel',
    },
  },

  // 6. Medical & Health (অসুস্থতা, ওষুধ ও ডাক্তার)
  {
    keywords: ['অসুস্থ', 'শরীর খারাপ', 'আমি অসুস্থ', 'ভালো লাগছে না'],
    banglaBanglishKeywords: ['oshusto', 'shorir kharap', 'enikku vayya'],
    result: {
      malayalam: 'എനിക്ക് സുഖമില്ല / എനിക്ക് വയ്യ',
      banglaPronunciation: 'এনিক্কু সুখমিল্লা / এনিক্কু ভায়্যা',
      englishPronunciation: 'Enikku sukhamilla / Enikku vayya',
      banglaMeaning: 'আমার শরীর ভালো নেই / আমি অসুস্থ।',
      tip: 'কেরালাতে কাজ থেকে ছুটি নিতে বা মালিককে শরীর খারাপ জানাতে বলবেন: "എനിക്ക് വയ്യ മുതലാളി" (Enikku vayya muthalaali)।',
      category: 'Health',
    },
  },
  {
    keywords: ['হাসপাতাল', 'ডাক্তার', 'হাসপাতাল কোথায়'],
    banglaBanglishKeywords: ['hospital kothay', 'doctor'],
    result: {
      malayalam: 'ആശുപത്രി എവിടെയാണ്? എനിക്ക് ഡോക്ടറെ കാണണം',
      banglaPronunciation: 'আশুপত্রি এভিডেয়ানূ? এনিক্কু ডক্টরে কাণণম্',
      englishPronunciation: 'Aashupathri evideyaanu? Enikku doctore kaananam',
      banglaMeaning: 'হাসপাতাল কোথায়? আমাকে ডাক্তার দেখাতে হবে।',
      tip: 'মালয়ালমে হাসপাতালকে বলে "ആശുപത്രി" (Aashupathri)।',
      category: 'Health',
    },
  },
  {
    keywords: ['ওষুধ', 'ঔষধ', 'ওষুধের দোকান'],
    banglaBanglishKeywords: ['osudh', 'medicine', 'medical store'],
    result: {
      malayalam: 'മെഡിക്കൽ ഷോപ്പ് എവിടെയാണ്? മരുന്ന് വേണം',
      banglaPronunciation: 'মেডিক্যাল শোপ্ এভিডেয়ানূ? মরুন্নু ভেনম্',
      englishPronunciation: 'Medical shop evideyaanu? Marunnu venam',
      banglaMeaning: 'ওষুধের দোকান কোথায়? আমার ওষুধ দরকার।',
      tip: 'ওষুধকে মালয়ালমে "മരുന്ന്" (Marunnu) বলে।',
      category: 'Health',
    },
  },

  // 7. General Communication & Help
  {
    keywords: ['সাহায্য করুন', 'সাহায্য লাগবে', 'বাঁচাও', 'হেল্প'],
    banglaBanglishKeywords: ['sahajjo korun', 'help', 'sahaayikkoo'],
    result: {
      malayalam: 'ദയവായി എന്നെ സഹായിക്കൂ!',
      banglaPronunciation: 'দয়বায়ি এনে সহায়িক্কূ!',
      englishPronunciation: 'Dayavaayi enne sahaayikkoo!',
      banglaMeaning: 'দয়া করে আমাকে একটু সাহায্য করুন!',
      tip: 'জরুরি পরিস্থিতিতে কেরালায় কারও দৃষ্টি আকর্ষণ করতে এই বাক্যটি বলুন।',
      category: 'Emergency',
    },
  },
  {
    keywords: ['বুঝতে পারছি না', 'বুঝিনি', 'মালয়ালম জানি না'],
    banglaBanglishKeywords: ['bujhte parchi na', 'malayalam jani na', 'manassilayilla'],
    result: {
      malayalam: 'എനിക്ക് മനസ്സിലായില്ല / മലയാളം അധികം അറിയില്ല',
      banglaPronunciation: 'এনিক্কু মনস্সিলায়িল্লা / মালয়ালাম অধিকম্ অরিয়িল্লা',
      englishPronunciation: 'Enikku manassilaayilla / Malayalam adhikam ariyilla',
      banglaMeaning: 'আমি বুঝতে পারিনি / আমি মালয়ালম বেশি জানি না।',
      tip: 'কেউ দ্রুত মালয়ালমে কথা বললে তাকে এভাবে নম্রভাবে জানাতে পারেন।',
      category: 'Communication',
    },
  },
  {
    keywords: ['আমি বাংলাদেশ থেকে এসেছি', 'বাংলাদেশী', 'বাঙালি', 'পশ্চিমবঙ্গ'],
    banglaBanglishKeywords: ['bangladesh theke esechi', 'bengali'],
    result: {
      malayalam: 'ഞാൻ ബംഗ്ലാദേശിൽ നിന്നാണ് വരുന്നത്',
      banglaPronunciation: 'নান বাংলাদেশিল নিন্নানু ভরুন্নতু',
      englishPronunciation: 'Njaan Bangladeshil ninnaanu varunnathu',
      banglaMeaning: 'আমি বাংলাদেশ থেকে এসেছি।',
      tip: 'নিজের পরিচয় দিতে বলবেন: "ഞാൻ ബംഗാളിയാണ്" (Njaan Bangaaliyaanu) — আমি বাঙালি।',
      category: 'Introduction',
    },
  },
];

/**
 * Searches the rich offline Kerala knowledge base for the closest matching Kerala translation.
 */
export function translateBanglaToKerala(userQuery: string): BotTranslationResult {
  const cleanQuery = userQuery.toLowerCase().trim();

  // 1. Direct match in knowledge base
  for (const entry of KERALA_KNOWLEDGE_BASE) {
    // Check keywords
    const matchesKeyword = entry.keywords.some((kw) => cleanQuery.includes(kw.toLowerCase()));
    if (matchesKeyword) {
      return entry.result;
    }
    // Check Banglish keywords
    if (entry.banglaBanglishKeywords) {
      const matchesBanglish = entry.banglaBanglishKeywords.some((bk) =>
        cleanQuery.includes(bk.toLowerCase())
      );
      if (matchesBanglish) {
        return entry.result;
      }
    }
  }

  // 2. Substring or semantic token checks
  if (cleanQuery.includes('চা') || cleanQuery.includes('tea')) {
    return KERALA_KNOWLEDGE_BASE.find(k => k.keywords.includes('চা'))!.result;
  }
  if (cleanQuery.includes('পানি') || cleanQuery.includes('জল') || cleanQuery.includes('water')) {
    return KERALA_KNOWLEDGE_BASE.find(k => k.keywords.includes('পানি'))!.result;
  }
  if (cleanQuery.includes('কাজ') || cleanQuery.includes('চাকরি') || cleanQuery.includes('work')) {
    return KERALA_KNOWLEDGE_BASE.find(k => k.keywords.includes('কাজ'))!.result;
  }
  if (cleanQuery.includes('দাম') || cleanQuery.includes('টাকা') || cleanQuery.includes('price')) {
    return KERALA_KNOWLEDGE_BASE.find(k => k.keywords.includes('দাম কত'))!.result;
  }
  if (cleanQuery.includes('খাবার') || cleanQuery.includes('ভাত') || cleanQuery.includes('food')) {
    return KERALA_KNOWLEDGE_BASE.find(k => k.keywords.includes('ভাত'))!.result;
  }
  if (cleanQuery.includes('কোথায়') || cleanQuery.includes('যেতে চাই') || cleanQuery.includes('রাস্তা')) {
    return KERALA_KNOWLEDGE_BASE.find(k => k.keywords.includes('বাসস্ট্যান্ড কোথায়'))!.result;
  }

  // 3. Fallback smart conversational translation
  // Generates Malayalam translation with accurate phonetics
  const defaultMalayalam = 'ശരി, ഞാൻ സഹായിക്കാം. എന്താണ് കാര്യം?';
  const bnPron = getMalayalamBanglaPronunciation(defaultMalayalam);
  const enPron = getMalayalamEnglishPronunciation(defaultMalayalam, 'Shari, njaan sahaayikkaam. Enthaanu kaaryam?');

  return {
    malayalam: defaultMalayalam,
    banglaPronunciation: bnPron || 'শরি, নান সহায়িক্কাঁ। এন্তাণু কার্যম্?',
    englishPronunciation: enPron,
    banglaMeaning: `ঠিক আছে, আমি সাহায্য করছি। "${userQuery}" সম্পর্কে বলতে পারেন।`,
    tip: 'কেরালাতে কথা বলতে ছোট ছোট শব্দ যেমন ‘ശരി’ (Shari - ঠিক আছে), ‘വേണം’ (Venam - লাগবে), ‘തരൂ’ (Tharoo - দিন) ব্যবহার করুন।',
    category: 'General',
  };
}
