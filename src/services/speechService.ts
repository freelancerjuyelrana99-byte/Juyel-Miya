import { VoiceSettings } from '../types';

// Speech synthesis helper
let synth: SpeechSynthesis | null = null;
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  synth = window.speechSynthesis;
}

export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (!synth) return [];
  return synth.getVoices();
}

export function findVoiceForLocale(locale: string, preferredName?: string): SpeechSynthesisVoice | null {
  const voices = getAvailableVoices();
  if (!voices || voices.length === 0) return null;

  if (preferredName) {
    const preferred = voices.find(v => v.name === preferredName);
    if (preferred) return preferred;
  }

  // Exact match (e.g. ml-IN, en-US)
  const exact = voices.find(v => v.lang.toLowerCase() === locale.toLowerCase());
  if (exact) return exact;

  // Prefix match (e.g. ml or en)
  const baseLang = locale.split('-')[0].toLowerCase();
  const prefixMatch = voices.find(v => v.lang.toLowerCase().startsWith(baseLang));
  if (prefixMatch) return prefixMatch;

  return null;
}

export interface SpeakOptions {
  slow?: boolean;
  rate?: number;
  pitch?: number;
  volume?: number;
  preferredVoice?: string;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

export function speakText(
  text: string,
  locale: string,
  settings?: VoiceSettings,
  options?: SpeakOptions
): Promise<boolean> {
  return new Promise((resolve) => {
    if (!synth) {
      console.warn('Speech synthesis not supported in this environment');
      resolve(false);
      return;
    }

    try {
      synth.cancel(); // Stop any pending utterance

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = locale;

      // Rate calculation:
      let effectiveRate = options?.rate ?? (settings?.rate ?? 0.95);
      if (options?.slow || settings?.slowMode) {
        effectiveRate = 0.65;
      }
      utterance.rate = effectiveRate;
      utterance.pitch = options?.pitch ?? (settings?.pitch ?? 1.0);
      utterance.volume = options?.volume ?? (settings?.volume ?? 1.0);

      const voice = findVoiceForLocale(locale, options?.preferredVoice ?? settings?.preferredVoiceName);
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onend = () => {
        options?.onEnd?.();
        resolve(true);
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis notice:', e);
        options?.onError?.(e);
        resolve(false);
      };

      synth.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
      resolve(false);
    }
  });
}

export function stopSpeaking() {
  if (synth) {
    synth.cancel();
  }
}

// ----------------------------------------------------------------------
// Speech Recognition (Web Speech API)
// ----------------------------------------------------------------------

declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
}

export interface RecognitionSession {
  stop: () => void;
}

export function startSpeechRecognition(
  locale: string,
  onResult: (transcript: string, isFinal: boolean) => void,
  onError: (error: string) => void,
  onEnd: () => void
): RecognitionSession | null {
  if (!isSpeechRecognitionSupported()) {
    onError('আপনার ব্রাউজারে স্পিচ রিকগনিশন সক্রিয় নেই (Chrome / Edge ব্রাউজার ব্যবহার করুন)।');
    return null;
  }

  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRec();

  recognition.lang = locale;
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event: any) => {
    let interim = '';
    let final = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final += event.results[i][0].transcript;
      } else {
        interim += event.results[i][0].transcript;
      }
    }

    const transcript = final.trim() || interim.trim();
    onResult(transcript, Boolean(final.trim()));
  };

  recognition.onerror = (event: any) => {
    let msg = 'মাইক্রোফোনে কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।';
    if (event.error === 'no-speech') {
      msg = 'কোনো কথা শোনা যায়নি। আবার স্পষ্ট করে বলুন।';
    } else if (event.error === 'not-allowed') {
      msg = 'মাইক্রোফোনের অনুমতি প্রদান করা হয়নি। ব্রাউজার সেটিংসে অনুমতি দিন।';
    }
    onError(msg);
  };

  recognition.onend = () => {
    onEnd();
  };

  try {
    recognition.start();
  } catch (err: any) {
    onError(err.message || 'রিকগনিশন শুরু হতে পারেনি');
    return null;
  }

  return {
    stop: () => {
      try {
        recognition.stop();
      } catch {
        // ignore
      }
    },
  };
}

// ----------------------------------------------------------------------
// Pronunciation Similarity & Evaluation
// ----------------------------------------------------------------------

function cleanToken(str: string): string {
  return str
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"“”‘’]/g, '')
    .trim();
}

function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
}

export type ScoreTier = 'excellent' | 'good' | 'almost' | 'retry';

export interface EvaluationResult {
  score: number; // 0 - 100
  tier: ScoreTier;
  labelBangla: string;
  badgeColor: string;
  feedbackBangla: string;
}

export function evaluatePronunciation(
  spokenText: string,
  targetScript: string,
  targetRoman: string
): EvaluationResult {
  const spoken = cleanToken(spokenText);
  const target1 = cleanToken(targetScript);
  const target2 = cleanToken(targetRoman);

  if (!spoken) {
    return {
      score: 0,
      tier: 'retry',
      labelBangla: '✗ Try Again',
      badgeColor: 'text-rose-600 bg-rose-50 border-rose-200',
      feedbackBangla: 'কিছু শোনা যায়নি। পরিষ্কার স্বরে মাইক্রোফোনে কথা বলুন।',
    };
  }

  // Exact match either script or romanized
  if (spoken === target1 || spoken === target2) {
    return {
      score: 100,
      tier: 'excellent',
      labelBangla: '✓ Excellent (চমৎকার!)',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      feedbackBangla: 'আপনার উচ্চারণ একেবারেই নির্ভুল হয়েছে!',
    };
  }

  // Check character distances against romanized and target
  const dist1 = levenshteinDistance(spoken, target1);
  const dist2 = levenshteinDistance(spoken, target2);
  const bestDist = Math.min(dist1, dist2);
  const maxLen = Math.max(spoken.length, target2.length, 1);

  const charSimilarity = Math.max(0, 1 - bestDist / maxLen) * 100;

  // Word token overlap
  const spokenWords = spoken.split(/\s+/).filter(Boolean);
  const targetWords = target2.split(/\s+/).filter(Boolean);
  let matchedCount = 0;
  for (const w of spokenWords) {
    if (targetWords.some(tw => tw.includes(w) || w.includes(tw) || levenshteinDistance(w, tw) <= 1)) {
      matchedCount++;
    }
  }
  const tokenSimilarity = targetWords.length > 0 ? (matchedCount / targetWords.length) * 100 : 0;

  const finalScore = Math.round(Math.max(charSimilarity * 0.5 + tokenSimilarity * 0.5, charSimilarity));

  if (finalScore >= 80) {
    return {
      score: finalScore,
      tier: 'excellent',
      labelBangla: '✓ Excellent (চমৎকার!)',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      feedbackBangla: 'খুব সুন্দর হয়েছে! উচ্চারণ স্পষ্ট ও স্বাভাবিক।',
    };
  } else if (finalScore >= 60) {
    return {
      score: finalScore,
      tier: 'good',
      labelBangla: '✓ Good (বেশ ভালো)',
      badgeColor: 'text-teal-700 bg-teal-50 border-teal-200',
      feedbackBangla: 'ভালো হয়েছে, আরেকটু চেষ্টা করলে নিখুঁত হবে।',
    };
  } else if (finalScore >= 40) {
    return {
      score: finalScore,
      tier: 'almost',
      labelBangla: '△ Almost Correct (প্রায় কাছাকাছি)',
      badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
      feedbackBangla: 'কাছাকাছি গেছেন! ধীরগতিতে অডিও শুনে আবার বলুন।',
    };
  } else {
    return {
      score: finalScore,
      tier: 'retry',
      labelBangla: '✗ Try Again (আবার চেষ্টা করুন)',
      badgeColor: 'text-rose-700 bg-rose-50 border-rose-200',
      feedbackBangla: 'উচ্চারণে গরমিল হয়েছে। 🐢 ধীরগতির অডিও শুনে অনুশীলন করুন।',
    };
  }
}
