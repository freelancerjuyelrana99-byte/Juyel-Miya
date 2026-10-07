import React, { useEffect, useState } from 'react';
import { Settings, Volume2, X, Sliders, Check, RotateCcw } from 'lucide-react';
import { VoiceSettings } from '../types';
import { getAvailableVoices, speakText } from '../services/speechService';
import { saveVoiceSettings } from '../services/storageService';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: VoiceSettings;
  onUpdateSettings: (settings: VoiceSettings) => void;
  currentLocale: string;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  currentLocale,
}) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [localSettings, setLocalSettings] = useState<VoiceSettings>(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  useEffect(() => {
    if (!isOpen) return;
    const vList = getAvailableVoices();
    setVoices(vList);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        setVoices(getAvailableVoices());
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateSettings(localSettings);
    saveVoiceSettings(localSettings);
    onClose();
  };

  const handleTestVoice = () => {
    const testSample =
      currentLocale.startsWith('ml')
        ? 'നമസ്കാരം, സുഖമാണോ?'
        : currentLocale.startsWith('en')
        ? 'Hello, welcome to LingoBangla.'
        : 'নমস্কার, লিঙ্গো বাংলায় স্বাগতম।';

    speakText(testSample, currentLocale, localSettings);
  };

  const handleReset = () => {
    const defaultSettings: VoiceSettings = {
      rate: 0.95,
      pitch: 1.0,
      volume: 1.0,
      slowMode: false,
      preferredVoiceName: '',
    };
    setLocalSettings(defaultSettings);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">ভয়েস ও অডিও সেটিংস</h3>
              <p className="text-xs text-slate-500">উচ্চারণ ও স্পিচ নিয়ন্ত্রণ</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5 overflow-y-auto">
          {/* Beginner Mode toggle */}
          <div className="p-3.5 bg-amber-50/70 border border-amber-200/70 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-semibold text-sm text-amber-950 flex items-center gap-1.5">
                🐢 ধীরগতির উচ্চারণ মোড (Slow Mode)
              </span>
              <p className="text-xs text-amber-800/80 mt-0.5">
                নতুনদের জন্য প্রতিটি শব্দের ধ্বনি স্পষ্টভাবে বোঝার বিশেষ মোড।
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-3">
              <input
                type="checkbox"
                checked={localSettings.slowMode}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, slowMode: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Speed Preset Tabs */}
          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-2">
              পড়ার গতি (Speech Speed)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'ধীর (Slow)', rate: 0.7 },
                { label: 'স্বাভাবিক (Normal)', rate: 0.95 },
                { label: 'দ্রুত (Fast)', rate: 1.25 },
              ].map((item) => (
                <button
                  key={item.rate}
                  type="button"
                  onClick={() => setLocalSettings({ ...localSettings, rate: item.rate })}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                    Math.abs(localSettings.rate - item.rate) < 0.1
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rate Fine Tuning */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium text-slate-600">
              <span>গতির সূক্ষ্ম সমন্বয়</span>
              <span className="font-mono text-emerald-700 font-semibold">{localSettings.rate}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.05"
              value={localSettings.rate}
              onChange={(e) =>
                setLocalSettings({ ...localSettings, rate: parseFloat(e.target.value) })
              }
              className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Pitch Control */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium text-slate-600">
              <span>সুর / পিচ (Pitch)</span>
              <span className="font-mono text-emerald-700 font-semibold">{localSettings.pitch}</span>
            </div>
            <input
              type="range"
              min="0.8"
              max="1.3"
              step="0.05"
              value={localSettings.pitch}
              onChange={(e) =>
                setLocalSettings({ ...localSettings, pitch: parseFloat(e.target.value) })
              }
              className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Voice selector if available */}
          {voices.length > 0 && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                ডিভাইসের উপলব্ধ ভয়েস (Available System Voices)
              </label>
              <select
                value={localSettings.preferredVoiceName}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, preferredVoiceName: e.target.value })
                }
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">ডিফল্ট স্বয়ংক্রিয় ভয়েস (Automatic Best Voice)</option>
                {voices.map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Test Voice Button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleTestVoice}
              className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              টেস্ট উচ্চারণ শুনুন (Test Audio)
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            রিসেট
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              বাতিল
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              সংরক্ষণ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
