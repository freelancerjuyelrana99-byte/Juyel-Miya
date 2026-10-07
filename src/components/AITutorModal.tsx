import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, Volume2, HelpCircle, CheckCircle2 } from 'lucide-react';
import { LanguageMetadata } from '../types';
import { AudioButton } from './AudioButton';

interface Message {
  id: string;
  sender: 'tutor' | 'user';
  text: string;
  targetScript?: string;
  banglish?: string;
  audioLocale?: string;
}

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageMetadata;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize tutor message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'tutor',
          text: `নমস্কার! আমি LingoBangla-র স্মার্ট টিউটর। আপনি বাংলা ভাষায় যেকোনো প্রশ্ন করতে পারেন (যেমন: ‘কেরালাতে চা কীভাবে চাইব?’, ‘আমি কাজে যাচ্ছি মালয়ালমে কী হবে?’, বা ব্যাকরণ নিয়ে সাহায্য)।`,
          targetScript: language.id === 'malayalam' ? 'സ്വാഗതം! എന്ത് സഹായിക്കണം?' : 'Welcome!',
          banglish: language.id === 'malayalam' ? 'Swaagatham! Enthu sahaayikkanam?' : 'Welcome!',
          audioLocale: language.voiceCode,
        },
      ]);
    }
  }, [isOpen, language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const getSmartOfflineResponse = (query: string): Message => {
    const q = query.toLowerCase();

    if (q.includes('চা') || q.includes('tea') || q.includes('chaaya')) {
      return {
        id: Date.now().toString(),
        sender: 'tutor',
        text: 'কেরালার দোকানে চা চাইতে বলবেন: "ചേട്ടാ, ഒരു ചായ തരൂ" (Chetta, oru chaaya tharoo)। কড়া লিকার চাইলে বলবেন "കടുപ്പമുള്ള ചായ" (Kaduppamulla chaaya)।',
        targetScript: 'ചേട്ടാ, ഒരു ചായ തരൂ',
        banglish: 'Chetta, oru chaaya tharoo',
        audioLocale: language.voiceCode,
      };
    }

    if (q.includes('নাম') || q.includes('name') || q.includes('peru')) {
      return {
        id: Date.now().toString(),
        sender: 'tutor',
        text: 'কারও নাম জিজ্ঞেস করতে বলবেন: "നിങ്ങളുടെ പേര് എന്താണ്?" (Ningalude peru enthaanu?)। আর নিজের নাম বলতে: "എന്റെ പേര്..." (Ente peru...)।',
        targetScript: 'നിങ്ങളുടെ പേര് എന്താണ്?',
        banglish: 'Ningalude peru enthaanu?',
        audioLocale: language.voiceCode,
      };
    }

    if (q.includes('পানি') || q.includes('জল') || q.includes('water') || q.includes('vellam')) {
      return {
        id: Date.now().toString(),
        sender: 'tutor',
        text: 'মালয়ালমে পানিকে বলে "വെള്ളം" (Vellam)। পানি চাইতে বলবেন: "കുറച്ച് വെള്ളം തരൂ" (Kurachu vellam tharoo)। কেরালাতে হালকা গরম পিংক পানিও পাওয়া যায় যাকে "ജീരകവെള്ളം" (Jeeraka vellam) বলে!',
        targetScript: 'കുറച്ച് വെള്ളം തരൂ',
        banglish: 'Kurachu vellam tharoo',
        audioLocale: language.voiceCode,
      };
    }

    if (q.includes('দাম') || q.includes('কত') || q.includes('price') || q.includes('cost')) {
      return {
        id: Date.now().toString(),
        sender: 'tutor',
        text: 'দোকানে দাম জানতে বলবেন: "ഇതിന് എത്രയാണ് വില?" (Ithinu ethrayaanu vila?)। যদি কিছুটা কমাতে চান: "കുറച്ച് തരുമോ?" (Kurachu tharumo?)।',
        targetScript: 'ഇതിന് എത്രയാണ് വില?',
        banglish: 'Ithinu ethrayaanu vila?',
        audioLocale: language.voiceCode,
      };
    }

    if (q.includes('ধন্যবাদ') || q.includes('thank') || q.includes('nandi')) {
      return {
        id: Date.now().toString(),
        sender: 'tutor',
        text: 'মালয়ালমে ধন্যবাদ হলো "നന്ദി" (Nandi)। অনেক বেশি ধন্যবাদ জানাতে বলবেন: "വളരെ നന്ദി" (Valare nandi)।',
        targetScript: 'വളരെ നന്ദി',
        banglish: 'Valare nandi',
        audioLocale: language.voiceCode,
      };
    }

    if (q.includes('কাজ') || q.includes('চাকরি') || q.includes('work') || q.includes('joli')) {
      return {
        id: Date.now().toString(),
        sender: 'tutor',
        text: 'কাজের মালয়ালম শব্দ হলো "ജോലി" (Joli)। "আমি কাজে যাচ্ছি" বলতে বলবেন: "ഞാൻ ജോലിക്ക് പോകുന്നു" (Njaan jolikku pokunnu)। মালিক বা সর্দারকে বলা হয় "മുതലാളി" (Muthalaali)।',
        targetScript: 'ഞാൻ ജോലിക്ക് പോകുന്നു',
        banglish: 'Njaan jolikku pokunnu',
        audioLocale: language.voiceCode,
      };
    }

    // Default intelligent tutoring response
    return {
      id: Date.now().toString(),
      sender: 'tutor',
      text: `খুব চমৎকার প্রশ্ন! "${query}" সম্পর্কে মালয়ালম ভাষায় প্রাত্যহিক ব্যবহারের জন্য সহজ বাক্যটি হলো: "ശരി, നമുക്ക് സംസാരിക്കാം" (ঠিক আছে, চলুন কথা বলি)। মনে রাখবেন, সবসময় বড়দের ক্ষেত্রে 'നിങ്ങൾ' (Ningal) ও '-oo' ভদ্র রূপ ব্যবহার করবেন।`,
      targetScript: 'ശരി, നമുക്ക് സംസാരിക്കാം',
      banglish: 'Shari, namukku samsaarikaam',
      audioLocale: language.voiceCode,
    };
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getSmartOfflineResponse(currentInput);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 450);
  };

  const samplePrompts = [
    'দোকানে চা কীভাবে চাইব?',
    'পানির জন্য মালয়ালমে কী বলব?',
    'দাম জিজ্ঞেস করার সঠিক বাক্য কী?',
    'আমি কাজে যাচ্ছি মালয়ালমে কী হবে?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full h-[85vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base">স্মার্ট এআই টিউটর</h3>
                <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-medium">
                  অফলাইন-রেডি
                </span>
              </div>
              <p className="text-xs text-emerald-100">
                {language.banglaName} শেখার ব্যক্তিগত সহায়িকা
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

        {/* Message Feed */}
        <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-xs shadow-xs'
                    : 'bg-white text-slate-800 rounded-bl-xs border border-slate-200/80 shadow-xs'
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>

                {m.targetScript && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2 bg-slate-50/80 p-2 rounded-xl">
                    <div>
                      <p className="font-semibold text-emerald-950 font-malayalam text-base">
                        {m.targetScript}
                      </p>
                      {m.banglish && (
                        <p className="text-xs text-slate-500 font-sans mt-0.5">
                          উচ্চারণ: {m.banglish}
                        </p>
                      )}
                    </div>
                    {m.audioLocale && (
                      <AudioButton
                        text={m.targetScript}
                        locale={m.audioLocale}
                        size="sm"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-500 rounded-bl-xs flex items-center gap-1.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.15s]" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.3s]" />
                <span className="ml-1 text-slate-400">টিউটর লিখছেন...</span>
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
              onClick={() => {
                setInputValue(prompt);
              }}
              className="text-xs whitespace-nowrap px-3 py-1 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 rounded-full transition-colors cursor-pointer shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="বাংলায় যেকোনো প্রশ্ন লিখুন (যেমন: চা কীভাবে চাইব?)..."
            className="flex-1 text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
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
