import React, { useState } from 'react';
import {
  BookOpen,
  Globe,
  Home,
  Mic,
  Settings,
  Sliders,
  Volume2,
  Sparkles,
  HelpCircle,
  Menu,
  X,
  Bookmark,
  Layers,
  Award,
  FileText,
  Compass,
  GraduationCap,
  ChevronDown,
} from 'lucide-react';
import { LanguageMetadata } from '../types';

export type NavPage =
  | 'home'
  | 'languages'
  | 'courses'
  | 'lesson'
  | 'alphabet'
  | 'vocabulary'
  | 'daily_conversation'
  | 'speaking'
  | 'listening'
  | 'roleplay'
  | 'flashcards'
  | 'quiz'
  | 'grammar'
  | 'progress'
  | 'notes'
  | 'settings';

interface NavbarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  currentLanguage: LanguageMetadata;
  onOpenVoiceSettings: () => void;
  onOpenAITutor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  currentLanguage,
  onOpenVoiceSettings,
  onOpenAITutor,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  const handleNavClick = (page: NavPage) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    setIsMoreDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop & Mobile Top Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Brand wordmark */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  LingoBangla
                </span>
                <span className="hidden sm:inline-block ml-2 text-xs text-slate-500 font-medium">
                  বাংলায় ভাষা শিক্ষা
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-700">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                currentPage === 'home'
                  ? 'text-emerald-700 font-semibold bg-emerald-50'
                  : 'hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              হোম
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('courses')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                currentPage === 'courses' || currentPage === 'lesson'
                  ? 'text-emerald-700 font-semibold bg-emerald-50'
                  : 'hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              কোর্স পাঠ
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('vocabulary')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                currentPage === 'vocabulary'
                  ? 'text-emerald-700 font-semibold bg-emerald-50'
                  : 'hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              শব্দভাণ্ডার
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('speaking')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                currentPage === 'speaking'
                  ? 'text-emerald-700 font-semibold bg-emerald-50'
                  : 'hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              কথা বলা (মাইক)
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('listening')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                currentPage === 'listening'
                  ? 'text-emerald-700 font-semibold bg-emerald-50'
                  : 'hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              শোনার প্র্যাকটিস
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('quiz')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                currentPage === 'quiz'
                  ? 'text-emerald-700 font-semibold bg-emerald-50'
                  : 'hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              কুইজ
            </button>

            {/* More dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                className="px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
              >
                <span>আরও ফিচার</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isMoreDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-fadeIn text-xs">
                  <button
                    type="button"
                    onClick={() => handleNavClick('alphabet')}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-slate-800 flex items-center gap-2.5"
                  >
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span>বর্ণমালা (Alphabet)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('daily_conversation')}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-slate-800 flex items-center gap-2.5"
                  >
                    <Compass className="w-4 h-4 text-emerald-600" />
                    <span>প্রতিদিনের কথা (Daily)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('roleplay')}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-slate-800 flex items-center gap-2.5"
                  >
                    <Mic className="w-4 h-4 text-emerald-600" />
                    <span>বাস্তব কথোপকথন (Roleplay)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('flashcards')}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-slate-800 flex items-center gap-2.5"
                  >
                    <Layers className="w-4 h-4 text-emerald-600" />
                    <span>ফ্ল্যাশকার্ড (Flashcards)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('grammar')}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-slate-800 flex items-center gap-2.5"
                  >
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>সহজ ব্যাকরণ (Grammar)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('notes')}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-slate-800 flex items-center gap-2.5"
                  >
                    <Bookmark className="w-4 h-4 text-emerald-600" />
                    <span>আমার শব্দ ও নোট (My Words)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('progress')}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-slate-800 flex items-center gap-2.5"
                  >
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>অগ্রগতি ট্র্যাকার (Progress)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('settings')}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-slate-800 flex items-center gap-2.5 border-t border-slate-100 mt-1 pt-2"
                  >
                    <Settings className="w-4 h-4 text-slate-500" />
                    <span>সেটিংস (Settings)</span>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Actions & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Language Pill Selector */}
            <button
              type="button"
              onClick={() => handleNavClick('languages')}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 hover:border-emerald-300 bg-slate-50/80 hover:bg-white text-xs font-semibold text-slate-800 transition-all cursor-pointer shadow-2xs"
              title="ভাষা পরিবর্তন করুন"
            >
              <span className="text-base">{currentLanguage.flag}</span>
              <span className="hidden sm:inline font-medium">{currentLanguage.banglaName}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Voice Settings Button */}
            <button
              type="button"
              onClick={onOpenVoiceSettings}
              className="w-9 h-9 rounded-xl border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-700 bg-white flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              title="ভয়েস ও অডিও সেটিংস"
              aria-label="ভয়েস সেটিংস"
            >
              <Sliders className="w-4 h-4" />
            </button>

            {/* AI Tutor Assistant Button */}
            <button
              type="button"
              onClick={onOpenAITutor}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>এআই টিউটর</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-xl border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-100 cursor-pointer"
              aria-label="মেনু খুলুন"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1 shadow-lg max-h-[75vh] overflow-y-auto animate-fadeIn text-sm">
            <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-500">বর্তমান ভাষা:</span>
              <button
                type="button"
                onClick={() => handleNavClick('languages')}
                className="text-xs font-semibold text-emerald-700 flex items-center gap-1"
              >
                {currentLanguage.flag} {currentLanguage.banglaName} (বদলান)
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-slate-800 hover:bg-slate-50 flex items-center gap-3 font-medium"
            >
              <Home className="w-4 h-4 text-slate-500" />
              হোম (Home)
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('courses')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-slate-800 hover:bg-slate-50 flex items-center gap-3 font-medium"
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              কোর্স পাঠ (Courses)
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('alphabet')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-slate-800 hover:bg-slate-50 flex items-center gap-3 font-medium"
            >
              <BookOpen className="w-4 h-4 text-teal-600" />
              বর্ণমালা ও ধ্বনি (Alphabet)
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('vocabulary')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-slate-800 hover:bg-slate-50 flex items-center gap-3 font-medium"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              শব্দভাণ্ডার (Vocabulary)
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('daily_conversation')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-slate-800 hover:bg-slate-50 flex items-center gap-3 font-medium"
            >
              <Compass className="w-4 h-4 text-indigo-600" />
              প্রতিদিনের কথা (Daily)
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('speaking')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-slate-800 hover:bg-slate-50 flex items-center gap-3 font-medium"
            >
              <Mic className="w-4 h-4 text-rose-600" />
              কথা বলার অনুশীলন (Speaking)
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('listening')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-slate-800 hover:bg-slate-50 flex items-center gap-3 font-medium"
            >
              <Volume2 className="w-4 h-4 text-amber-600" />
              শোনার অনুশীলন (Listening)
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('roleplay')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-slate-800 hover:bg-slate-50 flex items-center gap-3 font-medium"
            >
              <Compass className="w-4 h-4 text-purple-600" />
              বাস্তব কথোপকথন (Roleplay)
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('quiz')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-slate-800 hover:bg-slate-50 flex items-center gap-3 font-medium"
            >
              <Award className="w-4 h-4 text-teal-600" />
              কুইজ ও পরীক্ষা (Quiz)
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('flashcards')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-slate-800 hover:bg-slate-50 flex items-center gap-3 font-medium"
            >
              <Layers className="w-4 h-4 text-cyan-600" />
              ফ্ল্যাশকার্ড (Flashcards)
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('grammar')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-slate-800 hover:bg-slate-50 flex items-center gap-3 font-medium"
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              সহজ ব্যাকরণ (Grammar)
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('notes')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-slate-800 hover:bg-slate-50 flex items-center gap-3 font-medium"
            >
              <Bookmark className="w-4 h-4 text-pink-600" />
              আমার শব্দ ও নোট (My Words)
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('progress')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-slate-800 hover:bg-slate-50 flex items-center gap-3 font-medium"
            >
              <Award className="w-4 h-4 text-amber-500" />
              অগ্রগতি ট্র্যাকার (Progress)
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('settings')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-slate-800 hover:bg-slate-50 flex items-center gap-3 font-medium"
            >
              <Settings className="w-4 h-4 text-slate-600" />
              সেটিংস (Settings)
            </button>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAITutor();
                }}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                স্মার্ট এআই টিউটর
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar (≤ 15% viewport height) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 flex items-center justify-around shadow-lg">
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors cursor-pointer ${
            currentPage === 'home'
              ? 'text-emerald-700 font-semibold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">হোম</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('courses')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors cursor-pointer ${
            currentPage === 'courses' || currentPage === 'lesson'
              ? 'text-emerald-700 font-semibold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">কোর্স</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('speaking')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors cursor-pointer ${
            currentPage === 'speaking' || currentPage === 'listening'
              ? 'text-emerald-700 font-semibold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Mic className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">প্র্যাকটিস</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('progress')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors cursor-pointer ${
            currentPage === 'progress'
              ? 'text-emerald-700 font-semibold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Award className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">অগ্রগতি</span>
        </button>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors cursor-pointer ${
            isMobileMenuOpen ? 'text-emerald-700 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Menu className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">আরও</span>
        </button>
      </nav>
    </>
  );
};
