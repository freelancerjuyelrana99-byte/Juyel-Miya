import React, { useState } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { speakText, stopSpeaking } from '../services/speechService';
import { VoiceSettings } from '../types';

interface AudioButtonProps {
  text: string;
  locale: string;
  settings?: VoiceSettings;
  slow?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabel?: boolean;
  label?: string;
  title?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  locale,
  settings,
  slow = false,
  size = 'md',
  className = '',
  showLabel = false,
  label = 'শুনুন',
  title,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);

  const handleSpeak = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    setErrorOccurred(false);

    try {
      const ok = await speakText(text, locale, settings, {
        slow,
        onEnd: () => setIsPlaying(false),
        onError: () => {
          setIsPlaying(false);
          setErrorOccurred(true);
          setTimeout(() => setErrorOccurred(false), 2500);
        },
      });

      if (!ok) {
        setIsPlaying(false);
      }
    } catch {
      setIsPlaying(false);
    }
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      type="button"
      onClick={handleSpeak}
      title={title || (errorOccurred ? 'ভয়েস সাপোর্ট পাওয়া যায়নি' : slow ? 'ধীরগতিতে শুনুন' : 'উচ্চারণ শুনুন')}
      aria-label={label}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full transition-all active:scale-95 cursor-pointer shrink-0 ${
        isPlaying
          ? 'bg-teal-600 text-white shadow-md ring-2 ring-teal-400 animate-pulse'
          : errorOccurred
          ? 'bg-amber-100 text-amber-700 border border-amber-300'
          : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 shadow-xs'
      } ${sizeClasses[size]} ${className}`}
    >
      {isPlaying ? (
        <Loader2 className={`${iconSizes[size]} animate-spin`} />
      ) : errorOccurred ? (
        <VolumeX className={iconSizes[size]} />
      ) : (
        <Volume2 className={iconSizes[size]} />
      )}
      {showLabel && (
        <span className="font-medium pr-1 text-xs">{isPlaying ? 'বাজছে...' : label}</span>
      )}
    </button>
  );
};
