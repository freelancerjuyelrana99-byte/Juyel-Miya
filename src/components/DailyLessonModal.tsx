import React, { useState } from 'react';
import {
  Sparkles,
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Volume2,
  Mic,
  Headphones,
  Award,
  BookOpen,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LanguageMetadata, VoiceSettings } from '../types';
import { getDailyLessonForLanguage, DailyLessonData } from '../data';
import { AudioButton } from '../components/AudioButton';

interface DailyLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageMetadata;
  voiceSettings: VoiceSettings;
  onCompleteDailyLesson: () => void;
}

export const DailyLessonModal: React.FC<DailyLessonModalProps> = ({
  isOpen,
  onClose,
  language,
  voiceSettings,
  onCompleteDailyLesson,
}) => {
  const [step, setStep] = useState<number>(0);
  const lessonData: DailyLessonData = React.useMemo(
    () => getDailyLessonForLanguage(language.id),
    [language.id]
  );

  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [selectedListenAnswer, setSelectedListenAnswer] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalSteps = 6; // 1: Words, 2: Sentences, 3: Grammar, 4: Listening, 5: Speaking, 6: Quiz

  const handleFinish = () => {
    onCompleteDailyLesson();
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch {
      // ignore
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-700 to-teal-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-base">আজকের পাঠ (Daily Lesson)</h3>
              <p className="text-xs text-emerald-100">
                ধাপ {step + 1} / {totalSteps} · {language.banglaName}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Step Bar */}
        <div className="w-full bg-slate-100 h-1.5">
          <div
            className="bg-emerald-600 h-full transition-all duration-300"
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          />
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* STEP 0: 5 New Words */}
          {step === 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>১. নতুন ৫টি শব্দ (5 New Words)</span>
              </div>

              <div className="space-y-2.5">
                {lessonData.words.map((w) => (
                  <div
                    key={w.id}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3"
                  >
                    <div>
                      <span className="text-lg font-bold font-malayalam text-slate-900 block">
                        {w.word}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        উচ্চারণ: {w.banglish}
                      </span>
                      <p className="text-xs font-semibold text-emerald-800 font-bangla mt-0.5">
                        অর্থ: {w.bangla}
                      </p>
                    </div>
                    <AudioButton
                      text={w.word}
                      locale={language.voiceCode}
                      settings={voiceSettings}
                      size="sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1: 3 Sentences */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-800 font-bold text-sm uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>২. নিত্যপ্রয়োজনীয় ৩টি বাক্য (3 Sentences)</span>
              </div>

              <div className="space-y-3">
                {lessonData.sentences.map((s) => (
                  <div
                    key={s.id}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold font-malayalam text-slate-900">
                        {s.target}
                      </span>
                      <AudioButton
                        text={s.target}
                        locale={language.voiceCode}
                        settings={voiceSettings}
                        size="sm"
                      />
                    </div>
                    <p className="text-xs text-slate-500 font-mono">
                      উচ্চারণ: {s.banglish}
                    </p>
                    <p className="text-xs font-semibold text-emerald-800 font-bangla">
                      অর্থ: {s.bangla}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: 1 Grammar Topic */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-teal-800 font-bold text-sm uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>৩. ব্যাকরণ টিপ (Grammar Topic)</span>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
                <h4 className="font-bold text-slate-900 text-sm">
                  {lessonData.grammar.banglaTitle}
                </h4>
                <p className="text-xs text-slate-600 font-bangla leading-relaxed">
                  {lessonData.grammar.summary}
                </p>

                {lessonData.grammar.examples[0] && (
                  <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold font-malayalam block text-emerald-950">
                        {lessonData.grammar.examples[0].target}
                      </span>
                      <span className="text-slate-500 font-bangla">
                        {lessonData.grammar.examples[0].bangla}
                      </span>
                    </div>
                    <AudioButton
                      text={lessonData.grammar.examples[0].target}
                      locale={language.voiceCode}
                      settings={voiceSettings}
                      size="sm"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: 1 Listening Exercise */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-sm uppercase tracking-wider">
                <Headphones className="w-4 h-4" />
                <span>৪. শোনার অনুশীলন (Listening Drill)</span>
              </div>

              <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-2xl space-y-3 text-center">
                <p className="text-xs text-amber-900 font-medium">
                  অডিও শুনুন এবং সঠিক অর্থ নির্বাচন করুন:
                </p>
                <div className="flex justify-center">
                  <AudioButton
                    text={lessonData.listeningQuestion.audioText || ''}
                    locale={language.voiceCode}
                    settings={voiceSettings}
                    size="lg"
                    showLabel={true}
                    label="Play Audio"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  {lessonData.listeningQuestion.options?.map((opt) => {
                    const isSelected = selectedListenAnswer === opt;
                    const isCorrect = opt === lessonData.listeningQuestion.answer;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelectedListenAnswer(opt)}
                        className={`w-full p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          selectedListenAnswer
                            ? isCorrect
                              ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                              : isSelected
                              ? 'bg-rose-100 border-rose-400 text-rose-900'
                              : 'bg-white border-slate-200 opacity-60'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: 1 Speaking Exercise */}
          {step === 4 && (
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center gap-2 text-rose-800 font-bold text-sm uppercase tracking-wider">
                <Mic className="w-4 h-4" />
                <span>৫. মুখে বলার অনুশীলন (Speaking Drill)</span>
              </div>

              <div className="p-5 bg-rose-50/60 border border-rose-200 rounded-2xl space-y-3">
                <span className="text-xl font-bold font-malayalam text-slate-900 block">
                  {lessonData.speakingSentence.target}
                </span>
                <span className="text-xs text-slate-600 font-mono block">
                  {lessonData.speakingSentence.banglish}
                </span>
                <p className="text-xs font-semibold text-emerald-800 font-bangla">
                  অর্থ: {lessonData.speakingSentence.bangla}
                </p>

                <div className="flex justify-center pt-2">
                  <AudioButton
                    text={lessonData.speakingSentence.target}
                    locale={language.voiceCode}
                    settings={voiceSettings}
                    size="md"
                    showLabel={true}
                    label="শুনুন ও বলুন"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: 1 Quiz */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-teal-800 font-bold text-sm uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>৬. মিনি কুইজ (Mini Quiz)</span>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">
                  {lessonData.quizQuestion.prompt}
                </h4>

                <div className="space-y-2">
                  {lessonData.quizQuestion.options?.map((opt) => {
                    const isSelected = selectedQuizAnswer === opt;
                    const isCorrect = opt === lessonData.quizQuestion.answer;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelectedQuizAnswer(opt)}
                        className={`w-full p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          selectedQuizAnswer
                            ? isCorrect
                              ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                              : isSelected
                              ? 'bg-rose-100 border-rose-400 text-rose-900'
                              : 'bg-white border-slate-200 opacity-60'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep((prev) => Math.max(0, prev - 1))}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>আগের ধাপ</span>
          </button>

          {step < totalSteps - 1 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => prev + 1)}
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>পরবর্তী ধাপ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer active:scale-95"
            >
              <CheckCircle className="w-4 h-4" />
              <span>আজকের পাঠ সম্পন্ন করুন</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
