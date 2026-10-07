import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Heart,
  Volume2,
  Filter,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { LanguageMetadata, UserProgress, VoiceSettings, VocabularyWord } from '../types';
import { getVocabularyForLanguage } from '../data';
import { MALAYALAM_CATEGORIES } from '../data/malayalam/vocabulary';
import { AudioButton } from '../components/AudioButton';

interface VocabularyPageProps {
  language: LanguageMetadata;
  progress: UserProgress;
  onToggleFavorite: (id: string) => void;
  voiceSettings: VoiceSettings;
}

export const VocabularyPage: React.FC<VocabularyPageProps> = ({
  language,
  progress,
  onToggleFavorite,
  voiceSettings,
}) => {
  const allVocab = getVocabularyForLanguage(language.id);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', ...MALAYALAM_CATEGORIES];

  const filteredWords = allVocab.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      item.word.toLowerCase().includes(term) ||
      item.banglish.toLowerCase().includes(term) ||
      item.bangla.toLowerCase().includes(term) ||
      (item.exampleSentence && item.exampleSentence.toLowerCase().includes(term)) ||
      (item.exampleBangla && item.exampleBangla.toLowerCase().includes(term));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {language.banglaName} শব্দভাণ্ডার (Vocabulary)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-bangla">
          ১৯টি ক্যাটাগরি ও প্রয়োজনীয় শব্দ। বাংলা অর্থ, উচ্চারণ ও অডিও শুনে শিখুন।
        </p>
      </div>

      {/* Search Bar - Supports Bangla, Banglish & Target */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="বাংলা অর্থ, শব্দ বা উচ্চারণ লিখে সার্চ করুন (যেমন: পানি, Vellam, খাবার, ইত্যাদি)..."
          className="w-full pl-10 pr-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-2xs"
        />
      </div>

      {/* Category Pills (Interactive Segmented buttons) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat === 'All' ? 'সকল শব্দ' : cat}
            </button>
          );
        })}
      </div>

      {/* Vocabulary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {filteredWords.map((item) => {
          const isFav = progress.favorites.includes(item.id);
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-300 p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                {/* Category tag & Favorite Heart */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-slate-600 font-medium tracking-tight">
                    {item.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(item.id)}
                    className="p-1 rounded-full hover:bg-rose-50 text-slate-300 hover:text-rose-500 transition-colors cursor-pointer"
                    title={isFav ? 'পছন্দের তালিকা থেকে সরান' : 'পছন্দের তালিকায় রাখুন'}
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform active:scale-125 ${
                        isFav ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Target Script Word */}
                <div className="space-y-1">
                  <span className="text-xl sm:text-2xl font-bold text-slate-900 block font-malayalam">
                    {item.word}
                  </span>
                  <span className="text-xs text-slate-600 font-mono block">
                    {item.banglish}
                  </span>
                  <p className="text-sm font-semibold text-emerald-800 font-bangla pt-1">
                    {item.bangla}
                  </p>
                </div>

                {/* Example sentence if available */}
                {item.exampleSentence && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 text-xs">
                    <p className="text-slate-700 font-medium font-malayalam">
                      {item.exampleSentence}
                    </p>
                    <p className="text-[11px] text-slate-600 font-sans mt-0.5">
                      {item.exampleBanglish}
                    </p>
                    <p className="text-[11px] text-slate-600 font-bangla mt-0.5">
                      {item.exampleBangla}
                    </p>
                  </div>
                )}
              </div>

              {/* Audio Play Button at Bottom */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-600 font-medium">উচ্চারণ শুনুন</span>
                <div className="flex items-center gap-1.5">
                  <AudioButton
                    text={item.word}
                    locale={language.voiceCode}
                    settings={voiceSettings}
                    size="sm"
                  />
                  <AudioButton
                    text={item.word}
                    locale={language.voiceCode}
                    settings={voiceSettings}
                    slow={true}
                    size="sm"
                    className="bg-amber-50 text-amber-800 border-amber-200"
                    title="ধীরগতিতে শুনুন (🐢)"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredWords.length === 0 && (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
          <p className="text-slate-600 font-medium">কোনো শব্দ পাওয়া যায়নি।</p>
          <p className="text-xs text-slate-600">অন্য কোনো শব্দ বা বানান দিয়ে সার্চ করে দেখুন।</p>
        </div>
      )}
    </div>
  );
};
