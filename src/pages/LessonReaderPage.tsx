import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  BookOpen,
  Volume2,
  Sparkles,
  HelpCircle,
  Clock,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CourseLesson, CourseLevel, LanguageMetadata, UserProgress, VoiceSettings } from '../types';
import { AudioButton } from '../components/AudioButton';
import { WordByWordSentence } from '../components/WordByWordModal';
import { NavPage } from '../components/Navbar';

interface LessonReaderPageProps {
  lesson: CourseLesson;
  level: CourseLevel;
  chapterTitle: string;
  language: LanguageMetadata;
  progress: UserProgress;
  onCompleteLesson: (lessonId: string) => void;
  onNavigate: (page: NavPage) => void;
  voiceSettings: VoiceSettings;
}

export const LessonReaderPage: React.FC<LessonReaderPageProps> = ({
  lesson,
  level,
  chapterTitle,
  language,
  progress,
  onCompleteLesson,
  onNavigate,
  voiceSettings,
}) => {
  const isAlreadyCompleted = progress.completedLessons.includes(lesson.id);
  const [completed, setCompleted] = useState(isAlreadyCompleted);

  const handleFinishLesson = () => {
    setCompleted(true);
    onCompleteLesson(lesson.id);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#059669', '#10B981', '#34D399', '#FBBF24'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      {/* Top Breadcrumb & Back */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate('courses')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>কোর্সে ফিরে যান</span>
        </button>

        <div className="text-xs text-slate-500 font-medium">
          {level.title} · পাঠ {lesson.lessonNumber}
        </div>
      </div>

      {/* Book-like Page Container */}
      <article className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-8 relative overflow-hidden">
        {/* Subtle decorative page header bar */}
        <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 -mx-6 sm:-mx-10 -mt-6 sm:-mt-10 mb-6" />

        {/* Chapter Title & Header */}
        <header className="space-y-2 border-b border-slate-100 pb-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              {chapterTitle}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {lesson.estimatedMinutes} মিনিট পাঠ
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {lesson.banglaTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-sans">
            {lesson.title}
          </p>
        </header>

        {/* Introduction Section */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>ভূমিকা ও বিবরণ</span>
          </h2>
          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/70 text-sm sm:text-base text-slate-700 font-bangla leading-relaxed">
            {lesson.content.introductionBangla}
          </div>
        </section>

        {/* Key Points */}
        {lesson.content.keyPoints && lesson.content.keyPoints.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              মূল বিষয়সমূহ (Key Concepts)
            </h2>
            <div className="space-y-2">
              {lesson.content.keyPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 text-xs sm:text-sm text-emerald-950"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="font-medium leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Vocabulary Items in this Lesson */}
        {lesson.content.vocabularyItems && lesson.content.vocabularyItems.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                নতুন শব্দভাণ্ডার (Vocabulary)
              </h2>
              <span className="text-[11px] text-slate-500">
                শব্দের অডিও শুনুন ও উচ্চারণ মিলান
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lesson.content.vocabularyItems.map((v) => (
                <div
                  key={v.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-300 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xl font-bold text-slate-900 block font-malayalam">
                        {v.word}
                      </span>
                      <span className="text-xs text-slate-500 font-sans block mt-0.5">
                        উচ্চারণ: {v.banglish}
                      </span>
                      <span className="text-sm font-medium text-emerald-800 font-bangla block mt-1">
                        অর্থ: {v.bangla}
                      </span>
                    </div>
                    <AudioButton
                      text={v.word}
                      locale={language.voiceCode}
                      settings={voiceSettings}
                      size="md"
                    />
                  </div>

                  {v.exampleSentence && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 text-xs text-slate-600">
                      <span className="font-semibold block text-slate-800">
                        {v.exampleSentence}
                      </span>
                      <span className="text-slate-500 text-[11px] block">
                        {v.exampleBangla}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Sentences & Word-by-Word Learning */}
        {lesson.content.sentences && lesson.content.sentences.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                বাস্তব বাক্য ও শব্দ বিশ্লেষণ (Word-by-Word Tap)
              </h2>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-medium">
                প্রতিটি শব্দে ট্যাপ করুন
              </span>
            </div>

            <div className="space-y-4">
              {lesson.content.sentences.map((sentence) => (
                <div
                  key={sentence.id}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200/90 space-y-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs text-slate-500 font-sans">
                      উচ্চারণ: <span className="font-semibold text-slate-700">{sentence.banglish}</span>
                    </p>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <AudioButton
                        text={sentence.target}
                        locale={language.voiceCode}
                        settings={voiceSettings}
                        size="sm"
                      />
                      <AudioButton
                        text={sentence.target}
                        locale={language.voiceCode}
                        settings={voiceSettings}
                        slow={true}
                        size="sm"
                        className="bg-amber-50 text-amber-800 border-amber-200"
                        title="ধীরে শুনুন (🐢)"
                      />
                    </div>
                  </div>

                  {/* Interactive Word-by-Word Tokens */}
                  <WordByWordSentence
                    sentence={sentence.target}
                    words={sentence.words}
                    locale={language.voiceCode}
                    settings={voiceSettings}
                  />

                  <p className="text-sm font-semibold text-slate-800 font-bangla border-t border-slate-200/60 pt-2">
                    বাংলা অনুবাদ: {sentence.bangla}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Practice Prompt */}
        {lesson.content.practicePrompt && (
          <section className="p-4 bg-teal-50/60 border border-teal-200 rounded-2xl text-xs sm:text-sm text-teal-950 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">অনুশীলনের পরামর্শ:</span>
              <p>{lesson.content.practicePrompt}</p>
            </div>
          </section>
        )}

        {/* Lesson Finish & Next Actions */}
        <footer className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleFinishLesson}
            className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all cursor-pointer active:scale-95 ${
              completed
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-md'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            <span>{completed ? '✓ Lesson Completed' : 'পাঠ সম্পন্ন হিসেবে চিহ্নিত করুন'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('speaking')}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              কথা বলার প্র্যাকটিস 🎤
            </button>
            <button
              type="button"
              onClick={() => onNavigate('quiz')}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <span>কুইজ দিন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </footer>
      </article>
    </div>
  );
};
