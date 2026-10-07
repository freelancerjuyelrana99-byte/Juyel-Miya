import React, { useState } from 'react';
import { Volume2, BookOpen, Search, Sparkles, Filter } from 'lucide-react';
import { MALAYALAM_ALPHABET } from '../data/malayalam/alphabet';
import { AudioButton } from '../components/AudioButton';
import { VoiceSettings } from '../types';

interface AlphabetPageProps {
  voiceSettings: VoiceSettings;
}

export const AlphabetPage: React.FC<AlphabetPageProps> = ({ voiceSettings }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'vowel' | 'consonant' | 'chillu'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState(MALAYALAM_ALPHABET[0]);

  const filtered = MALAYALAM_ALPHABET.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      item.letter.includes(term) ||
      item.sound.toLowerCase().includes(term) ||
      item.banglish.toLowerCase().includes(term) ||
      item.exampleWord.includes(term) ||
      item.banglaExplanation.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <BookOpen className="w-3.5 h-3.5" />
          <span>কেরালা বর্ণমালা একাডেমি</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          মালয়ালম বর্ণমালা (Malayalam Alphabet — അക്ഷരമാല)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-bangla max-w-2xl leading-relaxed">
          প্রতিটি বর্ণের উপর ক্লিক করে অডিও শুনুন এবং বাংলা উচ্চারণের ব্যাখ্যা বুঝে নিন।
        </p>
      </div>

      {/* Selected Letter Spotlight Card */}
      {selectedLetter && (
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-700/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-5xl font-black font-malayalam text-emerald-200 shadow-inner">
              {selectedLetter.letter}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 uppercase tracking-wider">
                  {selectedLetter.category}
                </span>
                <span className="text-xs text-emerald-200 font-mono">
                  [{selectedLetter.sound}]
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-bangla">
                উচ্চারণ: {selectedLetter.banglish}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-lg leading-relaxed">
                {selectedLetter.banglaExplanation}
              </p>
            </div>
          </div>

          {/* Example and Listen */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-start">
            <div>
              <span className="text-[10px] text-emerald-200 uppercase tracking-wider block">
                উদাহরণ শব্দ
              </span>
              <span className="text-lg font-bold font-malayalam block">
                {selectedLetter.exampleWord}
              </span>
              <span className="text-xs text-emerald-200">
                {selectedLetter.exampleBanglish} ({selectedLetter.exampleBangla})
              </span>
            </div>
            <AudioButton
              text={selectedLetter.exampleWord}
              locale="ml-IN"
              settings={voiceSettings}
              size="lg"
              className="bg-emerald-400 text-slate-950 hover:bg-emerald-300 shadow-md"
            />
          </div>
        </div>
      )}

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Category buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'সকল বর্ণ' },
            { id: 'vowel', label: 'স্বরবর্ণ (അ, ആ...)' },
            { id: 'consonant', label: 'ব্যঞ্জনবর্ণ (ക, ഖ...)' },
            { id: 'chillu', label: 'চিল্লু বর্ণ (ൽ, ൾ...)' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-white text-emerald-800 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="বর্ণ বা শব্দ দিয়ে খুঁজুন..."
            className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Letters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filtered.map((item) => {
          const isSelected = selectedLetter?.id === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setSelectedLetter(item)}
              className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer relative group flex flex-col justify-between ${
                isSelected
                  ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                  : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-emerald-300 shadow-2xs'
              }`}
            >
              <div>
                <span className="text-3xl font-extrabold font-malayalam block text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {item.letter}
                </span>
                <span className="text-xs font-semibold text-emerald-800 block mt-1">
                  {item.banglish}
                </span>
                <span className="text-[11px] text-slate-500 block truncate mt-0.5">
                  {item.exampleWord} ({item.exampleBangla})
                </span>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-center">
                <AudioButton
                  text={item.exampleWord}
                  locale="ml-IN"
                  settings={voiceSettings}
                  size="sm"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
