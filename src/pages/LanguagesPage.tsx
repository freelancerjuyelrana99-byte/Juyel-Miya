import React, { useState } from 'react';
import { Plus, Check, Search, Globe, ArrowRight, Sparkles } from 'lucide-react';
import { LanguageMetadata } from '../types';
import { getAllLanguages, saveCustomLanguage } from '../data/languages';
import { AudioButton } from '../components/AudioButton';
import { NavPage } from '../components/Navbar';

interface LanguagesPageProps {
  currentLanguage: LanguageMetadata;
  onSelectLanguage: (lang: LanguageMetadata) => void;
  onNavigate: (page: NavPage) => void;
}

export const LanguagesPage: React.FC<LanguagesPageProps> = ({
  currentLanguage,
  onSelectLanguage,
  onNavigate,
}) => {
  const [languages, setLanguages] = useState<LanguageMetadata[]>(getAllLanguages());
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New language form state
  const [newLangName, setNewLangName] = useState('');
  const [newLangBangla, setNewLangBangla] = useState('');
  const [newLangNative, setNewLangNative] = useState('');
  const [newLangFlag, setNewLangFlag] = useState('🌐');
  const [newLangCode, setNewLangCode] = useState('en-US');
  const [newGreeting, setNewGreeting] = useState('');
  const [newGreetingBangla, setNewGreetingBangla] = useState('');

  const filteredLanguages = languages.filter((l) => {
    const term = searchTerm.toLowerCase();
    return (
      l.name.toLowerCase().includes(term) ||
      l.banglaName.toLowerCase().includes(term) ||
      l.nativeName.toLowerCase().includes(term)
    );
  });

  const handleCreateLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLangName.trim() || !newLangBangla.trim()) return;

    const id = newLangName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const custom: LanguageMetadata = {
      id,
      name: newLangName.trim(),
      nativeName: newLangNative.trim() || newLangName.trim(),
      banglaName: newLangBangla.trim(),
      flag: newLangFlag.trim() || '🌐',
      voiceCode: newLangCode.trim() || 'en-US',
      levelCount: 5,
      description: `বাংলা থেকে ${newLangBangla} ভাষা শেখার পাঠ্যক্রম।`,
      banglaSubtitle: `${newLangBangla} ভাষা শেখার প্রস্তুতি`,
      scriptName: 'Custom Script',
      greetingExample: {
        target: newGreeting.trim() || 'Hello',
        banglish: newGreeting.trim() || 'Hello',
        bangla: newGreetingBangla.trim() || 'নমস্কার / শুভেচ্ছা',
      },
    };

    saveCustomLanguage(custom);
    const updated = getAllLanguages();
    setLanguages(updated);
    onSelectLanguage(custom);
    setIsAddModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header section */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              ভাষা নির্বাচন (Select Language)
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              যেকোনো ভাষা বেছে নিন এবং এখনই পড়া শুরু করুন।
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="self-start md:self-auto px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Another Language</span>
          </button>
        </div>

        {/* Fixed Source Language indicator */}
        <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇧🇩</span>
            <div>
              <span className="text-xs text-emerald-800 font-semibold uppercase tracking-wider block">
                আমার মাতৃভাষা (My Language):
              </span>
              <span className="font-bold text-emerald-950 text-base">বাংলা / Bengali</span>
            </div>
          </div>
          <div className="text-xs text-emerald-700 bg-white/80 px-3 py-1.5 rounded-lg border border-emerald-200">
            ✓ সকল অর্থ ও ব্যাকরণ সহজ বাংলায় ব্যাখ্যা করা
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="ভাষার নাম খুঁজুন (যেমন: Malayalam, ইংরেজি, Arabic, ইত্যাদি)..."
          className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Languages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLanguages.map((lang) => {
          const isSelected = currentLanguage.id === lang.id;
          return (
            <div
              key={lang.id}
              onClick={() => {
                onSelectLanguage(lang);
              }}
              className={`p-5 rounded-2xl border transition-all text-left cursor-pointer flex flex-col justify-between relative ${
                isSelected
                  ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                  : 'bg-white hover:bg-slate-50/80 border-slate-200/90 hover:border-emerald-300 shadow-2xs hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{lang.flag}</span>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{lang.name}</h3>
                      <p className="text-xs text-slate-500 font-bangla">
                        {lang.nativeName} · {lang.banglaName}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-3" />
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {lang.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    নমুন অভিবাদন
                  </span>
                  <span className="font-semibold text-slate-800">
                    {lang.greetingExample.target}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <AudioButton
                    text={lang.greetingExample.target}
                    locale={lang.voiceCode}
                    size="sm"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLanguage(lang);
                      onNavigate('courses');
                    }}
                    className="p-1.5 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors"
                    title="কোর্স শুরু করুন"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Another Language Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <h3 className="font-bold text-slate-900 text-base">+ নতুন ভাষা যোগ করুন</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLanguage} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  ভাষার ইংরেজি নাম (যেমন: Turkish / Russian)
                </label>
                <input
                  type="text"
                  required
                  value={newLangName}
                  onChange={(e) => setNewLangName(e.target.value)}
                  placeholder="Language name"
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  বাংলা নাম (যেমন: তুর্কি / রাশিয়ান)
                </label>
                <input
                  type="text"
                  required
                  value={newLangBangla}
                  onChange={(e) => setNewLangBangla(e.target.value)}
                  placeholder="বাংলায় নাম"
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    পতাকা ইমোজি (Flag)
                  </label>
                  <input
                    type="text"
                    value={newLangFlag}
                    onChange={(e) => setNewLangFlag(e.target.value)}
                    placeholder="🇹🇷"
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-center"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    ভয়েস কোড (Voice Code)
                  </label>
                  <input
                    type="text"
                    value={newLangCode}
                    onChange={(e) => setNewLangCode(e.target.value)}
                    placeholder="tr-TR / ru-RU"
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  একটি নমুনা অভিবাদন (Greeting)
                </label>
                <input
                  type="text"
                  value={newGreeting}
                  onChange={(e) => setNewGreeting(e.target.value)}
                  placeholder="Merhaba"
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  নমুনা অভিবাদনের বাংলা অর্থ
                </label>
                <input
                  type="text"
                  value={newGreetingBangla}
                  onChange={(e) => setNewGreetingBangla(e.target.value)}
                  placeholder="হ্যালো / নমস্কার"
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold shadow-xs cursor-pointer"
                >
                  সংরক্ষণ ও শুরু করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
