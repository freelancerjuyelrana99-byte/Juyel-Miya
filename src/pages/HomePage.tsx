import React from 'react';
import {
  ArrowRight,
  BookOpen,
  Volume2,
  Mic,
  Award,
  Sparkles,
  Flame,
  CheckCircle2,
  Layers,
  Compass,
  Headphones,
  FileText,
} from 'lucide-react';
import { LanguageMetadata, UserProgress, VoiceSettings } from '../types';
import { BASE_LANGUAGES } from '../data/languages';
import { AudioButton } from '../components/AudioButton';
import { NavPage } from '../components/Navbar';

interface HomePageProps {
  onNavigate: (page: NavPage) => void;
  onSelectLanguage: (lang: LanguageMetadata) => void;
  currentLanguage: LanguageMetadata;
  progress: UserProgress;
  voiceSettings: VoiceSettings;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectLanguage,
  currentLanguage,
  progress,
  voiceSettings,
}) => {
  const popularLanguages = BASE_LANGUAGES.slice(0, 9);
  const malayalamLang = BASE_LANGUAGES.find((l) => l.id === 'malayalam') || BASE_LANGUAGES[0];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 sm:pt-10">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          {/* User Streak & Active Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold shadow-2xs">
            <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>{progress.streak} দিনের স্ট্রিক চালু আছে!</span>
            <span className="text-amber-400">·</span>
            <span>বর্তমান ভাষা: {currentLanguage.flag} {currentLanguage.banglaName}</span>
          </div>

          {/* Hero Headline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Learn Any Language From{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                Bangla
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-700 font-bangla max-w-2xl mx-auto leading-relaxed">
              "পড়ো, শোনো, বলো এবং practice করে নিজের পছন্দের ভাষা শিখো।"
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('courses')}
              className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('languages')}
              className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl text-sm sm:text-base font-semibold shadow-2xs hover:shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Languages</span>
            </button>
          </div>

          {/* Quick Learning Trust Points */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              কোনো এপিআই কি প্রয়োজন নেই
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              প্রতিটি শব্দে আসল অডিও 🔊
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              স্পিচ রিকগনিশনে কথা বলার প্র্যাকটিস 🎤
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              অফলাইন-রেডি ও লোকাল ডাটা
            </span>
          </div>
        </div>
      </section>

      {/* Featured Card: Malayalam (Special Course) */}
      <section className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-emerald-700/40">
          {/* Subtle Background Kerala Watermark Effect */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid md:grid-cols-5 gap-6 sm:gap-8 items-center">
            <div className="md:col-span-3 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold border border-emerald-400/30">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span>বিশেষ ও পূর্ণাঙ্গ ফ্ল্যাগশিপ কোর্স</span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Malayalam — മലയാളം
                </h2>
                <p className="text-base sm:text-lg text-emerald-100 font-bangla mt-1">
                  "কেরালার মানুষের সাথে কথা বলার জন্য Malayalam শিখুন"
                </p>
                <p className="text-xs sm:text-sm text-emerald-200/80 mt-2 leading-relaxed">
                  কেরালা প্রবাসী ভাই-বোন, নির্মাণ শ্রমিক, নার্স, ছাত্র-ছাত্রী ও পর্যটকদের জন্য তৈরি। বর্ণমালা থেকে শুরু করে হোটেল, দোকান, অটো ও কাজের জায়গার বাস্তব আলাপচারিতা।
                </p>
              </div>

              {/* Sample audio snippet */}
              <div className="p-3.5 bg-white/10 backdrop-blur-xs rounded-2xl border border-white/10 flex items-center justify-between gap-4">
                <div>
                  <span className="text-lg font-bold font-malayalam block">
                    നമസ്കാരം, സുഖമാണോ?
                  </span>
                  <span className="text-xs text-emerald-200">
                    Namaskaaram, sukhamaano? (নমস্কার, কেমন আছেন?)
                  </span>
                </div>
                <AudioButton
                  text="നമസ്കാരം, സുഖമാണോ?"
                  locale="ml-IN"
                  settings={voiceSettings}
                  size="md"
                  className="bg-white text-emerald-900 hover:bg-emerald-50 shadow-md"
                />
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onSelectLanguage(malayalamLang);
                    onNavigate('courses');
                  }}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>কেরালার ভাষা শেখা শুরু করো</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSelectLanguage(malayalamLang);
                    onNavigate('alphabet');
                  }}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl text-xs border border-white/20 transition-all cursor-pointer"
                >
                  বর্ণমালা এক্সপ্লোর (അ, ആ...)
                </button>
              </div>
            </div>

            {/* Quick Level List Preview */}
            <div className="md:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 space-y-2.5 text-xs">
              <span className="font-bold text-emerald-300 block mb-1">
                ১০টি সম্পূর্ণ লেভেল সমৃদ্ধ:
              </span>
              <div className="space-y-1.5 text-emerald-100">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-emerald-500/30 text-center leading-5 font-bold text-[10px]">1</span>
                  <span>Alphabet & Sounds (বর্ণমালা)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-emerald-500/30 text-center leading-5 font-bold text-[10px]">2</span>
                  <span>Basic Words (প্রথম ২০+ শব্দ)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-emerald-500/30 text-center leading-5 font-bold text-[10px]">3</span>
                  <span>Greetings (অভিবাদন ও সৌজন্য)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-emerald-500/30 text-center leading-5 font-bold text-[10px]">4</span>
                  <span>Introduction (আত্মপরিচয়)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-emerald-500/30 text-center leading-5 font-bold text-[10px]">5</span>
                  <span>Daily Conversation (প্রতিদিনের কথা)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-emerald-500/30 text-center leading-5 font-bold text-[10px]">6</span>
                  <span>Grammar (সহজ ব্যাকরণ)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-emerald-500/30 text-center leading-5 font-bold text-[10px]">7</span>
                  <span>Real-Life Conversation (কেরালার বাজার ও হোটেল)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Languages Grid */}
      <section className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">জনপ্রিয় ভাষাসমূহ</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              যেকোনো ভাষা সিলেক্ট করে আজই পড়া শুরু করুন
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('languages')}
            className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <span>সবগুলো ভাষা দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 sm:gap-4">
          {popularLanguages.map((lang) => {
            const isSelected = currentLanguage.id === lang.id;
            return (
              <div
                key={lang.id}
                onClick={() => {
                  onSelectLanguage(lang);
                }}
                className={`p-4 sm:p-5 rounded-2xl border transition-all text-left cursor-pointer relative group ${
                  isSelected
                    ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'bg-white hover:bg-slate-50/80 border-slate-200/90 hover:border-emerald-300 shadow-2xs hover:shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl sm:text-3xl">{lang.flag}</span>
                  {isSelected && (
                    <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                      পড়ছেন
                    </span>
                  )}
                </div>

                <div className="mt-2.5">
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                    {lang.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-bangla">{lang.nativeName} · {lang.banglaName}</p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="truncate pr-2">{lang.greetingExample.target}</span>
                  <AudioButton
                    text={lang.greetingExample.target}
                    locale={lang.voiceCode}
                    settings={voiceSettings}
                    size="sm"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Launch Learning Hub */}
      <section className="max-w-5xl mx-auto">
        <div className="bg-slate-100/70 rounded-3xl p-6 sm:p-8 border border-slate-200/80 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              কীভাবে শিখবেন LingoBangla-তে?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              একটি ডিজিটাল বই + উচ্চারণ শিক্ষক + কথা বলার পার্টনার
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              type="button"
              onClick={() => onNavigate('courses')}
              className="p-4 bg-white rounded-2xl border border-slate-200 text-left hover:border-emerald-300 transition-all hover:shadow-xs group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">বইয়ের মতো পাঠ</h3>
              <p className="text-xs text-slate-500 mt-1">
                অধ্যায়, পাঠ, এবং শব্দ বিশ্লেষণ করে ধাপে ধাপে শেখা।
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('speaking')}
              className="p-4 bg-white rounded-2xl border border-slate-200 text-left hover:border-emerald-300 transition-all hover:shadow-xs group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Mic className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">কথা বলার অনুশীলন</h3>
              <p className="text-xs text-slate-500 mt-1">
                মাইক্রোফোনে কথা বলে নিজের উচ্চারণ যাচাই করুন।
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('listening')}
              className="p-4 bg-white rounded-2xl border border-slate-200 text-left hover:border-emerald-300 transition-all hover:shadow-xs group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">শোনার প্র্যাকটিস</h3>
              <p className="text-xs text-slate-500 mt-1">
                অডিও শুনে সঠিক উত্তর চিহ্নিত করার ইন্টারেক্টিভ কুইজ।
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('flashcards')}
              className="p-4 bg-white rounded-2xl border border-slate-200 text-left hover:border-emerald-300 transition-all hover:shadow-xs group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">ইন্টারেক্টিভ ফ্ল্যাশকার্ড</h3>
              <p className="text-xs text-slate-500 mt-1">
                শব্দ মনে রাখার সবচেয়ে দ্রুত ও বিজ্ঞানসম্মত পদ্ধতি।
              </p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
