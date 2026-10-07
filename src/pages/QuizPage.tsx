import React, { useState } from 'react';
import {
  Award,
  CheckCircle,
  XCircle,
  RotateCcw,
  Volume2,
  Sparkles,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LanguageMetadata, QuizQuestion, VoiceSettings } from '../types';
import { getQuizzesForLanguage } from '../data';
import { AudioButton } from '../components/AudioButton';
import { NavPage } from '../components/Navbar';

interface QuizPageProps {
  language: LanguageMetadata;
  voiceSettings: VoiceSettings;
  onRecordQuizResult: (quizId: string, score: number, total: number) => void;
  onNavigate: (page: NavPage) => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({
  language,
  voiceSettings,
  onRecordQuizResult,
  onNavigate,
}) => {
  const quizzesMap = getQuizzesForLanguage(language.id);
  const quizIds = Object.keys(quizzesMap);
  const [selectedQuizId, setSelectedQuizId] = useState<string>(quizIds[0] || 'default_quiz');

  const questions: QuizQuestion[] = quizzesMap[selectedQuizId] || quizzesMap[quizIds[0]] || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [orderedWords, setOrderedWords] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectAnswer = (ans: string) => {
    if (isAnswerRevealed || isSubmitted) return;
    setUserAnswers({ ...userAnswers, [currentIndex]: ans });
    setIsAnswerRevealed(true);
  };

  const handleToggleWordOrder = (word: string) => {
    if (isAnswerRevealed || isSubmitted) return;
    let nextWords = [...orderedWords];
    if (nextWords.includes(word)) {
      nextWords = nextWords.filter((w) => w !== word);
    } else {
      nextWords.push(word);
    }
    setOrderedWords(nextWords);
    setUserAnswers({ ...userAnswers, [currentIndex]: nextWords.join(' ') });
  };

  const handleNext = () => {
    setIsAnswerRevealed(false);
    setOrderedWords([]);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Finish Quiz!
      calculateAndFinish();
    }
  };

  const calculateAndFinish = () => {
    setIsSubmitted(true);
    let correct = 0;
    questions.forEach((q, idx) => {
      const userAns = (userAnswers[idx] || '').trim();
      const actualAns = (Array.isArray(q.answer) ? q.answer[0] : q.answer).trim();
      if (userAns === actualAns) {
        correct++;
      }
    });

    onRecordQuizResult(selectedQuizId, correct, questions.length);

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#059669', '#10B981', '#F59E0B', '#3B82F6'],
      });
    } catch {
      // ignore
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserAnswers({});
    setOrderedWords([]);
    setIsAnswerRevealed(false);
    setIsSubmitted(false);
  };

  // Score calculation
  let correctCount = 0;
  questions.forEach((q, idx) => {
    const userAns = (userAnswers[idx] || '').trim();
    const actualAns = (Array.isArray(q.answer) ? q.answer[0] : q.answer).trim();
    if (userAns === actualAns) correctCount++;
  });
  const wrongCount = questions.length - correctCount;
  const percentage = Math.round((correctCount / questions.length) * 100);

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
          <Award className="w-3.5 h-3.5" />
          <span>জ্ঞান যাচাই ও মূল্যায়ন</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          কুইজ ও পরীক্ষা (Quiz System)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-bangla">
          এমসিকিউ, অডিও শুনে অর্থ নির্বাচন ও বাক্য সাজানোর মাধ্যমে নিজের অগ্রগতি যাচাই করুন।
        </p>
      </div>

      {/* Quiz Picker Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {quizIds.map((id, index) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setSelectedQuizId(id);
              handleRestart();
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedQuizId === id
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            কুইজ টেস্ট {index + 1}
          </button>
        ))}
      </div>

      {!isSubmitted ? (
        // Ongoing Question Card
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium border-b border-slate-100 pb-3">
            <span>প্রশ্ন {currentIndex + 1} / {questions.length}</span>
            <span className="capitalize font-mono text-emerald-700 font-bold">
              {currentQ?.type.replace('_', ' ')}
            </span>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentQ?.prompt}
            </h2>
            {currentQ?.promptBangla && (
              <p className="text-xs text-slate-500 font-bangla">
                {currentQ.promptBangla}
              </p>
            )}
          </div>

          {/* Audio Prompt if Listen & Choose */}
          {currentQ?.audioText && (
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900 uppercase">
                🔊 অডিওটি শুনুন:
              </span>
              <AudioButton
                text={currentQ.audioText}
                locale={language.voiceCode}
                settings={voiceSettings}
                size="md"
              />
            </div>
          )}

          {/* Word Ordering Type Question */}
          {currentQ?.type === 'word_order' && currentQ.words && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl min-h-16 flex flex-wrap items-center gap-2">
                {orderedWords.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">
                    নিচের শব্দগুলোতে চাপ দিয়ে ক্রমানুসারে সাজান...
                  </span>
                ) : (
                  orderedWords.map((w, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm font-semibold font-malayalam"
                    >
                      {w}
                    </span>
                  ))
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {currentQ.words.map((w, idx) => {
                  const isUsed = orderedWords.includes(w);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleToggleWordOrder(w)}
                      className={`px-3 py-1.5 rounded-xl border text-sm font-bold font-malayalam transition-all cursor-pointer ${
                        isUsed
                          ? 'bg-slate-200 text-slate-400 border-slate-300'
                          : 'bg-white hover:bg-emerald-50 text-slate-800 border-slate-300'
                      }`}
                    >
                      {w}
                    </button>
                  );
                })}
              </div>

              {!isAnswerRevealed && (
                <button
                  type="button"
                  disabled={orderedWords.length === 0}
                  onClick={() => setIsAnswerRevealed(true)}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  উত্তর যাচাই করুন
                </button>
              )}
            </div>
          )}

          {/* Standard Multiple Choice / Translation / Fill Blank Options */}
          {currentQ?.options && (
            <div className="space-y-2.5">
              {currentQ.options.map((opt, i) => {
                const isPicked = userAnswers[currentIndex] === opt;
                const isActual =
                  opt === (Array.isArray(currentQ.answer) ? currentQ.answer[0] : currentQ.answer);

                let btnStyle =
                  'bg-white border-slate-200 hover:border-emerald-300 text-slate-800';
                if (isAnswerRevealed) {
                  if (isActual) {
                    btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20';
                  } else if (isPicked) {
                    btnStyle = 'bg-rose-50 border-rose-400 text-rose-950';
                  } else {
                    btnStyle = 'opacity-50 border-slate-200 bg-slate-50';
                  }
                }

                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={isAnswerRevealed}
                    onClick={() => handleSelectAnswer(opt)}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isAnswerRevealed && isActual && (
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswerRevealed && isPicked && !isActual && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Answer Explanation once revealed */}
          {isAnswerRevealed && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm space-y-1 animate-fadeIn">
              <span className="font-bold text-slate-800 block">ব্যাখ্যা:</span>
              <p className="text-slate-600 font-bangla leading-relaxed">
                {currentQ.explanationBangla}
              </p>
            </div>
          )}

          {/* Action Row */}
          {isAnswerRevealed && (
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>
                  {currentIndex < questions.length - 1 ? 'পরবর্তী প্রশ্ন' : 'ফলাফল দেখুন'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        // Quiz Completed Score Card
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              কুইজ সম্পন্ন হয়েছে!
            </h2>
            <p className="text-sm text-slate-600 font-bangla">
              আপনার অর্জিত স্কোর ও ফলাফলের বিবরণ:
            </p>
          </div>

          {/* Scoreboard */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider block">স্কোর</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-800 font-mono">
                {correctCount} / {questions.length}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider block">শতকরা</span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                {percentage}%
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider block">ভুল</span>
              <span className="text-xl sm:text-2xl font-black text-rose-600 font-mono">
                {wrongCount}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>আবার পরীক্ষা দিন</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('courses')}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              কোর্সে ফিরে যান
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
