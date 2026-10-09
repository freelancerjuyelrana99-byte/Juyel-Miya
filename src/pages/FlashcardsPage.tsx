import React, { useState } from 'react';
import {
  Layers,
  RotateCw,
  Heart,
  CheckCircle,
  RefreshCw,
  Volume2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LanguageMetadata, UserProgress, VoiceSettings } from '../types';
import { getVocabularyForLanguage } from '../data';
import { AudioButton } from '../components/AudioButton';
import { getMalayalamBanglaPronunciation } from '../utils/malayalamTransliteration';

interface FlashcardsPageProps {
  language: LanguageMetadata;
  progress: UserProgress;
  onToggleFavorite: (id: string) => void;
  onMarkWordLearned: (id: string) => void;
  voiceSettings: VoiceSettings;
}

export const FlashcardsPage: React.FC<FlashcardsPageProps> = ({
  language,
  progress,
  onToggleFavorite,
  onMarkWordLearned,
  voiceSettings,
}) => {
  const vocabList = getVocabularyForLanguage(language.id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const currentItem = vocabList[currentIndex] || vocabList[0];
  const isFav = progress.favorites.includes(currentItem?.id);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleIKnow = () => {
    setKnownCount((prev) => prev + 1);
    onMarkWordLearned(currentItem.id);
    setIsFlipped(false);

    try {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    } catch {
      // ignore
    }

    if (currentIndex < vocabList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePracticeAgain = () => {
    setReviewCount((prev) => prev + 1);
    setIsFlipped(false);
    if (currentIndex < vocabList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : vocabList.length - 1));
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % vocabList.length);
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 text-xs font-semibold border border-cyan-200">
          <Layers className="w-3.5 h-3.5" />
          <span>স্মৃতিশক্তি বৃদ্ধির ফ্ল্যাশকার্ড</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          ইন্টারেক্টিভ ফ্ল্যাশকার্ড (Flashcards)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-bangla">
          কার্ডে ট্যাপ করে উল্টান এবং শব্দ মনে রাখার দক্ষতা যাচাই করুন।
        </p>
      </div>

      {/* Progress & Stats Bar */}
      <div className="flex items-center justify-between text-xs text-slate-600 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <span>কার্ড: <strong className="text-slate-900 font-mono">{currentIndex + 1} / {vocabList.length}</strong></span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-emerald-700 font-semibold">✓ জানা আছে: {knownCount}</span>
          <span className="text-amber-700 font-semibold">🔁 পুনরাবৃত্তি: {reviewCount}</span>
        </div>
      </div>

      {/* Interactive 3D Flip Card */}
      <div
        onClick={handleFlip}
        className="relative h-80 sm:h-96 w-full cursor-pointer perspective-1000 select-none group"
      >
        <div
          className={`w-full h-full rounded-3xl p-8 border border-slate-200 shadow-lg transition-all duration-500 flex flex-col justify-between text-center ${
            isFlipped
              ? 'bg-gradient-to-br from-emerald-50 via-teal-50 to-white border-emerald-300'
              : 'bg-white hover:border-emerald-300'
          }`}
        >
          {/* Top metadata row inside card */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
              {currentItem.category}
            </span>

            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => onToggleFavorite(currentItem.id)}
                className="p-1.5 rounded-full hover:bg-rose-50 text-slate-300 hover:text-rose-500 transition-colors"
                title="পছন্দ করুন"
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
              <AudioButton
                text={currentItem.word}
                locale={language.voiceCode}
                settings={voiceSettings}
                size="md"
              />
            </div>
          </div>

          {/* Card Body (Front vs Back) */}
          <div className="space-y-4 my-auto">
            {!isFlipped ? (
              // FRONT
              <div className="space-y-3 animate-fadeIn">
                <span className="text-3xl sm:text-4xl font-extrabold font-malayalam text-slate-900 block leading-normal">
                  {currentItem.word}
                </span>
                <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
                  <RotateCw className="w-3.5 h-3.5" />
                  অর্থ দেখতে কার্ডে ট্যাপ করুন
                </p>
              </div>
            ) : (
              // BACK
              <div className="space-y-3 animate-fadeIn">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 inline-block text-left mx-auto max-w-sm space-y-1">
                  <p className="text-xs font-bold text-slate-800 font-bangla">
                    🇧🇩 বাংলা উচ্চারণ:{' '}
                    <span className="text-emerald-900 font-extrabold text-sm">
                      {currentItem.banglaPronunciation || getMalayalamBanglaPronunciation(currentItem.word)}
                    </span>
                  </p>
                  <p className="text-[11px] font-mono text-slate-600">
                    🔤 English: {currentItem.banglish}
                  </p>
                </div>

                <span className="text-2xl sm:text-3xl font-extrabold font-bangla text-emerald-900 block">
                  💡 {currentItem.bangla}
                </span>

                {currentItem.exampleSentence && (
                  <div className="pt-2 text-xs text-slate-600 max-w-sm mx-auto bg-emerald-50/50 p-2 rounded-xl">
                    <p className="font-bold text-slate-800 font-malayalam">
                      {currentItem.exampleSentence}
                    </p>
                    <p className="text-[11px] text-emerald-950 font-bangla mt-0.5">
                      উচ্চারণ: {getMalayalamBanglaPronunciation(currentItem.exampleSentence)}
                    </p>
                    <p className="text-slate-600 font-bangla mt-0.5 font-medium">
                      অর্থ: {currentItem.exampleBangla}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Flip Hint */}
          <div className="text-[11px] text-slate-400">
            {isFlipped ? 'সামনের পিঠ দেখতে আবার ট্যাপ করুন' : 'কার্ডটি ফ্লিপ করুন ↻'}
          </div>
        </div>
      </div>

      {/* Action Buttons: ✓ I Know vs 🔁 Practice Again */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <button
          type="button"
          onClick={handlePracticeAgain}
          className="py-3 px-4 bg-white hover:bg-amber-50 text-amber-800 border border-amber-300 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          <span>🔁 Practice Again</span>
        </button>

        <button
          type="button"
          onClick={handleIKnow}
          className="py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
        >
          <CheckCircle className="w-4 h-4" />
          <span>✓ I Know (পারি)</span>
        </button>
      </div>

      {/* Prev / Next Card Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={handlePrev}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>আগের কার্ড</span>
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <span>পরের কার্ড</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
