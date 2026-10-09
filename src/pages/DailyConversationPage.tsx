import React, { useState } from 'react';
import { Compass, Volume2, Search, Heart, Sparkles } from 'lucide-react';
import { LanguageMetadata, UserProgress, VoiceSettings, SentenceItem } from '../types';
import { getSentencesForLanguage } from '../data';
import { AudioButton } from '../components/AudioButton';
import { WordByWordSentence } from '../components/WordByWordModal';
import { getMalayalamBanglaPronunciation } from '../utils/malayalamTransliteration';

interface DailyConversationPageProps {
  language: LanguageMetadata;
  progress: UserProgress;
  onToggleFavorite: (id: string) => void;
  voiceSettings: VoiceSettings;
}

export const DailyConversationPage: React.FC<DailyConversationPageProps> = ({
  language,
  progress,
  onToggleFavorite,
  voiceSettings,
}) => {
  const sentences = getSentencesForLanguage(language.id);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = sentences.filter((s) => {
    const term = searchTerm.toLowerCase();
    return (
      s.target.toLowerCase().includes(term) ||
      s.banglish.toLowerCase().includes(term) ||
      s.bangla.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-semibold border border-indigo-200">
          <Compass className="w-3.5 h-3.5" />
          <span>বাস্তব জীবনের জরুরি বাক্যমালা</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          প্রতিদিনের কথা (Daily Conversation)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-bangla max-w-2xl leading-relaxed">
          কেরালা ও প্রবাসে চলাফেরার জন্য ২০+টি অতি প্রয়োজনীয় বাক্য। প্রতিটি শব্দের উপর ট্যাপ করে আলাদাভাবে অর্থ ও উচ্চারণ দেখুন।
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="বাক্য বা অর্থ সার্চ করুন (যেমন: নাম, ক্ষুধা, দাম, পানি)..."
          className="w-full pl-10 pr-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-2xs"
        />
      </div>

      {/* Sentences List */}
      <div className="space-y-4">
        {filtered.map((item, index) => {
          const isFav = progress.favorites.includes(item.id);
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:border-emerald-300 transition-all space-y-3"
            >
              {/* Header: Roman & Bangla pronunciation & Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-800 font-bangla">
                      🇧🇩 বাংলা উচ্চারণ:{' '}
                      <span className="text-emerald-900 font-extrabold">
                        {item.banglaPronunciation || getMalayalamBanglaPronunciation(item.target)}
                      </span>
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono ml-8">
                    🔤 English: <span className="font-semibold text-slate-700">{item.banglish}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(item.id)}
                    className="p-1.5 rounded-full hover:bg-rose-50 text-slate-300 hover:text-rose-500 transition-colors cursor-pointer"
                    title={isFav ? 'পছন্দ থেকে সরান' : 'পছন্দ করুন'}
                  >
                    <Heart
                      className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`}
                    />
                  </button>
                  <AudioButton
                    text={item.target}
                    locale={language.voiceCode}
                    settings={voiceSettings}
                    size="sm"
                  />
                  <AudioButton
                    text={item.target}
                    locale={language.voiceCode}
                    settings={voiceSettings}
                    slow={true}
                    size="sm"
                    className="bg-amber-50 text-amber-800 border-amber-200"
                    title="ধীরগতির উচ্চারণ (🐢)"
                  />
                </div>
              </div>

              {/* Word-by-word interactive tokens */}
              <WordByWordSentence
                sentence={item.target}
                words={item.words}
                locale={language.voiceCode}
                settings={voiceSettings}
              />

              {/* Bangla Translation */}
              <div className="pt-2 border-t border-slate-100/80 flex items-center justify-between text-sm">
                <p className="font-bold text-slate-800 font-bangla">
                  বাংলা: <span className="text-emerald-800">{item.bangla}</span>
                </p>
                <span className="text-[11px] text-slate-500 font-medium">
                  {item.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
