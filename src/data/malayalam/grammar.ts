import { GrammarTopic } from '../../types';

export const MALAYALAM_GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'ml_g_pronouns',
    title: 'Pronouns (সর্বনাম)',
    banglaTitle: 'আমি, তুমি, আপনি ও সে — সর্বনামের সহজ ব্যবহার',
    summary: 'মালয়ালমে কাউকে সম্মান দিয়ে কথা বলা এবং সাধারণ কথ্য রূপের পার্থক্য বোঝা খুবই জরুরি।',
    explanation:
      'বাংলা ব্যাকরণের মতো মালয়ালমেও প্রথম পুরুষ, দ্বিতীয় পুরুষ ও তৃতীয় পুরুষের স্পষ্ট রূপ রয়েছে। বিশেষ করে ‘আপনি’ (Ningal) ও ‘তুমি’ (Nee) এর তফাত কেরালাতে বজায় রাখা ভালো। বড় বা অপরিচিত কাউকে সবসময় ‘Ningal’ (നിങ്ങൾ) বলবেন।',
    examples: [
      {
        target: 'ഞാൻ',
        banglish: 'Njaan',
        bangla: 'আমি',
        breakdown: 'বাংলা ‘আমি’ এর সম্পূর্ণ প্রতিশব্দ। বাক্য শুরুতে বসে।',
      },
      {
        target: 'നീ',
        banglish: 'Nee',
        bangla: 'তুমি / তুই (সমবয়সী বা ছোটদের জন্য)',
        breakdown: 'ঘনিষ্ঠ বন্ধু বা ছোটদের ক্ষেত্রে ব্যবহৃত হয়।',
      },
      {
        target: 'നിങ്ങൾ',
        banglish: 'Ningal',
        bangla: 'আপনি / আপনারা (সম্মানসূচক)',
        breakdown: 'অপরিচিত যে কাউকে সম্মান দিতে এটি ব্যবহার করুন।',
      },
      {
        target: 'അവൻ',
        banglish: 'Avan',
        bangla: 'সে (ছেলে)',
        breakdown: 'পুংলিঙ্গ একবচন।',
      },
      {
        target: 'അവൾ',
        banglish: 'Aval',
        bangla: 'সে (মেয়ে)',
        breakdown: 'স্ত্রীলিঙ্গ একবচন।',
      },
      {
        target: 'അവർ',
        banglish: 'Avar',
        bangla: 'তারা / উনারা (সম্মানিত ব্যক্তি বা বহুবচন)',
        breakdown: 'সম্মানিত যেকোনো একক ব্যক্তি বা বহু মানুষের জন্য।',
      },
      {
        target: 'നമ്മൾ / ഞങ്ങൾ',
        banglish: 'Nammal / Njangal',
        bangla: 'আমরা (সবাই মিলে / কেবল আমরা)',
        breakdown: 'Nammal = আপনি সহ আমরা, Njangal = শ্রোতা বাদে আমরা।',
      },
    ],
    tips: [
      'দোকানদার, ড্রাইভার বা বয়োজ্যেষ্ঠ কাউকে ‘ചേട്ടാ’ (Chetta - বড় ভাই) অথবা ‘Ningal’ বলে সম্বোধন করবেন।',
      'নিজের জন্য সবসময় ‘Njaan’ (ഞാൻ) ব্যবহার করবেন।',
    ],
  },
  {
    id: 'ml_g_structure',
    title: 'Sentence Structure (বাক্য গঠন)',
    banglaTitle: 'SOV বিন্যাস — কর্তা + কর্ম + ক্রিয়া',
    summary: 'মালয়ালম বাক্যের গঠন বাংলার হুবহু অনুরূপ! ফলে বাঙালিদের জন্য এটি শেখা সবচেয়ে সহজ।',
    explanation:
      'ইংরেজিতে যেমন বলা হয় "I eat rice" (Subject + Verb + Object), মালয়ালম ও বাংলায় ঠিক উল্টো: "আমি ভাত খাই" অর্থাৎ Subject (কর্তা) + Object (কর্ম) + Verb (ক্রিয়া)।\n\nউদাহরণ:\nഞാൻ (আমি) + ചോറ് (ভাত) + കഴിക്കുന്നു (খাচ্ছি)।\nNjaan choru kazhikkunnu.',
    examples: [
      {
        target: 'ഞാൻ വെള്ളം കുടിക്കുന്നു.',
        banglish: 'Njaan vellam kudikkunnu.',
        bangla: 'আমি পানি পান করছি।',
        breakdown: 'Njaan (আমি) + Vellam (পানি) + Kudikkunnu (পান করছি)',
      },
      {
        target: 'അവൻ ജോലി ചെയ്യുന്നു.',
        banglish: 'Avan joli cheyyunnu.',
        bangla: 'সে কাজ করছে।',
        breakdown: 'Avan (সে) + Joli (কাজ) + Cheyyunnu (করছে)',
      },
      {
        target: 'അമ്മ ഭക്ഷണം ഉണ്ടാക്കുന്നു.',
        banglish: 'Amma bhakshanam undaakkunnu.',
        bangla: 'মা খাবার বানাচ্ছেন।',
        breakdown: 'Amma (মা) + Bhakshanam (খাবার) + Undaakkunnu (বানাচ্ছেন)',
      },
    ],
    tips: [
      'ক্রিয়া (কাজ) সবসময় বাক্যের শেষেই থাকবে।',
      'কথোপকথনে অনেক সময় কর্তা (Subject) বাদ দিয়েও শুধু "Vellam venam" (পানি লাগবে) বলা যায়।',
    ],
  },
  {
    id: 'ml_g_present',
    title: 'Present Tense (বর্তমান কাল)',
    banglaTitle: 'বর্তমান কালের রূপ: -unnu (-ഉന്നു) যোগ করা',
    summary: 'কোনো কাজ এখন হচ্ছে বোঝাতে ক্রিয়ামূলের সাথে -unnu যোগ করলেই বর্তমান কাল হয়ে যায়।',
    explanation:
      'মালয়ালম ভাষায় ক্রিয়াপদ লিঙ্গ বা বচনভেদে পরিবর্তন হয় না! অর্থাৎ ছেলে, মেয়ে, আমি, তুমি সবার জন্যই বর্তমান কালের রূপ একই থাকে। যা ইংরেজি বা হিন্দির চেয়েও অনেক সহজ!\n\nমূল ক্রিয়া + -unnu:\n• Po (যাওয়া) → Pokunnu (যাচ্ছি / যায় / যাচ্ছে)\n• Vaa (আসা) → Varunnu (আসছি / আসে / আসছে)\n• Kazhikku (খাওয়া) → Kazhikkunnu (খাচ্ছি / খায়)',
    examples: [
      {
        target: 'ഞാൻ പോകുന്നു.',
        banglish: 'Njaan pokunnu.',
        bangla: 'আমি যাচ্ছি।',
        breakdown: 'Njaan (আমি) + Pokunnu (যাচ্ছি)',
      },
      {
        target: 'അവൾ വരുന്നു.',
        banglish: 'Aval varunnu.',
        bangla: 'সে আসছে।',
        breakdown: 'Aval (সে) + Varunnu (আসছে)',
      },
      {
        target: 'അവർ സംസാരിക്കുന്നു.',
        banglish: 'Avar samsaarikkunnu.',
        bangla: 'তারা কথা বলছে।',
        breakdown: 'Avar (তারা) + Samsaarikkunnu (কথা বলছে)',
      },
    ],
  },
  {
    id: 'ml_g_past',
    title: 'Past Tense (অতীত কাল)',
    banglaTitle: 'অতীত কাল: -i / -u প্রত্যয়',
    summary: 'যে কাজটি শেষ হয়ে গেছে বোঝাতে ক্রিয়ার শেষে সাধারণত -i বা -u যোগ হয়।',
    explanation:
      'অতীতকালের জন্য কিছু সাধারণ পরিবর্তন:\n• Pokuka (যাওয়া) → Poyi (গিয়েছিল / গেছে)\n• Varuka (আসা) → Vannu (এসেছিল / এসেছে)\n• Kazhikkuka (খাওয়া) → Kazhichu (খেয়েছে / খেয়েছিল)\n• Cheyyuka (করা) → Cheythu (করেছে)',
    examples: [
      {
        target: 'ഞാൻ പോയി.',
        banglish: 'Njaan poyi.',
        bangla: 'আমি গিয়েছিলাম / গেলাম।',
        breakdown: 'Poyi = অতীতকালের রূপ',
      },
      {
        target: 'അവൻ വന്നു.',
        banglish: 'Avan vannu.',
        bangla: 'সে এসেছে।',
        breakdown: 'Vannu = চলে এসেছে',
      },
      {
        target: 'ഞാൻ ഭക്ഷണം കഴിച്ചു.',
        banglish: 'Njaan bhakshanam kazhichu.',
        bangla: 'আমি খাবার খেয়েছি।',
        breakdown: 'Kazhichu = খেয়ে ফেলেছি',
      },
    ],
  },
  {
    id: 'ml_g_future',
    title: 'Future Tense (ভবিষ্যত কাল)',
    banglaTitle: 'ভবিষ্যত কাল: -um (-ഉം) যোগ করা',
    summary: 'ভবিষ্যতে কোনো কাজ হবে বোঝাতে ক্রিয়ার শেষে -um ধ্বনি যুক্ত হয়।',
    explanation:
      'যেমন বাংলায় "যাবো", "করবো", "খাবো" — ঠিক তেমনি মালয়ালমে ক্রিয়ামূলের সাথে -um যুক্ত হয়:\n• Pokum (যাবো / যাবে)\n• Varum (আসবো / আসবে)\n• Kazhikkum (খাবো / খাবে)\n• Cheyyum (করবো / করবে)',
    examples: [
      {
        target: 'ഞാൻ നാളെ വരും.',
        banglish: 'Njaan naale varum.',
        bangla: 'আমি কাল আসব।',
        breakdown: 'Njaan (আমি) + Naale (কাল) + Varum (আসব)',
      },
      {
        target: 'നമുക്ക് പിന്നീട് സംസാരിക്കാം.',
        banglish: 'Namukku pinneedu samsaarikaam.',
        bangla: 'আমরা পরে কথা বলব।',
        breakdown: '-aam রূপ দিয়ে "চলুন কথা বলি/বলব" বোঝায়',
      },
      {
        target: 'ബസ് ഇപ്പോൾ വരും.',
        banglish: 'Bus ippol varum.',
        bangla: 'বাস এখনই আসবে।',
        breakdown: 'Ippol (এখন) + Varum (আসবে)',
      },
    ],
  },
  {
    id: 'ml_g_questions',
    title: 'Questions (প্রশ্নবোধক বাক্য)',
    banglaTitle: 'প্রশ্ন তৈরি: -o (-ഓ) ধ্বনি যোগ করা',
    summary: 'যেকোনো সাধারণ বাক্যের শেষে ‘-o’ (ও) টানলে তা হ্যাঁ/না জাতীয় প্রশ্নে পরিণত হয়।',
    explanation:
      'যেমন:\n• Sukham (ভালো) → Sukhamaano? (ভালো আছেন কি?)\n• Kazhichu (খেয়েছি) → Kazhicho? (খেয়েছেন কি?)\n• Manassilaayi (বুঝেছি) → Manassilaayo? (বুঝেছেন কি?)\n\nএছাড়া প্রশ্নসূচক শব্দ:\n• Enthu? (কী?)\n• Evide? (কোথায়?)\n• Eppol? (কখন?)\n• Ethra? (কত?)',
    examples: [
      {
        target: 'ഭക്ഷണം കഴിച്ചോ?',
        banglish: 'Bhakshanam kazhicho?',
        bangla: 'খাবার খেয়েছেন কি?',
        breakdown: 'Kazhichu + o = Kazhicho?',
      },
      {
        target: 'മനസ്സിലായോ?',
        banglish: 'Manassilaayo?',
        bangla: 'বুঝতে পেরেছেন কি?',
        breakdown: 'Manassilaayi + o = Manassilaayo?',
      },
      {
        target: 'നിങ്ങൾ എവിടെ പോകുന്നു?',
        banglish: 'Ningal evide pokunnu?',
        bangla: 'আপনি কোথায় যাচ্ছেন?',
        breakdown: 'Evide (কোথায়) প্রশ্নবাচক শব্দ',
      },
    ],
  },
  {
    id: 'ml_g_negatives',
    title: 'Negative Sentences (না-বোধক বাক্য)',
    banglaTitle: 'না-বোধক রূপ: Alla (അല്ല) এবং Illa (ഇല്ല)',
    summary: 'কোনো কিছু ‘নয়’ বোঝাতে Alla এবং কোনো কিছু ‘নেই / করিনি’ বোঝাতে Illa ব্যবহার হয়।',
    explanation:
      '১. Alla (അല്ല): পরিচয় বা গুণ অস্বীকার করতে (যেমন: আমি ডাক্তার নই = Njaan doctor alla).\n২. Illa (ഇല്ല): কোনো বস্তু বা উপস্থিতি না থাকলে (যেমন: টাকা নেই = Panam illa).\n৩. Venda (വേണ്ട): কোনো কিছু না চাইলে বা নিষেধ করতে (যেমন: লাগবে না = Venda).',
    examples: [
      {
        target: 'ഇവിടെ വെള്ളം ഇല്ല.',
        banglish: 'Ivide vellam illa.',
        bangla: 'এখানে পানি নেই।',
        breakdown: 'Illa = নেই',
      },
      {
        target: 'എനിക്ക് ഇത് വേണ്ട.',
        banglish: 'Enikku ithu venda.',
        bangla: 'আমার এটা লাগবে না / চাই না।',
        breakdown: 'Venda = লাগবে না',
      },
      {
        target: 'അവൻ എന്റെ സുഹൃത്ത് അല്ല.',
        banglish: 'Avan ente suhruthu alla.',
        bangla: 'সে আমার বন্ধু নয়।',
        breakdown: 'Alla = নয়',
      },
    ],
  },
  {
    id: 'ml_g_polite_casual',
    title: 'Polite vs Casual Speech (ভদ্র বনাম অনানুষ্ঠানিক ভাষা)',
    banglaTitle: 'ভদ্র ও সাধারণ কথার ব্যবহার',
    summary: 'কেরালাতে বয়সে বড় বা অপরিচিতদের সাথে সবসময় ভদ্র রূপ ‘-oo’ (oo ending) ব্যবহার করা হয়।',
    explanation:
      'ক্রিয়াপদে কাউকে অনুরোধ করতে শেষে ‘-oo’ যুক্ত হয়:\n• Vaa (এসো - ক্যাজুয়াল) → Varoo (আসুন - ভদ্র)\n• Thaa (দাও - ক্যাজুয়াল) → Tharoo (দিন - ভদ্র)\n• Poku (যাও - ক্যাজুয়াল) → Pokoo (যান - ভদ্র)\n• Irikku (বসো - ক্যাজুয়াল) → Irikkoo (বসুন - ভদ্র)',
    examples: [
      {
        target: 'ഇവിടെ ഇരിക്കൂ.',
        banglish: 'Ivide irikkoo.',
        bangla: 'এখানে বসুন (ভদ্রভাবে)।',
        breakdown: 'Irikkoo = বসুন',
      },
      {
        target: 'ഒരു ചായ തരൂ.',
        banglish: 'Oru chaaya tharoo.',
        bangla: 'এক কাপ চা দিন (দোকানে কথা বলার সঠিক রূপ)।',
        breakdown: 'Tharoo = দিন',
      },
      {
        target: 'ദയവായി കേൾക്കൂ.',
        banglish: 'Dayavaayi kaelkkoo.',
        bangla: 'দয়া করে শুনুন।',
        breakdown: 'Kaelkkoo = শুনুন',
      },
    ],
  },
];
