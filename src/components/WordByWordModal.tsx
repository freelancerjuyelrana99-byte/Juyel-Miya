import React, { useState } from 'react';
import { Volume2, X, Sparkles, BookOpen } from 'lucide-react';
import { AudioButton } from './AudioButton';
import { VoiceSettings } from '../types';

export interface WordToken {
  target: string;
  banglish: string;
  bangla: string;
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
        {tokens.map((token, index) => (
          <button
            key={`${token.target}-${index}`}
            type="button"
            onClick={() => setSelectedWord(token)}
            className="group relative px-2.5 py-1 rounded-lg bg-white/90 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-900 transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
            title="শব্দটির অর্থ দেখতে ট্যাপ করুন"
          >
            <span className="font-semibold text-base sm:text-lg tracking-wide group-hover:text-emerald-700">
              {token.target}
            </span>
            <span className="block text-[10px] text-slate-600 font-sans tracking-tight">
              {token.banglish}
            </span>
          </button>
        ))}
      </div>

      {/* Popover / Detail card when a word is selected */}
      {selectedWord && (
        <div className="mt-3 p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50/60 border border-emerald-200 rounded-xl relative transition-all animate-fadeIn">
          <button
            type="button"
            onClick={() => setSelectedWord(null)}
            className="absolute top-2.5 right-2.5 text-slate-600 hover:text-slate-800 p-1 rounded-full hover:bg-white/80"
            aria-label="বন্ধ করুন"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start justify-between pr-6 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-emerald-950 font-malayalam">
                  {selectedWord.target}
                </span>
                <span className="text-xs text-slate-600 font-mono">
                  [{selectedWord.banglish}]
                </span>
              </div>
              <p className="text-sm font-medium text-slate-800 mt-1">
                বাংলা অর্থ: <span className="text-emerald-800 font-semibold">{selectedWord.bangla}</span>
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <AudioButton
                text={selectedWord.target}
                locale={locale}
                settings={settings}
                size="md"
                showLabel={false}
              />
              <AudioButton
                text={selectedWord.target}
                locale={locale}
                settings={settings}
                slow={true}
                size="sm"
                className="bg-amber-50 text-amber-800 border-amber-200"
                title="ধীরে শুনুন (🐢)"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
