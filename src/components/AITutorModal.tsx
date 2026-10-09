import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  X,
  Sparkles,
  Volume2,
  Mic,
  MicOff,
  Copy,
  Check,
  Radio,
  ExternalLink,
} from 'lucide-react';
import { LanguageMetadata } from '../types';
import { AudioButton } from './AudioButton';
import { translateBanglaToKerala } from '../services/keralaBotService';
import { startSpeechRecognition, stopSpeaking, RecognitionSession } from '../services/speechService';
import { getMalayalamBanglaPronunciation } from '../utils/malayalamTransliteration';

interface Message {
  id: string;
  sender: 'tutor' | 'user';
  text: string;
  targetScript?: string;
  banglish?: string;
  banglaPronunciation?: string;
  audioLocale?: string;
  tip?: string;
}

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageMetadata;
  onOpenFullChatbot?: () => void;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  language,
  onOpenFullChatbot,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [listeningInterim, setListeningInterim] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionSessionRef = useRef<RecognitionSession | null>(null);

  // Initialize tutor message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'tutor',
          text: `নমস্কার! আমি LingoBangla-র কেরালা ভয়েজ সহকারী। আপনি বাংলায় যেকোনো কথা বলতে পারেন (যেমন: ‘চা চাই’, ‘কাজে যাব’, ‘দাম কত?’ বা ‘কেমন আছেন?’)। আমি মালয়ালমে অনুবাদ করব, সাথে বাংলা ও ইংরেজি উচ্চারণ এবং অডিও ভয়েজ থাকবে!`,
          targetScript: language.id === 'malayalam' ? 'സ്വാഗതം! എന്ത് സഹായിക്കണം?' : 'Welcome!',
          banglish: language.id === 'malayalam' ? 'Swaagatham! Enthu sahaayikkanam?' : 'Welcome!',
          banglaPronunciation: language.id === 'malayalam' ? 'স্বাগতং! এন্তু সহায়িক্কণম্?' : 'ওয়েলকাম!',
          audioLocale: language.voiceCode,
        },
      ]);
    }
  }, [isOpen, language, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, listeningInterim]);

  useEffect(() => {
    return () => {
      if (recognitionSessionRef.current) {
        recognitionSessionRef.current.stop();
      }
      stopSpeaking();
    };
  }, []);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    if (isListening && recognitionSessionRef.current) {
      recognitionSessionRef.current.stop();
      setIsListening(false);
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setListeningInterim('');
    setIsTyping(true);

    setTimeout(() => {
      if (language.id === 'malayalam') {
        const result = translateBanglaToKerala(query);
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'tutor',
          text: result.banglaMeaning,
          targetScript: result.malayalam,
          banglish: result.englishPronunciation,
          banglaPronunciation: result.banglaPronunciation,
          audioLocale: 'ml-IN',
          tip: result.tip,
        };
        setMessages((prev) => [...prev, botResponse]);
      } else {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'tutor',
          text: `"${query}" এর জন্য সুন্দর উত্তর:`,
          targetScript: language.greetingExample.target,
          banglish: language.greetingExample.banglish,
          banglaPronunciation: getMalayalamBanglaPronunciation(language.greetingExample.target),
          audioLocale: language.voiceCode,
        };
        setMessages((prev) => [...prev, botResponse]);
      }
      setIsTyping(false);
    }, 450);
  };

  const toggleListening = () => {
    if (isListening) {
      if (recognitionSessionRef.current) {
        recognitionSessionRef.current.stop();
      }
      setIsListening(false);
      setListeningInterim('');
      return;
    }

    stopSpeaking();
    setListeningInterim('শুনছি... বাংলায় বলুন...');
    setIsListening(true);

    const session = startSpeechRecognition(
      'bn-BD',
      (transcript, isFinal) => {
        setListeningInterim(transcript);
        if (isFinal && transcript.trim()) {
          setIsListening(false);
          handleSend(transcript.trim());
        }
      },
      (error) => {
        console.warn('Voice rec notice:', error);
        setIsListening(false);
        setListeningInterim('');
      },
      () => {
        setIsListening(false);
      }
    );

    recognitionSessionRef.current = session;
  };

  const copyText = (txt: string, id: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const samplePrompts = [
    'দোকানে চা কীভাবে চাইব?',
    'পানির জন্য মালয়ালমে কী বলব?',
    'দাম কত জিজ্ঞেস করার বাক্য',
    'আমি কাজে যাচ্ছি মালয়ালমে কী?',
    'কেমন আছেন?',
    'আমার বেতন দিন',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full h-[88vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shadow-xs">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base">কেরালা ভয়েজ সহকারী</h3>
                <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-semibold">
                  বাংলা ➔ মালয়ালম
                </span>
              </div>
              <p className="text-xs text-emerald-100 font-bangla">
                বাংলায় বলুন বা লিখুন — মালয়ালমে অনুবাদ ও ভয়েজে বলবে
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenFullChatbot && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenFullChatbot();
                }}
                className="hidden sm:flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 text-white px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer"
                title="পূর্ণাঙ্গ চ্যাটবট পেজ খুলুন"
              >
                <span>বড় স্ক্রিন</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="text-white/80 hover:text-white p-1.5 rounded-xl hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Feed */}
        <div ref={scrollRef} className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[90%] rounded-2xl p-4 text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-emerald-700 text-white rounded-tr-xs shadow-xs'
                    : 'bg-white text-slate-800 rounded-tl-xs border border-slate-200/90 shadow-xs'
                }`}
              >
                {/* Header tag */}
                <div className="text-[11px] font-bold opacity-75 mb-1.5 flex items-center justify-between">
                  <span>{m.sender === 'user' ? 'আপনি (বাংলা)' : 'কেরালা সহকারী'}</span>
                  {m.targetScript && (
                    <button
                      type="button"
                      onClick={() =>
                        copyText(
                          `${m.targetScript}\nবাংলা উচ্চারণ: ${m.banglaPronunciation || ''}\nইংরেজি: ${m.banglish || ''}`,
                          m.id
                        )
                      }
                      className="text-slate-400 hover:text-emerald-700 cursor-pointer inline-flex items-center gap-0.5"
                    >
                      {copiedId === m.id ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>

                <p className="whitespace-pre-line font-bangla font-medium">{m.text}</p>

                {m.targetScript && (
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-2.5 bg-slate-50/80 p-3 rounded-2xl">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                          🌴 মালয়ালম লিপি:
                        </span>
                        <p className="font-black text-emerald-950 font-malayalam text-xl mt-0.5">
                          {m.targetScript}
                        </p>
                      </div>
                      {m.audioLocale && (
                        <AudioButton
                          text={m.targetScript}
                          locale={m.audioLocale}
                          size="sm"
                          className="bg-emerald-700 text-white shrink-0"
                        />
                      )}
                    </div>

                    {/* Both Bangla and English Pronunciations */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                      {m.banglaPronunciation && (
                        <div className="bg-white p-2 rounded-xl border border-slate-200">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                            🇧🇩 বাংলা উচ্চারণ:
                          </span>
                          <p className="font-bold text-slate-900 font-bangla mt-0.5">
                            {m.banglaPronunciation}
                          </p>
                        </div>
                      )}

                      {m.banglish && (
                        <div className="bg-white p-2 rounded-xl border border-slate-200">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                            🔤 ইংরেজি উচ্চারণ:
                          </span>
                          <p className="font-medium text-slate-700 font-mono mt-0.5">
                            {m.banglish}
                          </p>
                        </div>
                      )}
                    </div>

                    {m.tip && (
                      <p className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded-xl border border-amber-200/70">
                        💡 {m.tip}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-500 rounded-tl-xs flex items-center gap-1.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.15s]" />
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.3s]" />
                <span className="ml-1 text-slate-600">মালয়ালমে অনুবাদ হচ্ছে...</span>
              </div>
            </div>
          )}

          {isListening && (
            <div className="flex justify-center">
              <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl px-4 py-2 text-xs flex items-center gap-2 shadow-sm animate-pulse">
                <Radio className="w-4 h-4 text-rose-600 animate-spin" />
                <span className="font-semibold">{listeningInterim || 'শুনছি... বাংলায় বলুন...'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {samplePrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handleSend(prompt)}
              className="text-xs whitespace-nowrap px-3 py-1 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 rounded-full transition-colors cursor-pointer shrink-0 font-bangla"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          {/* Mic Button for speaking in Bangla */}
          <button
            type="button"
            onClick={toggleListening}
            className={`p-2.5 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse ring-2 ring-rose-300'
                : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
            }`}
            title="মাইক চেপে বাংলায় কথা বলুন"
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="বাংলায় বলুন বা লিখুন (যেমন: চা দেন, কেমন আছেন)..."
            className="flex-1 text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 font-bangla"
          />

          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
