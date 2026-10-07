import React from 'react';
import {
  Award,
  Flame,
  BookOpen,
  CheckCircle,
  Mic,
  Headphones,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { LanguageMetadata, UserProgress } from '../types';
import { getCourseLevelsForLanguage } from '../data';
import { NavPage } from '../components/Navbar';

interface ProgressPageProps {
  language: LanguageMetadata;
  progress: UserProgress;
  onResetProgress: () => void;
  onNavigate: (page: NavPage) => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({
  language,
  progress,
  onResetProgress,
  onNavigate,
}) => {
  const levels = getCourseLevelsForLanguage(language.id);

  let totalLessons = 0;
  levels.forEach((l) => {
    l.chapters.forEach((c) => {
      totalLessons += c.lessons.length;
    });
  });

  const completedCount = progress.completedLessons.length;
  const percentage = totalLessons > 0 ? Math.min(100, Math.round((completedCount / totalLessons) * 100)) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
          <Award className="w-3.5 h-3.5" />
          <span>লোকাল লার্নিং মেট্রিক্স (অফলাইন সংরক্ষিত)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          আমার অগ্রগতির পরিসংখ্যান (Learning Progress)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-bangla">
          কোনো অ্যাকাউন্ট ছাড়াই আপনার শেখার তথ্য আপনার ব্রাউজারে সুরক্ষিত রয়েছে।
        </p>
      </div>

      {/* Streak & Active Banner */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-inner">
            <Flame className="w-12 h-12 text-white fill-white animate-bounce [animation-duration:2s]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl sm:text-4xl font-black font-mono">
                🔥 {progress.streak} Day Streak
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-100 font-bangla mt-1">
              ধারাবাহিকভাবে প্রতিদিন কিছু সময় অনুশীলন করে আপনি নিজের সেরা ফর্মে আছেন!
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('courses')}
          className="px-5 py-3 bg-white text-orange-950 font-bold rounded-xl text-xs sm:text-sm shadow-md hover:bg-orange-50 transition-colors shrink-0 cursor-pointer active:scale-95"
        >
          আজকের পাঠ পড়ুন →
        </button>
      </div>

      {/* Language Course Progress Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              {language.flag} {language.name} — {language.nativeName}
            </h3>
            <p className="text-xs text-slate-500">{language.banglaSubtitle}</p>
          </div>
          <span className="text-2xl font-black text-emerald-800 font-mono">
            {percentage}%
          </span>
        </div>

        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className="bg-emerald-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex justify-between text-xs text-slate-500 pt-1">
          <span>{completedCount} টি পাঠ সম্পন্ন</span>
          <span>অবশিষ্ট {Math.max(0, totalLessons - completedCount)} টি পাঠ</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 block mb-1">শব্দ শেখা হয়েছে</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            {progress.wordsLearned.length}
          </span>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">Words Learned</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 block mb-1">পাঠ সম্পন্ন</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            {progress.completedLessons.length}
          </span>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">Lessons Done</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 block mb-1">কথা বলার অনুশীলন</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            {progress.speakingPracticedCount}
          </span>
          <p className="text-[11px] text-rose-600 font-medium mt-1">Speaking Drills</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 block mb-1">শোনার অনুশীলন</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            {progress.listeningPracticedCount}
          </span>
          <p className="text-[11px] text-amber-600 font-medium mt-1">Listening Drills</p>
        </div>
      </div>

      {/* Reset Progress Action */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs text-slate-600">
        <span>সকল পাঠ ও পরিসংখ্যান রিসেট করতে চাইলে:</span>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('আপনি কি নিশ্চিত যে সমস্ত লোকাল ডাটা রিসেট করতে চান?')) {
              onResetProgress();
            }
          }}
          className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>প্রোগ্রেস রিসেট করুন</span>
        </button>
      </div>
    </div>
  );
};
