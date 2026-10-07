import React, { useEffect, useState } from 'react';
import {
  Settings,
  Volume2,
  Sliders,
  RotateCcw,
  Sparkles,
  WifiOff,
  CheckCircle,
  Shield,
  Smartphone,
} from 'lucide-react';
import { LanguageMetadata, VoiceSettings } from '../types';
import { getAvailableVoices, speakText } from '../services/speechService';
import { AudioButton } from '../components/AudioButton';

interface SettingsPageProps {
  language: LanguageMetadata;
  voiceSettings: VoiceSettings;
  onUpdateVoiceSettings: (settings: VoiceSettings) => void;
  onResetProgress: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  language,
  voiceSettings,
  onUpdateVoiceSettings,
  onResetProgress,
}) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    setVoices(getAvailableVoices());
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        setVoices(getAvailableVoices());
      };
    }
  }, []);

  const handleTestAudio = () => {
    const text = language.greetingExample.target;
    speakText(text, language.voiceCode, voiceSettings);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
          <Settings className="w-3.5 h-3.5" />
          <span>পছন্দ ও সিস্টেম সেটিংস</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          সেটিংস (Settings)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-bangla">
          ভয়েস উচ্চারণ স্পিড, পিচ, ও লোকাল ডাটা কনফিগারেশন।
        </p>
      </div>

      {/* Voice Pronunciation Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-base">উচ্চারণ ও শব্দ সেটিংস</h2>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
            {language.name} ({language.voiceCode})
          </span>
        </div>

        {/* Slow Mode toggle 🐢 */}
        <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-center justify-between">
          <div>
            <span className="font-bold text-sm text-amber-950 flex items-center gap-1.5">
              🐢 ধীরগতির উচ্চারণ মোড (Slow Pronunciation Mode)
            </span>
            <p className="text-xs text-amber-800/80 mt-0.5">
              শব্দ ও বাক্যের গতি কম রাখবে যাতে নতুন শিক্ষার্থীদের বুঝতে সুবিধা হয়।
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-3">
            <input
              type="checkbox"
              checked={voiceSettings.slowMode}
              onChange={(e) =>
                onUpdateVoiceSettings({
                  ...voiceSettings,
                  slowMode: e.target.checked,
                })
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>

        {/* Speed Tabs */}
        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
            উচ্চারণের গতি (Speed Preset)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'ধীর (Slow)', rate: 0.7 },
              { label: 'স্বাভাবিক (Normal)', rate: 0.95 },
              { label: 'দ্রুত (Fast)', rate: 1.25 },
            ].map((p) => (
              <button
                key={p.rate}
                type="button"
                onClick={() =>
                  onUpdateVoiceSettings({
                    ...voiceSettings,
                    rate: p.rate,
                  })
                }
                className={`py-2.5 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  Math.abs(voiceSettings.rate - p.rate) < 0.1
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Speed slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-600 font-medium">
            <span>স্পিড স্লাইডার</span>
            <span className="font-mono text-emerald-800 font-bold">{voiceSettings.rate}x</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.05"
            value={voiceSettings.rate}
            onChange={(e) =>
              onUpdateVoiceSettings({
                ...voiceSettings,
                rate: parseFloat(e.target.value),
              })
            }
            className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
          />
        </div>

        {/* Pitch slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-600 font-medium">
            <span>সুর / পিচ (Pitch)</span>
            <span className="font-mono text-emerald-800 font-bold">{voiceSettings.pitch}</span>
          </div>
          <input
            type="range"
            min="0.8"
            max="1.2"
            step="0.05"
            value={voiceSettings.pitch}
            onChange={(e) =>
              onUpdateVoiceSettings({
                ...voiceSettings,
                pitch: parseFloat(e.target.value),
              })
            }
            className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
          />
        </div>

        {/* Test voice */}
        <button
          type="button"
          onClick={handleTestAudio}
          className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Volume2 className="w-4 h-4" />
          <span>নমুনা অডিও বাজিয়ে দেখুন ({language.greetingExample.target})</span>
        </button>
      </div>

      {/* Offline & Privacy Notice */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-3">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>অফলাইন-ফার্স্ট ও গোপনীয়তা (Offline Architecture)</span>
        </h3>
        <p className="text-xs text-slate-600 font-bangla leading-relaxed">
          LingoBangla-র সমস্ত পাঠ্যক্রম, শব্দভাণ্ডার, কুইজ ও অগ্রগতি আপনার ডিভাইসের ব্রাউজারে সংরক্ষিত থাকে। এর জন্য কোনো এক্সটার্নাল অ্যাকাউন্ট বা পেইড এপিআই কি প্রয়োজন হয় না।
        </p>
      </div>

      {/* Reset progress */}
      <div className="bg-rose-50/60 rounded-3xl border border-rose-200 p-6 flex items-center justify-between text-xs">
        <div>
          <span className="font-bold text-rose-950 block">সমস্ত প্রোগ্রেস মুছে ফেলুন</span>
          <p className="text-rose-800/80 mt-0.5">
            স্ট্রিক ও পড়া পাঠের সংখ্যা রিসেট হবে।
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('আপনি কি নিশ্চিত যে সমস্ত অগ্রগতি রিসেট করতে চান?')) {
              onResetProgress();
            }
          }}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold cursor-pointer transition-colors shadow-2xs"
        >
          রিসেট
        </button>
      </div>
    </div>
  );
};
