/**
 * Malayalam Phonetic Transliteration Engine
 * Provides accurate Bengali (বাংলা) and English pronunciation for any Malayalam text.
 */

// Curated high-accuracy dictionary for common phrases and vocabulary
const MALAYALAM_TO_BANGLA_MAP: Record<string, { bangla: string; english?: string }> = {
  // Greetings & Courtesies
  'നമസ്കാരം': { bangla: 'নমস্কারম্', english: 'Namaskaaram' },
  'സുഖമാണോ': { bangla: 'সুখমাণো?', english: 'Sukhamaano?' },
  'സുഖമാണോ?': { bangla: 'সুখমাণো?', english: 'Sukhamaano?' },
  'സുഖം': { bangla: 'সুখম্', english: 'Sukham' },
  'സുഖമാണ്': { bangla: 'সুখমাণু', english: 'Sukhamanu' },
  'നന്ദി': { bangla: 'নন্দি', english: 'Nandi' },
  'വളരെ നന്ദി': { bangla: 'ভলরে নন্দি', english: 'Valare nandi' },
  'സ്വാഗതം': { bangla: 'স্বাগতং', english: 'Swaagatham' },
  'ശരി': { bangla: 'শরি', english: 'Shari' },
  'ക്ഷമിക്കണം': { bangla: 'ক্ষমিচ্ছণম্', english: 'Kshamikkanam' },
  'വിരോധമില്ല': { bangla: 'বিরোধমিল্লা', english: 'Virodhamilla' },
  'പോയി വരാം': { bangla: 'পোয়ি ভরাঁ', english: 'Poyi varaam' },

  // Daily & Work
  'ചേട്ടാ': { bangla: 'চেট্টা (দাদা/ভাই)', english: 'Chetta' },
  'ചേച്ചി': { bangla: 'চেচ্চি (দিদি/আপু)', english: 'Chechi' },
  'മുതലാളി': { bangla: 'মুথলালি (মালিক)', english: 'Muthalaali' },
  'ജോലി': { bangla: 'জোলি (কাজ)', english: 'Joli' },
  'കൂലി': { bangla: 'কূলি (মজুরি)', english: 'Coolie / Kooli' },
  'ശമ്പളം': { bangla: 'শম্বলম্ (বেতন)', english: 'Shambalam' },
  'പണം': { bangla: 'পণম্ (টাকা)', english: 'Panam' },
  'കാശ്': { bangla: 'কাশু (টাকা/পয়সা)', english: 'Kaashu' },
  'കട': { bangla: 'কডা (দোকান)', english: 'Kada' },
  'വീട്': { bangla: 'ভীডু (বাড়ি)', english: 'Veedu' },
  'മുറി': { bangla: 'মুরি (রুম/ঘর)', english: 'Muri' },
  'സമയം': { bangla: 'সময়ম্ (সময়)', english: 'Samayam' },
  'ഇന്ന്': { bangla: 'ইন্নু (আজ)', english: 'Innu' },
  'നാളെ': { bangla: 'নালে (কাল/আগামীকাল)', english: 'Naale' },
  'ഇന്നലെ': { bangla: 'ইন্নলে (গতকাল)', english: 'Innale' },

  // Food & Drinks
  'വെള്ളം': { bangla: 'ভল্লম্ (পানি)', english: 'Vellam' },
  'ചായ': { bangla: 'চায়া (চা)', english: 'Chaaya' },
  'ചോറ്': { bangla: 'চোরু (ভাত)', english: 'Choru' },
  'ഭക്ഷണം': { bangla: 'ভক্ষণম্ (খাবার)', english: 'Bhakshanam' },
  'മീൻ': { bangla: 'মীন (মাছ)', english: 'Meen' },
  'ഇറച്ചി': { bangla: 'ইরাচ্চি (মাংস)', english: 'Irachi' },
  'കോഴി': { bangla: 'কোঝি (মুরগি)', english: 'Kozhi' },
  'പാല്': { bangla: 'পালু (দুধ)', english: 'Paalu' },
  'പഞ്ചസാര': { bangla: 'পঞ্চসার (চিনি)', english: 'Panjasaara' },
  'ഉപ്പ്': { bangla: 'উপ্পু (লবণ)', english: 'Uppu' },
  'പൊറോട്ട': { bangla: 'পরোট্টা', english: 'Porotta' },
  'ദോശ': { bangla: 'দোশা', english: 'Dosha' },

  // Questions & Common Verbs
  'എന്താണ്': { bangla: 'এন্তাণু (কী)', english: 'Enthaanu' },
  'എവിടെ': { bangla: 'এভিডে (কোথায়)', english: 'Evide' },
  'എപ്പോൾ': { bangla: 'এপ্পোল (কখন)', english: 'Eppol' },
  'എങ്ങനെ': { bangla: 'এঙ্গনে (কীভাবে)', english: 'Engane' },
  'എത്ര': { bangla: 'এত্র (কত)', english: 'Ethra' },
  'എത്രയാണ്': { bangla: 'এত্রয়ানূ (দাম কত)', english: 'Ethrayaanu' },
  'ആര്': { bangla: 'আরু (কে)', english: 'Aaru' },
  'വേണം': { bangla: 'ভেনম্ (চাই/দরকার)', english: 'Venam' },
  'വേണ്ട': { bangla: 'ভেন্দা (চাই না/না)', english: 'Venda' },
  'ഉണ്ട്': { bangla: 'উণ্ডু (আছে)', english: 'Undu' },
  'ഇല്ല': { bangla: 'ইল্লা (নাই/নেই)', english: 'Illa' },
  'അറിയാം': { bangla: 'অরিয়াং (জানি)', english: 'Ariyaam' },
  'അറിയില്ല': { bangla: 'অরিয়িল্লা (জানি না)', english: 'Ariyilla' },
  'വരൂ': { bangla: 'ভরূ (আসুন)', english: 'Varoo' },
  'പോകൂ': { bangla: 'পোকূ (যান)', english: 'Pokoo' },
  'തരൂ': { bangla: 'তারূ (দিন)', english: 'Tharoo' },
  'സഹായം': { bangla: 'সহায়ম্ (সাহায্য)', english: 'Sahaayam' },
  'സഹായിക്കൂ': { bangla: 'সহায়িক্কূ (সাহায্য করুন)', english: 'Sahaayikkoo' },

  // Pronouns
  'ഞാൻ': { bangla: 'ঞান / নান (আমি)', english: 'Njaan' },
  'നീ': { bangla: 'নী (তুই/তুমি)', english: 'Nee' },
  'നിങ്ങൾ': { bangla: 'নিঙ্গাল (আপনি/তোমরা)', english: 'Ningal' },
  'അവൻ': { bangla: 'অভান (সে - পুরুষ)', english: 'Avan' },
  'അവൾ': { bangla: 'অভল (সে - মহিলা)', english: 'Aval' },
  'അവർ': { bangla: 'অভর (তারা/তিনি)', english: 'Avar' },
  'ഞങ്ങൾ': { bangla: 'নাঙ্গাল (আমরা)', english: 'Njangal' },
  'നമുക്ക്': { bangla: 'নমুক্কু (আমাদের/চলুন)', english: 'Namukku' },
  'എന്റെ': { bangla: 'এন্টে (আমার)', english: 'Ente' },
  'നിങ്ങളുടെ': { bangla: 'নিঙ্গালুডে (আপনার)', english: 'Ningalude' },

  // Full Sentences
  'നിങ്ങളുടെ പേര് എന്താണ്?': {
    bangla: 'নিঙ্গালুডে পেরু এন্তাণু?',
    english: 'Ningalude peru enthaanu?',
  },
  'എന്റെ പേര്...': {
    bangla: 'এন্টে পেরু...',
    english: 'Ente peru...',
  },
  'ഒരു ചായ തരൂ': {
    bangla: 'ওরু চায়া তারূ',
    english: 'Oru chaaya tharoo',
  },
  'ചേട്ടാ, ഒരു ചായ തരൂ': {
    bangla: 'চেট্টা, ওরু চায়া তারূ',
    english: 'Chetta, oru chaaya tharoo',
  },
  'കുറച്ച് വെള്ളം തരൂ': {
    bangla: 'কুরাচ্চু ভল্লম্ তারূ',
    english: 'Kurachu vellam tharoo',
  },
  'ഇതിന് എത്രയാണ് വില?': {
    bangla: 'ইথিনু এত্রয়ানূ ভিলা?',
    english: 'Ithinu ethrayaanu vila?',
  },
  'ഞാൻ ജോലിക്ക് പോകുന്നു': {
    bangla: 'নান জোলিক্কু পোকুন্নু',
    english: 'Njaan jolikku pokunnu',
  },
};

// Algorithmic rule mappings for fallback
const ML_CONSONANTS: Record<string, { bn: string; en: string }> = {
  'ക': { bn: 'ক', en: 'k' },
  'ഖ': { bn: 'খ', en: 'kh' },
  'ഗ': { bn: 'গ', en: 'g' },
  'ഘ': { bn: 'ঘ', en: 'gh' },
  'ങ': { bn: 'ঙ', en: 'ng' },
  'ച': { bn: 'চ', en: 'ch' },
  'ഛ': { bn: 'ছ', en: 'chh' },
  'ജ': { bn: 'জ', en: 'j' },
  'ഝ': { bn: 'ঝ', en: 'jh' },
  'ഞ': { bn: 'ঞ', en: 'nj' },
  'ട': { bn: 'ট', en: 't' },
  'ഠ': { bn: 'ঠ', en: 'th' },
  'ഡ': { bn: 'ড', en: 'd' },
  'ഢ': { bn: 'ঢ', en: 'dh' },
  'ണ': { bn: 'ণ', en: 'n' },
  'ത': { bn: 'ত', en: 'th' },
  'ഥ': { bn: 'থ', en: 'th' },
  'ദ': { bn: 'দ', en: 'd' },
  'ധ': { bn: 'ধ', en: 'dh' },
  'ന': { bn: 'ন', en: 'n' },
  'പ': { bn: 'প', en: 'p' },
  'ഫ': { bn: 'ফ', en: 'ph' },
  'ബ': { bn: 'ব', en: 'b' },
  'ഭ': { bn: 'ভ', en: 'bh' },
  'മ': { bn: 'ম', en: 'm' },
  'യ': { bn: 'য', en: 'y' },
  'ര': { bn: 'র', en: 'r' },
  'ല': { bn: 'ল', en: 'l' },
  'വ': { bn: 'ভ', en: 'v' },
  'ശ': { bn: 'শ', en: 'sh' },
  'ഷ': { bn: 'ষ', en: 'sh' },
  'സ': { bn: 'স', en: 's' },
  'ഹ': { bn: 'হ', en: 'h' },
  'ള': { bn: 'ল', en: 'l' },
  'ഴ': { bn: 'ঝ/ড়', en: 'zh' },
  'റ': { bn: 'র', en: 'r' },
};

const ML_INDEPENDENT_VOWELS: Record<string, { bn: string; en: string }> = {
  'അ': { bn: 'অ', en: 'a' },
  'ആ': { bn: 'আ', en: 'aa' },
  'ഇ': { bn: 'ই', en: 'i' },
  'ഈ': { bn: 'ঈ', en: 'ee' },
  'ഉ': { bn: 'উ', en: 'u' },
  'ഊ': { bn: 'ঊ', en: 'oo' },
  'ഋ': { bn: 'ঋ', en: 'ri' },
  'എ': { bn: 'এ', en: 'e' },
  'ഏ': { bn: 'এ', en: 'ee' },
  'ഐ': { bn: 'ঐ', en: 'ai' },
  'ഒ': { bn: 'ও', en: 'o' },
  'ഓ': { bn: 'ও', en: 'oo' },
  'ഔ': { bn: 'ঔ', en: 'au' },
};

const ML_VOWEL_SIGNS: Record<string, { bn: string; en: string }> = {
  'ാ': { bn: 'া', en: 'aa' },
  'ി': { bn: 'ি', en: 'i' },
  'ീ': { bn: 'ী', en: 'ee' },
  'ു': { bn: 'ু', en: 'u' },
  'ൂ': { bn: 'ূ', en: 'oo' },
  'ൃ': { bn: 'ৃ', en: 'ri' },
  'െ': { bn: 'ে', en: 'e' },
  'േ': { bn: 'ে', en: 'ee' },
  'ൈ': { bn: 'ৈ', en: 'ai' },
  'ൊ': { bn: 'ো', en: 'o' },
  'ോ': { bn: 'ো', en: 'oo' },
  'ൌ': { bn: 'ৌ', en: 'au' },
};

const ML_CHILLUS: Record<string, { bn: string; en: string }> = {
  'ൽ': { bn: 'ল্', en: 'l' },
  'ൾ': { bn: 'ল্', en: 'l' },
  'ർ': { bn: 'র্', en: 'r' },
  'ൻ': { bn: 'ন্', en: 'n' },
  'ൺ': { bn: 'ণ্', en: 'n' },
  'ൿ': { bn: 'ক্', en: 'k' },
};

/**
 * Transliterates any Malayalam text to Bengali phonetic pronunciation.
 */
export function getMalayalamBanglaPronunciation(text: string): string {
  if (!text) return '';
  const trimmed = text.trim();

  // Check direct exact dictionary match
  if (MALAYALAM_TO_BANGLA_MAP[trimmed]) {
    // Strip annotations in parentheses if needed, or return clean
    return MALAYALAM_TO_BANGLA_MAP[trimmed].bangla.replace(/\s*\([^)]*\)/g, '');
  }

  // Tokenize by words and punctuation
  const words = trimmed.split(/([\s,?!.।]+)/);
  const resultWords = words.map((token) => {
    const clean = token.trim();
    if (!clean || /^[\s,?!.।]+$/.test(clean)) {
      return token;
    }

    if (MALAYALAM_TO_BANGLA_MAP[clean]) {
      return MALAYALAM_TO_BANGLA_MAP[clean].bangla.replace(/\s*\([^)]*\)/g, '');
    }

    // Algorithmic conversion of Malayalam token
    let bnOutput = '';
    const chars = Array.from(clean);
    let i = 0;

    while (i < chars.length) {
      const char = chars[i];
      const nextChar = chars[i + 1];

      // Chillu letters
      if (ML_CHILLUS[char]) {
        bnOutput += ML_CHILLUS[char].bn;
        i++;
        continue;
      }

      // Independent vowels
      if (ML_INDEPENDENT_VOWELS[char]) {
        bnOutput += ML_INDEPENDENT_VOWELS[char].bn;
        i++;
        continue;
      }

      // Consonants
      if (ML_CONSONANTS[char]) {
        const consBn = ML_CONSONANTS[char].bn;

        if (nextChar === '്') {
          // Virama
          const afterVirama = chars[i + 2];
          if (!afterVirama || /[\s,?!.]/.test(afterVirama)) {
            // End-of-word samvruthokaram in Malayalam sounds like 'u' (e.g. ആണ് -> আণু, ഉണ്ട് -> উণ্ডু)
            bnOutput += consBn + 'ু';
          } else {
            // Conjunct consonant
            bnOutput += consBn + '্';
          }
          i += 2;
        } else if (nextChar && ML_VOWEL_SIGNS[nextChar]) {
          // Consonant + Vowel sign
          bnOutput += consBn + ML_VOWEL_SIGNS[nextChar].bn;
          i += 2;
        } else if (nextChar === 'ം') {
          // Anusvara
          bnOutput += consBn + 'ম্';
          i += 2;
        } else if (nextChar === 'ഃ') {
          // Visarga
          bnOutput += consBn + 'ঃ';
          i += 2;
        } else {
          // Default inherent vowel
          bnOutput += consBn;
          i++;
        }
        continue;
      }

      // Other symbols / signs
      if (char === 'ം') {
        bnOutput += 'ম্';
      } else if (char === 'ഃ') {
        bnOutput += 'ঃ';
      } else {
        bnOutput += char;
      }
      i++;
    }

    return bnOutput || clean;
  });

  return resultWords.join('');
}

/**
 * Returns phonetic English transliteration for Malayalam text if not provided
 */
export function getMalayalamEnglishPronunciation(text: string, existingBanglish?: string): string {
  if (existingBanglish && existingBanglish.trim()) {
    return existingBanglish.trim();
  }
  if (!text) return '';
  const trimmed = text.trim();
  if (MALAYALAM_TO_BANGLA_MAP[trimmed]?.english) {
    return MALAYALAM_TO_BANGLA_MAP[trimmed].english!;
  }
  return text;
}
