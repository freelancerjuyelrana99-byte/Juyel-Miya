import React, { useState } from 'react';
import { Volume2, X, Sparkles, BookOpen } from 'lucide-react';
import { AudioButton } from './AudioButton';
import { VoiceSettings } from '../types';
import { getMalayalamBanglaPronunciation } from '../utils/malayalamTransliteration';

export interface WordToken {
  target: string;
  banglish: string;
  bangla: string;
  banglaPronunciation?: string;
}

interface WordByWordSentenceProps {
  sentence: string;
  words?: WordToken[];
  locale: string;
  settings?: VoiceSettings;
  className?: string;
}

export const WordByWordSentence: React.FC<WordByWordSentenceProps> = ({
  sentence,
  words,
  locale,
  settings,
  className = '',
}) => {
  const [selectedWord, setSelectedWord] = useState<WordToken | null>(null);

  // If word tokens are not explicitly passed, split by spaces
  const tokens: WordToken[] =
    words && words.length > 0
      ? words
      : sentence.split(/\s+/).map((w) => ({
          target: w,
          banglish: w,
          bangla: 'শব্দটির উচ্চারণ শুনতে ট্যাপ করুন',
        }));

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex flex-wrap items-center gap-1.5 select-none">
        {tokens.map((token, index) => {
          const bnPron = token.banglaPronunciation || getMalayalamBanglaPronunciation(token.target);
          return (
            <button
              key={`${token.target}-${index}`}
              type="button"
              onClick={() => setSelectedWord(token)}
              className="group relative px-2.5 py-1.5 rounded-xl bg-white/95 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-900 transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95 text-left"
              title="শব্দটির বিস্তারিত উচ্চারণ ও অর্থ দেখতে ট্যাপ করুন"
            >
              <span className="font-bold text-base sm:text-lg tracking-wide group-hover:text-emerald-700 block font-malayalam">
                {token.target}
              </span>
              <span className="block text-[11px] font-bold text-emerald-800 font-bangla">
                {bnPron}
              </span>
              <span className="block text-[10px] text-slate-500 font-mono">
                {token.banglish}
              </span>
            </button>
          );
        })}
      </div>

      {/* Popover / Detail card when a word is selected */}
      {selectedWord && (
        <div className="mt-3 p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50/70 border border-emerald-200 rounded-2xl relative transition-all animate-fadeIn">
          <button
            type="button"
            onClick={() => setSelectedWord(null)}
            className="absolute top-2.5 right-2.5 text-slate-500 hover:text-slate-800 p-1 rounded-full hover:bg-white/80 cursor-pointer"
            aria-label="বন্ধ করুন"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pr-6 gap-3">
            <div className="space-y-1">
              <span className="text-xl font-black text-emerald-950 font-malayalam block">
                {selectedWord.target}
              </span>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 font-bold text-slate-800 font-bangla">
                  🇧🇩 উচ্চারণ: {selectedWord.banglaPronunciation || getMalayalamBanglaPronunciation(selectedWord.target)}
                </span>
                <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 font-mono text-slate-600">
                  🔤 English: {selectedWord.banglish}
                </span>
              </div>

              <p className="text-sm font-semibold text-emerald-900 font-bangla pt-0.5">
                💡 বাংলা অর্থ: {selectedWord.bangla}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
              <AudioButton
                text={selectedWord.target}
                locale={locale}
                settings={settings}
                size="md"
                className="bg-emerald-700 text-white hover:bg-emerald-800"
              />
              <AudioButton
                text={selectedWord.target}
                locale={locale}
                settings={settings}
                slow={true}
                size="md"
                className="bg-amber-100 text-amber-900 border-amber-200"
                title="ধীরগতির উচ্চারণ (🐢)"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
