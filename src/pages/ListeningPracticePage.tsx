import React, { useState } from 'react';
import {
  Volume2,
  Headphones,
  CheckCircle,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LanguageMetadata, VoiceSettings } from '../types';
import { getSentencesForLanguage } from '../data';
import { AudioButton } from '../components/AudioButton';

interface ListeningPracticePageProps {
  language: LanguageMetadata;
  voiceSettings: VoiceSettings;
  onIncrementListeningCount: () => void;
}

export const ListeningPracticePage: React.FC<ListeningPracticePageProps> = ({
  language,
  voiceSettings,
  onIncrementListeningCount,
}) => {
  const sentences = getSentencesForLanguage(language.id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentSentence = sentences[currentIndex] || sentences[0];

  // Generate 3 plausible options: correct one + 2 distractors
  const wrongOptions = sentences
    .filter((s) => s.id !== currentSentence.id)
    .slice(0, 2)
    .map((s) => s.bangla);

  const options = React.useMemo(() => {
    const list = [currentSentence.bangla, ...wrongOptions];
    // deterministic shuffle
    return list.sort(() => Math.random() - 0.5);
  }, [currentIndex, currentSentence.bangla]);

  const handleSelect = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);
    onIncrementListeningCount();

    if (opt === currentSentence.bangla) {
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentIndex((prev) => (prev + 1) % sentences.length);
  };

  const isCorrect = selectedOption === currentSentence.bangla;

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
          <Headphones className="w-3.5 h-3.5" />
          <span>কান পেতে শোনার দক্ষতা</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          শোনার অনুশীলন (Listening Practice)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-bangla">
          অডিওটি শুনুন এবং নিচের বিকল্পগুলো থেকে এর সঠিক অর্থ বাছাই করুন।
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
          <span>প্রশ্ন {currentIndex + 1} / {sentences.length}</span>
          <span>{currentSentence.category}</span>
        </div>

        {/* Audio Player Spotlight */}
        <div className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200/80 flex flex-col items-center justify-center text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            🔊 বাক্যটি বাজান ও মনোযোগ দিয়ে শুনুন
          </span>

          <div className="flex items-center gap-3">
            <AudioButton
              text={currentSentence.target}
              locale={language.voiceCode}
              settings={voiceSettings}
              size="lg"
              showLabel={true}
              label="Play Sentence"
              className="bg-emerald-700 text-white hover:bg-emerald-800 shadow-md px-5"
            />
            <AudioButton
              text={currentSentence.target}
              locale={language.voiceCode}
              settings={voiceSettings}
              slow={true}
              size="lg"
              showLabel={true}
              label="ধীরে শুনুন (🐢)"
              className="bg-amber-100 text-amber-900 border-amber-300 px-4"
            />
          </div>
        </div>

        {/* Question Prompt */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">
            "What does this sentence mean?" (এই বাক্যের অর্থ কী?)
          </h3>

          <div className="space-y-2.5">
            {options.map((opt, i) => {
              const letter = String.fromCharCode(65 + i); // A, B, C
              const isPicked = selectedOption === opt;
              const isActualAnswer = opt === currentSentence.bangla;

              let btnClass = 'bg-white border-slate-200 hover:border-emerald-300 text-slate-800';
              if (isAnswered) {
                if (isActualAnswer) {
                  btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20';
                } else if (isPicked) {
                  btnClass = 'bg-rose-50 border-rose-400 text-rose-900';
                } else {
                  btnClass = 'opacity-50 border-slate-200 bg-slate-50';
                }
              }

              return (
                <button
                  key={opt}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelect(opt)}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                      {letter}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswered && isActualAnswer && (
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && isPicked && !isActualAnswer && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback & Explanation */}
        {isAnswered && (
          <div
            className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-1.5 animate-fadeIn ${
              isCorrect
                ? 'bg-emerald-50 text-emerald-950 border-emerald-200'
                : 'bg-rose-50 text-rose-950 border-rose-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bold">
              {isCorrect ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>✓ Correct! অসাধারণ!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>✗ Incorrect! সঠিক উত্তরটি দেখে নিন:</span>
                </>
              )}
            </div>
            <p className="font-bangla leading-relaxed">
              মূল বাক্য: <span className="font-bold font-malayalam">{currentSentence.target}</span> (উচ্চারণ: {currentSentence.banglish})
              <br />
              সঠিক বাংলা অর্থ: <span className="font-bold">{currentSentence.bangla}</span>
            </p>
          </div>
        )}

        {/* Footer Next button */}
        {isAnswered && (
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
            >
              <span>পরবর্তী প্রশ্ন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
