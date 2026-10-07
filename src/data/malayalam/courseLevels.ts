import { CourseLevel } from '../../types';

export const MALAYALAM_COURSE_LEVELS: CourseLevel[] = [
  {
    id: 'ml_lvl_1',
    levelNumber: 1,
    title: 'Level 1: Alphabet & Sounds',
    banglaTitle: 'লেভেল ১: বর্ণমালা ও মৌলিক ধ্বনি',
    description: 'মালয়ালমের স্বরবর্ণ, ব্যঞ্জনবর্ণ ও বিশুদ্ধ উচ্চারণ শেখার প্রথম পাঠ।',
    chapters: [
      {
        id: 'ml_ch_1',
        chapterNumber: 1,
        title: 'Chapter 1: Swaraksharangal (Vowels)',
        banglaTitle: 'অধ্যায় ১: স্বরবর্ণ ও মৌলিক স্বরধ্বনি',
        description: 'অ থেকে ঔ পর্যন্ত স্বরধ্বনির সঠিক কেরালীয় উচ্চারণ।',
        quizId: 'quiz_ml_lvl1',
        lessons: [
          {
            id: 'ml_lvl1_ch1_l1',
            lessonNumber: 1,
            title: 'Malayalam Alphabet — The First Vowels',
            banglaTitle: 'পাঠ ১: প্রথম স্বরবর্ণগুলো (അ, ആ, ഇ, ഈ)',
            estimatedMinutes: 6,
            content: {
              introductionBangla:
                'মালয়ালম ভাষায় স্বরবর্ণকে বলে ‘സ്വരാക്ഷരങ്ങൾ’ (Swaraksharangal)। বাংলা বর্ণের সাথে এর অসাধারণ মিল রয়েছে। আসুন প্রথম চারটি স্বরবর্ণ শিখে নিই।',
              keyPoints: [
                'അ (A) = বাংলার ‘অ’ ধ্বনি',
                'ആ (Aa) = বাংলার দীর্ঘ ‘আ’ ধ্বনি',
                'ഇ (I) = বাংলার হ্রস্ব ‘ই’ ধ্বনি',
                'ഈ (Ee) = বাংলার দীর্ঘ ‘ঈ’ ধ্বনি',
              ],
              vocabularyItems: [
                {
                  id: 'w_l1_1',
                  languageId: 'malayalam',
                  word: 'അമ്മ',
                  banglish: 'Amma',
                  bangla: 'মা (খুবই মিষ্টি ও পরিচিত শব্দ)',
                  category: 'Family',
                  exampleSentence: 'എന്റെ അമ്മ',
                  exampleBanglish: 'Ente amma',
                  exampleBangla: 'আমার মা',
                },
                {
                  id: 'w_l1_2',
                  languageId: 'malayalam',
                  word: 'ആന',
                  banglish: 'Aana',
                  bangla: 'হাতি (কেরালার প্রতীক)',
                  category: 'Animals',
                  exampleSentence: 'വലിയ ആന',
                  exampleBanglish: 'Valiya aana',
                  exampleBangla: 'বড় হাতি',
                },
              ],
              practicePrompt: 'প্রতিটি বর্ণের পাশের স্পিকার আইকনে ট্যাপ করে বিশুদ্ধ উচ্চারণ বারবার শুনুন এবং মুখে বলুন।',
            },
          },
          {
            id: 'ml_lvl1_ch1_l2',
            lessonNumber: 2,
            title: 'Basic Sounds — The U & E Sounds',
            banglaTitle: 'পাঠ ২: উ ও এ ধ্বনি (ഉ, ഊ, എ, ഏ)',
            estimatedMinutes: 7,
            content: {
              introductionBangla:
                'মালয়ালমে ‘এ’ ধ্বনির দুটি রূপ আছে—একটি ছোট (Short E: എ) এবং একটি টানা লম্বা (Long E: ഏ)। এই পার্থক্যটি কেরালাবাসীদের মতো সঠিক উচ্চারণের জন্য অপরিহার্য।',
              keyPoints: [
                'ഉ (U) = হ্রস্ব উ, যেমন ‘ഉപ്പ്’ (Uppu = লবণ)',
                'ഊ (Oo) = দীর্ঘ ঊ, যেমন ‘ഊണ്’ (Oonu = দুপুরের খাবার)',
                'എ (E) = ছোট এ, যেমন ‘എലി’ (Eli = ইঁদুর)',
                'ഏ (Ee/Ae) = টানা এ, যেমন ‘ഏണി’ (Eani = মই)',
              ],
              vocabularyItems: [
                {
                  id: 'w_l1_3',
                  languageId: 'malayalam',
                  word: 'ഉപ്പ്',
                  banglish: 'Uppu',
                  bangla: 'লবণ / নুন',
                  category: 'Food',
                  exampleSentence: 'ഉപ്പ് കുറവാണ്',
                  exampleBanglish: 'Uppu kuravaanu',
                  exampleBangla: 'লবণ কম হয়েছে',
                },
                {
                  id: 'w_l1_4',
                  languageId: 'malayalam',
                  word: 'ഊണ്',
                  banglish: 'Oonu',
                  bangla: 'ভাত / দুপুরের মূল খাবার',
                  category: 'Food',
                  exampleSentence: 'ഊണ് കഴിക്കാം',
                  exampleBanglish: 'Oonu kazhikkaam',
                  exampleBangla: 'চলুন দুপুরের খাবার খাই',
                },
              ],
            },
          },
        ],
      },
      {
        id: 'ml_ch_2',
        chapterNumber: 2,
        title: 'Chapter 2: Consonants & The Special Zh Sound',
        banglaTitle: 'অধ্যায় ২: ব্যঞ্জনবর্ণ ও মালয়ালমের বিশেষ ‘ഴ’ ধ্বনি',
        description: 'মালয়ালমের সবচেয়ে বিখ্যাত ഴ (Zha) ধ্বনি যা কেবল কেরালাতেই শোনা যায়।',
        lessons: [
          {
            id: 'ml_lvl1_ch2_l1',
            lessonNumber: 3,
            title: 'The Famous "Zha" (ഴ) Sound',
            banglaTitle: 'পাঠ ৩: কেরালা ও বৃষ্টির বিশেষ ধ্বনি ‘ഴ’ (Zha)',
            estimatedMinutes: 8,
            content: {
              introductionBangla:
                'মালয়ালম ভাষার নিজস্ব অনন্য অক্ষর হলো ‘ഴ’। জিহ্বা তালুর ভিতরের দিকে মুড়িয়ে বাতাস ছেড়ে দিয়ে ‘zh/ra’ এর একটি মিশ্র গম্ভীর ধ্বনি উচ্চারণ করতে হয়। এটি সঠিকভাবে বলতে পারলে আপনি কেরালীয়দের মতো কথা বলতে পারবেন!',
              keyPoints: [
                'മഴ (Mazha) = বৃষ্টি',
                'വഴി (Vazhi) = রাস্তা বা পথ',
                'കേരളം (Keralam) = কেরালা রাজ্য',
                'കോഴിക്കോട് (Kozhikode) = কালিকট শহর',
              ],
              vocabularyItems: [
                {
                  id: 'w_l1_zh1',
                  languageId: 'malayalam',
                  word: 'മഴ',
                  banglish: 'Mazha',
                  bangla: 'বৃষ্টি',
                  category: 'Weather',
                  exampleSentence: 'നല്ല മഴയുണ്ട്',
                  exampleBanglish: 'Nalla mazhayundu',
                  exampleBangla: 'বেশ বৃষ্টি হচ্ছে',
                },
                {
                  id: 'w_l1_zh2',
                  languageId: 'malayalam',
                  word: 'വഴി',
                  banglish: 'Vazhi',
                  bangla: 'রাস্তা / পথ',
                  category: 'Travel',
                  exampleSentence: 'ശരിയായ വഴി',
                  exampleBanglish: 'Shariyaaya vazhi',
                  exampleBangla: 'সঠিক রাস্তা',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: 'ml_lvl_2',
    levelNumber: 2,
    title: 'Level 2: Basic Words',
    banglaTitle: 'লেভেল ২: নিত্যপ্রয়োজনীয় শব্দভাণ্ডার',
    description: 'দৈনন্দিন জীবনের প্রথম ২০+টি জরুরি শব্দ যা ছাড়া একদিনও চলা সম্ভব নয়।',
    chapters: [
      {
        id: 'ml_ch_3',
        chapterNumber: 3,
        title: 'Chapter 3: First 20 Words',
        banglaTitle: 'অধ্যায় ৩: প্রথম ২০টি অতি-প্রয়োজনীয় শব্দ',
        description: 'পানি, খাবার, টাকা, হ্যাঁ, না এবং সময়।',
        quizId: 'quiz_ml_lvl2',
        lessons: [
          {
            id: 'ml_lvl2_ch3_l1',
            lessonNumber: 4,
            title: 'Water, Food & Numbers (1 to 5)',
            banglaTitle: 'পাঠ ৪: পানি, খাবার এবং গণনা (১ থেকে ৫)',
            estimatedMinutes: 8,
            content: {
              introductionBangla:
                'কেরালার যেকোনো রেস্তোরাঁ বা দোকানে প্রবেশ করলেই এই শব্দগুলোর মুখোমুখি হতে হবে।',
              vocabularyItems: [
                {
                  id: 'w_l2_1',
                  languageId: 'malayalam',
                  word: 'വെള്ളം',
                  banglish: 'Vellam',
                  bangla: 'পানি / জল (সবচেয়ে প্রয়োজনীয় শব্দ)',
                  category: 'Drinks',
                  exampleSentence: 'കുറച്ച് വെള്ളം തരൂ',
                  exampleBanglish: 'Kurachu vellam tharoo',
                  exampleBangla: 'আমাকে একটু পানি দিন',
                },
                {
                  id: 'w_l2_2',
                  languageId: 'malayalam',
                  word: 'ചായ',
                  banglish: 'Chaaya',
                  bangla: 'চা',
                  category: 'Drinks',
                  exampleSentence: 'ഒരു ചായ തരൂ',
                  exampleBanglish: 'Oru chaaya tharoo',
                  exampleBangla: 'এক কাপ চা দিন',
                },
                {
                  id: 'w_l2_3',
                  languageId: 'malayalam',
                  word: 'ഒന്ന്, രണ്ട്, മൂന്ന്',
                  banglish: 'Onnu, Randu, Moonnu',
                  bangla: 'এক, দুই, তিন',
                  category: 'Numbers',
                  exampleSentence: 'രണ്ട് ചായ',
                  exampleBanglish: 'Randu chaaya',
                  exampleBangla: 'দু কাপ চা',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: 'ml_lvl_3',
    levelNumber: 3,
    title: 'Level 3: Greetings',
    banglaTitle: 'লেভেল ৩: শুভেচ্ছা ও ভদ্রতা',
    description: 'নমস্কার, ধন্যবাদ, কেমন আছেন, বিদায় ও শুভকামনা জানানো।',
    chapters: [
      {
        id: 'ml_ch_4',
        chapterNumber: 4,
        title: 'Chapter 4: Polite Greetings',
        banglaTitle: 'অধ্যায় ৪: কুশলাদি বিনিময় ও সৌজন্যবোধ',
        description: 'কেরালাবাসীদের সাথে চমৎকার বন্ধুত্বপূর্ণ সম্পর্কের সূচনা।',
        lessons: [
          {
            id: 'ml_lvl3_ch4_l1',
            lessonNumber: 5,
            title: 'Greetings Masterclass',
            banglaTitle: 'পাঠ ৫: নমস্কার ও কুশল বিনিময়',
            estimatedMinutes: 7,
            content: {
              introductionBangla:
                'কেরালাতে ধর্মবর্ণ নির্বিশেষে সবাই সম্মানসূচক ‘നമസ്കാരം’ (Namaskaaram) ব্যবহার করেন। এছাড়া মুসলিম সম্প্রদায়ের মাঝে সালামও প্রচলিত।',
              sentences: [
                {
                  id: 's_l3_1',
                  languageId: 'malayalam',
                  target: 'നമസ്കാരം, സുഖമാണോ?',
                  banglish: 'Namaskaaram, sukhamaano?',
                  bangla: 'নমস্কার, কেমন আছেন?',
                  category: 'Greetings',
                  words: [
                    { target: 'നമസ്കാരം', banglish: 'Namaskaaram', bangla: 'নমস্কার' },
                    { target: 'സുഖമാണോ?', banglish: 'Sukhamaano?', bangla: 'কেমন আছেন?' },
                  ],
                },
                {
                  id: 's_l3_2',
                  languageId: 'malayalam',
                  target: 'എനിക്ക് സുഖമാണ്, നന്ദി.',
                  banglish: 'Enikku sukhamaanu, nandi.',
                  bangla: 'আমি ভালো আছি, ধন্যবাদ।',
                  category: 'Greetings',
                  words: [
                    { target: 'എനിക്ക്', banglish: 'Enikku', bangla: 'আমার' },
                    { target: 'സുഖമാണ്', banglish: 'Sukhamaanu', bangla: 'ভালো আছি' },
                    { target: 'നന്ദി.', banglish: 'Nandi.', bangla: 'ধন্যবাদ।' },
                  ],
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: 'ml_lvl_4',
    levelNumber: 4,
    title: 'Level 4: Introduction',
    banglaTitle: 'লেভেল ৪: নিজের পরিচয় প্রদান',
    description: 'নিজের নাম, দেশ, বাসা এবং কাজের কথা প্রাঞ্জলভাবে বলা।',
    chapters: [
      {
        id: 'ml_ch_5',
        chapterNumber: 5,
        title: 'Chapter 5: Introducing Yourself',
        banglaTitle: 'অধ্যায় ৫: পূর্ণাঙ্গ আত্মপরিচয়',
        description: 'নাম বলা এবং অন্যের নাম জিজ্ঞেস করা।',
        lessons: [
          {
            id: 'ml_lvl4_ch5_l1',
            lessonNumber: 6,
            title: 'What is your name?',
            banglaTitle: 'পাঠ ৬: নাম ও বাসস্থান নিয়ে কথা বলা',
            estimatedMinutes: 8,
            content: {
              introductionBangla:
                'কেরালাতে কেউ আপনার সাথে কথা বললে প্রথমে জানতে চাইবে আপনার নাম কী এবং আপনি কোথা থেকে এসেছেন।',
              sentences: [
                {
                  id: 's_l4_1',
                  languageId: 'malayalam',
                  target: 'നിങ്ങളുടെ പേര് എന്താണ്?',
                  banglish: 'Ningalude peru enthaanu?',
                  bangla: 'আপনার নাম কী?',
                  category: 'Introduction',
                  words: [
                    { target: 'നിങ്ങളുടെ', banglish: 'Ningalude', bangla: 'আপনার' },
                    { target: 'പേര്', banglish: 'Peru', bangla: 'নাম' },
                    { target: 'എന്താണ്?', banglish: 'Enthaanu?', bangla: 'কী?' },
                  ],
                },
                {
                  id: 's_l4_2',
                  languageId: 'malayalam',
                  target: 'എന്റെ പേര് റഫീഖ്, ഞാൻ ബംഗാളിൽ നിന്നാണ്.',
                  banglish: 'Ente peru Rafeeq, njaan Bengalil ninnaanu.',
                  bangla: 'আমার নাম রফিক, আমি বাংলা থেকে এসেছি।',
                  category: 'Introduction',
                  words: [
                    { target: 'എന്റെ', banglish: 'Ente', bangla: 'আমার' },
                    { target: 'പേര്', banglish: 'Peru', bangla: 'নাম' },
                    { target: 'ഞാൻ', banglish: 'Njaan', bangla: 'আমি' },
                    { target: 'നിന്നാണ്', banglish: 'Ninnaanu', bangla: 'থেকে' },
                  ],
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: 'ml_lvl_5',
    levelNumber: 5,
    title: 'Level 5: Daily Conversation',
    banglaTitle: 'লেভেল ৫: প্রতিদিনের বাস্তব কথাবার্তা',
    description: 'ক্ষুধা, তৃষ্ণা, ক্লান্তি, বুঝতে না পারা ও অনুরোধের বাক্য।',
    chapters: [
      {
        id: 'ml_ch_6',
        chapterNumber: 6,
        title: 'Chapter 6: Practical Sentences',
        banglaTitle: 'অধ্যায় ৬: প্রাত্যহিক জীবনের প্রয়োজনীয় বাক্য',
        description: 'I want this, I don\'t understand, Please repeat.',
        lessons: [
          {
            id: 'ml_lvl5_ch6_l1',
            lessonNumber: 7,
            title: 'Essential Survival Sentences',
            banglaTitle: 'পাঠ ৭: বেঁচে থাকার জরুরি কথা',
            estimatedMinutes: 9,
            content: {
              introductionBangla:
                'যদি কেউ দ্রুত মালয়ালম বলে আপনি না বোঝেন, তাহলে অত্যন্ত ভদ্রভাবে বলতে পারেন: ‘Enikku manassilaayilla’ (আমি বুঝিনি)।',
              sentences: [
                {
                  id: 's_l5_1',
                  languageId: 'malayalam',
                  target: 'എനിക്ക് മനസ്സിലായില്ല, ഒന്നുകൂടി പറയൂ.',
                  banglish: 'Enikku manassilaayilla, onnukoodi parayoo.',
                  bangla: 'আমি বুঝতে পারিনি, দয়া করে আরেকবার বলুন।',
                  category: 'Communication',
                },
                {
                  id: 's_l5_2',
                  languageId: 'malayalam',
                  target: 'ഇതിന് എത്രയാണ് വില?',
                  banglish: 'Ithinu ethrayaanu vila?',
                  bangla: 'এটার দাম কত টাকা?',
                  category: 'Shopping',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: 'ml_lvl_6',
    levelNumber: 6,
    title: 'Level 6: Grammar',
    banglaTitle: 'লেভেল ৬: সহজ ব্যাকরণ ও কাল',
    description: 'বর্তমান কাল, অতীত কাল, ভবিষ্যত কাল ও না-বোধক বাক্যের চমৎকার নিয়ম।',
    chapters: [
      {
        id: 'ml_ch_7',
        chapterNumber: 7,
        title: 'Chapter 7: Tenses & Sentence Formation',
        banglaTitle: 'অধ্যায় ৭: কাল ও বাক্য তৈরি',
        description: '-unnu, -i, -um প্রত্যয়ের ম্যাজিক।',
        lessons: [
          {
            id: 'ml_lvl6_ch7_l1',
            lessonNumber: 8,
            title: 'Simple Tenses',
            banglaTitle: 'পাঠ ৮: বর্তমান, অতীত ও ভবিষ্যত কাল',
            estimatedMinutes: 10,
            content: {
              introductionBangla:
                'বাংলা যেমন ‘যাচ্ছি, গেলাম, যাব’—মালয়ালমে ঠিক তেমনি: ‘Pokunnu, Poyi, Pokum’। ক্রিয়া পরিবর্তন শিখে নিলে হাজারো বাক্য তৈরি করা যায়!',
              keyPoints: [
                'Pokunnu (പോവുന്നു) = যাচ্ছি (বর্তমান)',
                'Poyi (പോയി) = গিয়েছিলাম (অতীত)',
                'Pokum (പോകും) = যাব (ভবিষ্যত)',
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: 'ml_lvl_7',
    levelNumber: 7,
    title: 'Level 7: Real-Life Conversation',
    banglaTitle: 'লেভেল ৭: কেরালার বাস্তব পরিস্থিতি',
    description: 'অটোরিকশা ঠিক করা, বাজারে দরদাম ও মাছের দোকানে কেনাকাটা।',
    chapters: [
      {
        id: 'ml_ch_8',
        chapterNumber: 8,
        title: 'Chapter 8: Kerala Street Real-Life Dialogues',
        banglaTitle: 'অধ্যায় ৮: কেরালা স্ট্রিট ডায়লগ',
        description: 'Auto, Bus stand, Fish market.',
        lessons: [
          {
            id: 'ml_lvl7_ch8_l1',
            lessonNumber: 9,
            title: 'Taking an Auto & Market bargaining',
            banglaTitle: 'পাঠ ৯: অটো চালকের সাথে কথা বলা',
            estimatedMinutes: 9,
            content: {
              introductionBangla:
                'কেরালার অটো ড্রাইভারদের সাথে মিটারে যাওয়ার কথা এবং ভাড়া ঠিক করার নিয়মাবলী।',
              sentences: [
                {
                  id: 's_l7_1',
                  languageId: 'malayalam',
                  target: 'ഓട്ടോ, റെയിൽവേ സ്റ്റേഷനിൽ പോകുമോ?',
                  banglish: 'Auto, railway stationil pokumo?',
                  bangla: 'অটো ভাই, রেলওয়ে স্টেশনে যাবেন কি?',
                  category: 'Travel',
                },
                {
                  id: 's_l7_2',
                  languageId: 'malayalam',
                  target: 'മീറ്റർ ഇടുമോ ചേട്ടാ?',
                  banglish: 'Meter idumo chetta?',
                  bangla: 'মিটার চালু করবেন কি ভাইয়া?',
                  category: 'Travel',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: 'ml_lvl_8',
    levelNumber: 8,
    title: 'Level 8: Speaking Practice',
    banglaTitle: 'লেভেল ৮: কথা বলার অনুশীলন',
    description: 'মাইক্রোফোনে নিজে বলে উচ্চারণ নিখুঁত করার ইন্টারঅ্যাকটিভ ল্যাব।',
    chapters: [
      {
        id: 'ml_ch_9',
        chapterNumber: 9,
        title: 'Chapter 9: Voice Accuracy Lab',
        banglaTitle: 'অধ্যায় ৯: ভয়েস ল্যাব',
        description: 'উচ্চারণ রেকর্ড করে তাত্ক্ষণিক ফিডব্যাক গ্রহণ।',
        lessons: [
          {
            id: 'ml_lvl8_ch9_l1',
            lessonNumber: 10,
            title: 'Speaking Fluency Drill',
            banglaTitle: 'পাঠ ১০: স্পষ্ট উচ্চারণ ড্রিল',
            estimatedMinutes: 8,
            content: {
              introductionBangla:
                'আপনার ডিভাইসের মাইক্রোফোন অন করে পরিষ্কার গলায় বাক্যগুলো বলুন। আমাদের সিস্টেম আপনার নির্ভুলতা যাচাই করবে।',
              practicePrompt: '‘നമസ്കാരം, സുഖമാണോ?’ বাক্যটি মুখে স্পষ্ট উচ্চারণে বলুন।',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'ml_lvl_9',
    levelNumber: 9,
    title: 'Level 9: Listening Practice',
    banglaTitle: 'লেভেল ৯: শোনার অনুশীলন',
    description: 'কেরালাবাসীদের দ্রুত কথা শুনে অর্থ চটজলদি অনুধাবন করা।',
    chapters: [
      {
        id: 'ml_ch_10',
        chapterNumber: 10,
        title: 'Chapter 10: Listening Comprehension',
        banglaTitle: 'অধ্যায় ১০: অডিও শুনে অর্থ নির্বাচন',
        description: 'অডিও শুনে সঠিক অর্থ নির্বাচন করার অনুশীলন।',
        lessons: [
          {
            id: 'ml_lvl9_ch10_l1',
            lessonNumber: 11,
            title: 'Fast vs Slow Listening',
            banglaTitle: 'পাঠ ১১: দ্রুত ও ধীরগতির অডিও বিশ্লেষণ',
            estimatedMinutes: 8,
            content: {
              introductionBangla:
                'প্রথমে সাধারণ গতিতে এবং বুঝতে অসুবিধা হলে 🐢 ধীরগতির অপশনে অডিও শুনুন।',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'ml_lvl_10',
    levelNumber: 10,
    title: 'Level 10: Advanced Conversation',
    banglaTitle: 'লেভেল ১০: উচ্চতর কথোপকথন ও কেরালা সংস্কৃতি',
    description: 'কেরালার ওনাম উৎসব, সিনেমা, রাজনীতি ও বন্ধুদের সাথে মুক্ত আড্ডা।',
    chapters: [
      {
        id: 'ml_ch_11',
        chapterNumber: 11,
        title: 'Chapter 11: Cultural Fluency & Idioms',
        banglaTitle: 'অধ্যায় ১১: কেরালার সংস্কৃতি ও প্রবাদ',
        description: 'কেরালা সমাজের গভীর আলাপচারিতা।',
        lessons: [
          {
            id: 'ml_lvl10_ch11_l1',
            lessonNumber: 12,
            title: 'Onam & Kerala Life',
            banglaTitle: 'পাঠ ১২: ওনাম উৎসব ও কেরালা জীবনযাত্রা',
            estimatedMinutes: 10,
            content: {
              introductionBangla:
                'কেরালার সবচেয়ে বড় উৎসব ওনাম (ഓണം)। এছাড়া কথাকলি নাচ ও ব্যাকওয়াটারস নিয়ে বন্ধু-বান্ধবের সাথে মন খুলে কথা বলুন।',
              sentences: [
                {
                  id: 's_l10_1',
                  languageId: 'malayalam',
                  target: 'എല്ലാവർക്കും ഓണാശംസകൾ!',
                  banglish: 'Ellaavarkkum Onashamsakal!',
                  bangla: 'সবাইকে ওনাম উৎসবের আন্তরিক শুভেচ্ছা!',
                  category: 'Culture',
                },
                {
                  id: 's_l10_2',
                  languageId: 'malayalam',
                  target: 'കേരളത്തിലെ ആളുകൾ വളരെ നല്ലവരാണ്.',
                  banglish: 'Keralathile aalukal valare nallavaraanu.',
                  bangla: 'কেরালার মানুষজন অত্যন্ত ভালো মনের ও আন্তরিক।',
                  category: 'Culture',
                },
              ],
            },
          },
        ],
      },
    ],
  },
];
