import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LanguageMetadata, SentenceItem, VoiceSettings } from '../types';
import { getSentencesForLanguage } from '../data';
import {
  evaluatePronunciation,
  EvaluationResult,
  isSpeechRecognitionSupported,
  startSpeechRecognition,
} from '../services/speechService';
import { AudioButton } from '../components/AudioButton';
import { getMalayalamBanglaPronunciation } from '../utils/malayalamTransliteration';

interface SpeakingPracticePageProps {
  language: LanguageMetadata;
  voiceSettings: VoiceSettings;
  onIncrementSpeakingCount: () => void;
}

export const SpeakingPracticePage: React.FC<SpeakingPracticePageProps> = ({
  language,
  voiceSettings,
  onIncrementSpeakingCount,
}) => {
  const sentences = getSentencesForLanguage(language.id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSentence: SentenceItem = sentences[currentIndex] || sentences[0];

  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeSession, setActiveSession] = useState<{ stop: () => void } | null>(null);

  const supported = isSpeechRecognitionSupported();

  const handleStartSpeaking = () => {
    if (isRecording) {
      activeSession?.stop();
      setIsRecording(false);
      return;
    }

    setTranscript('');
    setResult(null);
    setErrorMessage('');
    setIsRecording(true);

    const session = startSpeechRecognition(
      language.voiceCode,
      (text, isFinal) => {
        setTranscript(text);
        if (isFinal) {
          setIsRecording(false);
          const evalRes = evaluatePronunciation(
            text,
            currentSentence.target,
            currentSentence.banglish
          );
          setResult(evalRes);
          onIncrementSpeakingCount();

          if (evalRes.tier === 'excellent' || evalRes.tier === 'good') {
            try {
              confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
            } catch {
              // ignore
            }
          }
        }
      },
      (error) => {
        setIsRecording(false);
        setErrorMessage(error);
      },
      () => {
        setIsRecording(false);
      }
    );

    setActiveSession(session);
  };

  // Simulated fallback test speak if browser speech recognition is denied or unsupported
  const handleSimulatedTestSpeak = () => {
    setErrorMessage('');
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const simulatedText = currentSentence.target;
      setTranscript(simulatedText);
      const evalRes = evaluatePronunciation(
        simulatedText,
        currentSentence.target,
        currentSentence.banglish
      );
      setResult(evalRes);
      onIncrementSpeakingCount();
      try {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
      } catch {
        // ignore
      }
    }, 1200);
  };

  const handleNextSentence = () => {
    setTranscript('');
    setResult(null);
    setErrorMessage('');
    setCurrentIndex((prev) => (prev + 1) % sentences.length);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-semibold border border-rose-200">
          <Mic className="w-3.5 h-3.5" />
          <span>উচ্চারণ ও স্পোকেন ল্যাব</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          কথা বলার অনুশীলন (Speaking Practice)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-bangla">
          বাক্যটি শুনুন, তারপর বড় মাইক্রোফোন বাটনে চাপ দিয়ে স্পষ্ট করে বলুন।
        </p>
      </div>

      {/* Main Practice Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6 text-center relative overflow-hidden">
        {/* Step indicator */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>বাক্য {currentIndex + 1} / {sentences.length}</span>
          <span className="text-slate-600 font-medium">{currentSentence.category}</span>
        </div>

        {/* Target Sentence Display */}
        <div className="space-y-3 py-4 bg-slate-50/80 rounded-2xl border border-slate-200/60 p-6">
          <span className="text-2xl sm:text-3xl font-bold font-malayalam text-slate-900 block leading-relaxed">
            {currentSentence.target}
          </span>
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 inline-block max-w-md mx-auto space-y-1">
            <span className="text-xs font-bold text-slate-800 font-bangla block">
              🇧🇩 বাংলা উচ্চারণ:{' '}
              <span className="text-emerald-900 font-extrabold text-sm">
                {currentSentence.banglaPronunciation || getMalayalamBanglaPronunciation(currentSentence.target)}
              </span>
            </span>
            <span className="text-xs font-mono text-slate-500 block">
              🔤 English: {currentSentence.banglish}
            </span>
          </div>
          <p className="text-sm font-semibold text-emerald-800 font-bangla pt-1">
            💡 বাংলা অর্থ: {currentSentence.bangla}
          </p>

          {/* Audio Listen Buttons */}
          <div className="flex items-center justify-center gap-3 pt-3">
            <AudioButton
              text={currentSentence.target}
              locale={language.voiceCode}
              settings={voiceSettings}
              size="md"
              showLabel={true}
              label="শুনুন"
            />
            <AudioButton
              text={currentSentence.target}
              locale={language.voiceCode}
              settings={voiceSettings}
              slow={true}
              size="md"
              showLabel={true}
              label="ধীরে শুনুন (🐢)"
              className="bg-amber-50 text-amber-800 border-amber-200"
            />
          </div>
        </div>

        {/* Large Microphone Action Area */}
        <div className="flex flex-col items-center justify-center space-y-3 pt-2">
          <button
            type="button"
            onClick={supported ? handleStartSpeaking : handleSimulatedTestSpeak}
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95 ${
              isRecording
                ? 'bg-rose-600 text-white ring-8 ring-rose-300 animate-pulse'
                : 'bg-gradient-to-tr from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white shadow-emerald-600/30 ring-4 ring-emerald-100'
            }`}
            aria-label={isRecording ? 'রেকর্ডিং বন্ধ করুন' : 'Start Speaking'}
          >
            {isRecording ? (
              <MicOff className="w-9 h-9 sm:w-11 sm:h-11" />
            ) : (
              <Mic className="w-9 h-9 sm:w-11 sm:h-11" />
            )}
            <span className="text-[11px] font-bold mt-1 tracking-tight">
              {isRecording ? 'শুনছি...' : 'Start Speaking'}
            </span>
          </button>

          <p className="text-xs text-slate-500">
            {isRecording
              ? 'কথা বলুন, আপনার কণ্ঠ শনাক্ত করা হচ্ছে...'
              : 'মাইক্রোফোনে ট্যাপ করে স্পষ্ট স্বরে বলুন'}
          </p>
        </div>

        {/* Error message notice if any */}
        {errorMessage && (
          <div className="p-3 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs flex items-center justify-between">
            <span>{errorMessage}</span>
            <button
              type="button"
              onClick={handleSimulatedTestSpeak}
              className="underline font-bold text-amber-800 ml-2"
            >
              ডেমো টেস্ট চালান
            </button>
          </div>
        )}

        {/* Live recognized transcript */}
        {transcript && (
          <div className="p-4 bg-slate-100/70 rounded-2xl border border-slate-200 text-left space-y-1">
            <span className="text-[11px] font-bold uppercase text-slate-600 tracking-wider">
              আপনি যা বলেছেন (Recognized Speech):
            </span>
            <p className="text-sm font-semibold text-slate-800 font-malayalam">
              "{transcript}"
            </p>
          </div>
        )}

        {/* Evaluation Score & Results */}
        {result && (
          <div
            className={`p-5 rounded-2xl border text-left space-y-2 animate-fadeIn ${result.badgeColor}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-base">{result.labelBangla}</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-white/70">
                স্কোর: {result.score}%
              </span>
            </div>
            <p className="text-xs leading-relaxed font-bangla">{result.feedbackBangla}</p>
          </div>
        )}

        {/* Bottom controls */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setTranscript('');
              setResult(null);
            }}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            আবার বলুন
          </button>

          <button
            type="button"
            onClick={handleNextSentence}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>পরবর্তী বাক্য</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
