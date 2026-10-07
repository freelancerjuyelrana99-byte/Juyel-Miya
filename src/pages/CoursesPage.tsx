import React from 'react';
import {
  BookOpen,
  CheckCircle,
  Clock,
  ChevronRight,
  Sparkles,
  Award,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { CourseLevel, CourseLesson, LanguageMetadata, UserProgress } from '../types';
import { getCourseLevelsForLanguage } from '../data';
import { NavPage } from '../components/Navbar';

interface CoursesPageProps {
  currentLanguage: LanguageMetadata;
  progress: UserProgress;
  onSelectLesson: (lesson: CourseLesson, level: CourseLevel, chapterTitle: string) => void;
  onNavigate: (page: NavPage) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({
  currentLanguage,
  progress,
  onSelectLesson,
  onNavigate,
}) => {
  const levels = getCourseLevelsForLanguage(currentLanguage.id);

  // Calculate completion percentage
  let totalLessons = 0;
  levels.forEach((lvl) => {
    lvl.chapters.forEach((ch) => {
      totalLessons += ch.lessons.length;
    });
  });

  const completedCount = progress.completedLessons.length;
  const percentage = totalLessons > 0 ? Math.min(100, Math.round((completedCount / totalLessons) * 100)) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Course Banner */}
      <div className="bg-gradient-to-br from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-200">
            <span className="text-xl">{currentLanguage.flag}</span>
            <span>{currentLanguage.name} — {currentLanguage.nativeName}</span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {currentLanguage.banglaName} সম্পূর্ণ কোর্স
            </h1>
            <p className="text-sm text-emerald-100 font-bangla mt-1">
              {currentLanguage.banglaSubtitle}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5 pt-2 max-w-md">
            <div className="flex justify-between text-xs text-emerald-200 font-medium">
              <span>কোর্স অগ্রগতি</span>
              <span className="font-mono font-bold text-white">{percentage}% সম্পন্ন</span>
            </div>
            <div className="w-full bg-black/20 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-[11px] text-emerald-200/80">
              {completedCount} / {totalLessons} টি পাঠ সম্পন্ন হয়েছে
            </p>
          </div>
        </div>
      </div>

      {/* Course Levels Accordion / Stack */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            পাঠ্যসূচি (Course Curriculum)
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            মোট {levels.length} টি লেভেল
          </span>
        </div>

        <div className="space-y-5">
          {levels.map((level) => {
            return (
              <div
                key={level.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden"
              >
                {/* Level Title Header */}
                <div className="px-5 py-4 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-sm flex items-center justify-center">
                      {level.levelNumber}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                        {level.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-bangla">{level.banglaTitle}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    {level.chapters.length} টি অধ্যায়
                  </span>
                </div>

                {/* Chapters & Lessons */}
                <div className="divide-y divide-slate-100">
                  {level.chapters.map((chapter) => (
                    <div key={chapter.id} className="p-4 sm:p-5 space-y-3">
                      <div>
                        <h4 className="font-semibold text-slate-800 text-xs uppercase tracking-wider text-emerald-700">
                          {chapter.title}
                        </h4>
                        <p className="text-xs text-slate-500 font-bangla mt-0.5">
                          {chapter.banglaTitle}
                        </p>
                      </div>

                      {/* Lessons Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        {chapter.lessons.map((lesson) => {
                          const isDone = progress.completedLessons.includes(lesson.id);
                          return (
                            <button
                              key={lesson.id}
                              type="button"
                              onClick={() => {
                                onSelectLesson(lesson, level, chapter.title);
                                onNavigate('lesson');
                              }}
                              className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between group cursor-pointer ${
                                isDone
                                  ? 'bg-emerald-50/60 border-emerald-200 hover:bg-emerald-50'
                                  : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-emerald-300 shadow-2xs'
                              }`}
                            >
                              <div className="flex items-center gap-3 pr-2">
                                <div
                                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                                    isDone
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-slate-100 text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-800'
                                  }`}
                                >
                                  {isDone ? (
                                    <CheckCircle className="w-4 h-4" />
                                  ) : (
                                    lesson.lessonNumber
                                  )}
                                </div>
                                <div>
                                  <span className="font-semibold text-slate-900 text-xs sm:text-sm block group-hover:text-emerald-700">
                                    {lesson.banglaTitle}
                                  </span>
                                  <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                                    <Clock className="w-3 h-3" />
                                    {lesson.estimatedMinutes} মিনিট
                                  </span>
                                </div>
                              </div>

                              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
