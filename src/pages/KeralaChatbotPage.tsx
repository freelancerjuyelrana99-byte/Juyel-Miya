import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  Check,
  Copy,
  Info,
  Radio,
  VolumeX,
} from 'lucide-react';
import { VoiceSettings } from '../types';
import { speakText, stopSpeaking, startSpeechRecognition, RecognitionSession } from '../services/speechService';
import { translateBanglaToKerala, BotTranslationResult } from '../services/keralaBotService';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string; // User's input text in Bangla
  translation?: BotTranslationResult;
  timestamp: string;
}

interface KeralaChatbotPageProps {
  voiceSettings: VoiceSettings;
}

export const KeralaChatbotPage: React.FC<KeralaChatbotPageProps> = ({ voiceSettings }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      sender: 'bot',
      text: 'নমস্কার! আমি কেরালা ভয়েজ সহকারী।',
      translation: {
        malayalam: 'നമസ്കാരം! എനിക്ക് നിങ്ങളെ സഹായിക്കാൻ കഴിയും.',
        banglaPronunciation: 'নমস্কারম্! এনিক্কু নিঙ্গলে সহায়িক্কান কঝিয়ুম্।',
        englishPronunciation: 'Namaskaaram! Enikku ningale sahaayikkaan kazhiyum.',
        banglaMeaning: 'নমস্কার! আমি আপনাকে সাহায্য করতে পারি।',
        tip: 'আপনি বাংলায় কথা বলুন (মাইক টিপুন) অথবা লিখুন — আমি কেরালার ভাষা (মালয়ালম)-এ বলব ও উচ্চারণ শিখিয়ে দেব!',
        category: 'Welcome',
      },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [listeningInterim, setListeningInterim] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [autoSpeakVoice, setAutoSpeakVoice] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);

  const recognitionSessionRef = useRef<RecognitionSession | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, listeningInterim]);

  // Clean up speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionSessionRef.current) {
        recognitionSessionRef.current.stop();
      }
      stopSpeaking();
    };
  }, []);

  // Voice playback handler
  const handleSpeak = (text: string, msgId: string, slow = false) => {
    stopSpeaking();
    setCurrentlySpeakingId(msgId);
    speakText(text, 'ml-IN', voiceSettings, {
      slow: slow || voiceSettings.slowMode,
      onEnd: () => setCurrentlySpeakingId(null),
      onError: () => setCurrentlySpeakingId(null),
    });
  };

  // Send message and get bot response
  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    // Stop active mic if running
    if (isListening && recognitionSessionRef.current) {
      recognitionSessionRef.current.stop();
      setIsListening(false);
    }

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: 'u_' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setListeningInterim('');
    setIsTyping(true);

    setTimeout(() => {
      const translation = translateBanglaToKerala(query);
      const botMsgId = 'b_' + Date.now();
      const botMsg: ChatMessage = {
        id: botMsgId,
        sender: 'bot',
        text: translation.banglaMeaning,
        translation,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      // Auto speak Kerala voice if enabled
      if (autoSpeakVoice && translation.malayalam) {
        handleSpeak(translation.malayalam, botMsgId);
      }
    }, 400);
  };

  // Toggle microphone for Bangla Speech Recognition
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
    setListeningInterim('শুনছি... বাংলায় স্পষ্ট করে বলুন...');
    setIsListening(true);

    const session = startSpeechRecognition(
      'bn-BD',
      (transcript, isFinal) => {
        setListeningInterim(transcript);
        if (isFinal && transcript.trim()) {
          setIsListening(false);
          handleSendMessage(transcript.trim());
        }
      },
      (error) => {
        setIsListening(false);
        setListeningInterim('');
        // Fallback or retry with Indian Bengali if BD fails
        console.warn('Bangla voice recognition error:', error);
      },
      () => {
        setIsListening(false);
      }
    );

    recognitionSessionRef.current = session;
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const resetChat = () => {
    stopSpeaking();
    setMessages([
      {
        id: 'welcome_' + Date.now(),
        sender: 'bot',
        text: 'কথোপকথন রিস্টার্ট করা হয়েছে। বাংলায় বলুন বা লিখুন!',
        translation: {
          malayalam: 'സ്വാഗതം! പുതിയ ചോദ്യം ചോദിക്കൂ.',
          banglaPronunciation: 'স্বাগতং! পুদীয় চোধ্যাঁ চোদিচ্ছূ।',
          englishPronunciation: 'Swaagatham! Puthiya chodyam chodikkoo.',
          banglaMeaning: 'স্বাগতম! নতুন কোনো প্রশ্ন করুন।',
          category: 'Restart',
        },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const QUICK_PROMPTS = [
    { label: '☕ এক কাপ চা দিন', text: 'এক কাপ চা দিন' },
    { label: '💧 একটু পানি দিন', text: 'আমাকে পানি দিন' },
    { label: '👋 কেমন আছেন?', text: 'কেমন আছেন?' },
    { label: '💼 আমি কাজে যাচ্ছি', text: 'আমি কাজে যাচ্ছি' },
    { label: '💰 এটার দাম কত টাকা?', text: 'এটার দাম কত টাকা?' },
    { label: '🏷️ দাম একটু কমান', text: 'দাম একটু কমান' },
    { label: '🚌 বাসস্ট্যান্ড কোথায়?', text: 'বাসস্ট্যান্ড কোথায়?' },
    { label: '💵 আমার বেতন দিন', text: 'আমার বেতন দিন' },
    { label: '🏥 আমি অসুস্থ, হাসপাতাল কোথায়?', text: 'আমি অসুস্থ, হাসপাতাল কোথায়?' },
    { label: '🇧🇩 আমি বাংলাদেশ থেকে এসেছি', text: 'আমি বাংলাদেশ থেকে এসেছি' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white rounded-3xl p-5 sm:p-7 shadow-xl border border-emerald-700/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold backdrop-blur-xs border border-emerald-400/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>কেরালা ভয়েজ সহকারী (বাংলা ➔ মালয়ালম)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              বাংলায় বলুন, কেরালা ভাষায় শুনুন!
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
              আপনি বাংলায় কথা বললে বা লিখলে রোবট মালয়ালমে অনুবাদ করবে,
              <strong> বাংলা ও ইংরেজি উভয় উচ্চারণ</strong> লিখে দেবে এবং <strong>ভয়েজে সরাসরি বলবে</strong>!
            </p>
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => setAutoSpeakVoice(!autoSpeakVoice)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                autoSpeakVoice ? 'bg-emerald-500 text-white shadow-xs' : 'bg-white/20 text-emerald-100 hover:bg-white/30'
              }`}
              title="স্বয়ংক্রিয়ভাবে মালয়ালম ভয়েজ চালু বা বন্ধ"
            >
              {autoSpeakVoice ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{autoSpeakVoice ? 'অটো ভয়েজ অন' : 'অটো ভয়েজ অফ'}</span>
            </button>

            <button
              type="button"
              onClick={resetChat}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs transition-colors cursor-pointer"
              title="নতুন চ্যাট শুরু করুন"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm flex flex-col h-[580px] overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-50/40">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[92%] sm:max-w-[80%] rounded-2xl p-4 sm:p-5 shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-emerald-700 text-white rounded-tr-xs'
                    : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                }`}
              >
                {/* Header tag */}
                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-black/5 dark:border-white/10 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold">
                    {msg.sender === 'user' ? (
                      <>
                        <User className="w-3.5 h-3.5 opacity-80" />
                        <span>আপনি (বাংলায়)</span>
                      </>
                    ) : (
                      <>
                        <Bot className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-800 font-bold">কেরালা সহকারী (মালয়ালম)</span>
                      </>
                    )}
                  </div>
                  <span className="text-[10px] opacity-70">{msg.timestamp}</span>
                </div>

                {/* User Message Content */}
                {msg.sender === 'user' && (
                  <p className="text-sm sm:text-base font-medium leading-relaxed font-bangla">
                    {msg.text}
                  </p>
                )}

                {/* Bot Message Structured Response */}
                {msg.sender === 'bot' && msg.translation && (
                  <div className="space-y-3">
                    {/* Kerala Script (Large & Clear) */}
                    <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-100 flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                          🌴 কেরালার ভাষা (মালয়ালম লিপি):
                        </span>
                        <p className="text-xl sm:text-2xl font-black font-malayalam text-emerald-950 leading-snug">
                          {msg.translation.malayalam}
                        </p>
                      </div>

                      {/* Listen audio button */}
                      <div className="flex items-center gap-1.5 shrink-0 pt-1">
                        <button
                          type="button"
                          onClick={() => handleSpeak(msg.translation!.malayalam, msg.id)}
                          className={`p-2.5 rounded-xl font-bold flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer shadow-xs ${
                            currentlySpeakingId === msg.id
                              ? 'bg-emerald-600 text-white animate-pulse'
                              : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                          }`}
                          title="মালয়ালম ভয়েজ শুনুন"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span className="text-xs hidden sm:inline">ভয়েজ শুনুন</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSpeak(msg.translation!.malayalam, msg.id, true)}
                          className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-semibold cursor-pointer"
                          title="ধীরে ধীরে শুনুন (🐢 Slow Mode)"
                        >
                          🐢
                        </button>
                      </div>
                    </div>

                    {/* Pronunciations Grid: Bangla and English side-by-side or stacked */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {/* Bangla Pronunciation */}
                      <div className="bg-slate-100/80 p-2.5 rounded-xl border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                          🇧🇩 বাংলা উচ্চারণ:
                        </span>
                        <p className="text-sm font-bold text-slate-900 font-bangla mt-0.5">
                          {msg.translation.banglaPronunciation}
                        </p>
                      </div>

                      {/* English Pronunciation */}
                      <div className="bg-slate-100/80 p-2.5 rounded-xl border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                          🔤 ইংরেজি উচ্চারণ:
                        </span>
                        <p className="text-sm font-semibold text-slate-800 font-mono mt-0.5">
                          {msg.translation.englishPronunciation}
                        </p>
                      </div>
                    </div>

                    {/* Bangla Meaning */}
                    <div className="text-xs pt-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        💡 বাংলা অর্থ:
                      </span>
                      <p className="text-slate-800 font-bangla font-semibold mt-0.5 text-sm">
                        {msg.translation.banglaMeaning}
                      </p>
                    </div>

                    {/* Practical tip if present */}
                    {msg.translation.tip && (
                      <div className="bg-amber-50/80 border border-amber-200/80 p-2.5 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">{msg.translation.tip}</p>
                      </div>
                    )}

                    {/* Copy action */}
                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard(
                            `${msg.translation!.malayalam}\nবাংলা উচ্চারণ: ${msg.translation!.banglaPronunciation}\nইংরেজি: ${msg.translation!.englishPronunciation}`,
                            msg.id
                          )
                        }
                        className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-emerald-700 cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600 font-medium">কপি হয়েছে!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>কপি করুন</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-500 rounded-tl-xs flex items-center gap-2 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.15s]" />
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.3s]" />
                <span className="text-slate-600 font-medium">মালয়ালম অনুবাদ ও উচ্চারণ তৈরি হচ্ছে...</span>
              </div>
            </div>
          )}

          {/* Listening Live Indicator */}
          {isListening && (
            <div className="flex justify-center">
              <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl px-4 py-2.5 text-xs flex items-center gap-2 shadow-sm animate-pulse">
                <Radio className="w-4 h-4 text-rose-600 animate-spin" />
                <span className="font-semibold">{listeningInterim || 'শুনছি... বাংলায় বলুন...'}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
            দ্রুত বাক্য:
          </span>
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => handleSendMessage(p.text)}
              className="text-xs whitespace-nowrap px-3 py-1 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 rounded-full transition-colors cursor-pointer shrink-0 font-bangla font-medium"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Input Bar with Mic & Send */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          {/* Microphone button for speaking Bangla */}
          <button
            type="button"
            onClick={toggleListening}
            className={`p-3 rounded-2xl flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-xs ${
              isListening
                ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse ring-4 ring-rose-200'
                : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300'
            }`}
            title={isListening ? 'কথা বলা বন্ধ করুন' : 'মাইক চেপে বাংলায় কথা বলুন'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="বাংলায় বলুন বা লিখুন (যেমন: চা দেন, পানি খাব, কাজে যাব, কেমন আছেন)..."
            className="flex-1 text-sm sm:text-base px-4 py-3 rounded-2xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/60 font-bangla"
          />

          {/* Submit button */}
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white rounded-2xl flex items-center justify-center transition-colors cursor-pointer shrink-0 font-semibold shadow-xs"
          >
            <Send className="w-4 h-4 sm:mr-1.5" />
            <span className="hidden sm:inline text-xs">পাঠান</span>
          </button>
        </form>
      </div>

      {/* Helper guide card */}
      <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4 text-xs text-slate-700 space-y-1">
        <p className="font-bold text-emerald-950 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-emerald-700" />
          কীভাবে ব্যবহার করবেন:
        </p>
        <p className="leading-relaxed">
          ১. <strong>মাইক্রোফোন (🎙️) চাপুন:</strong> এরপর বাংলায় কথা বলুন (যেমন: ‘কেমন আছেন’, ‘আমি কেরালা এসেছি’)। স্বয়ংক্রিয়ভাবে লেখা হবে ও মালয়ালমে অনুবাদ হয়ে ভয়েজে বলবে।
        </p>
        <p className="leading-relaxed">
          ২. <strong>উচ্চারণ:</strong> প্রতিটি বাক্যে বাংলা হরফে সহজ উচ্চারণ এবং ইংরেজি ফনেটিক্স দেওয়া আছে।
        </p>
        <p className="leading-relaxed">
          ৩. <strong>ভয়েজ শুনুন:</strong> 🔊 বাটনে ক্লিক করে বারবার শুনতে পারবেন এবং 🐢 বাটনে ক্লিক করে ধীরগতিতে শুনতে পারবেন।
        </p>
      </div>
    </div>
  );
};
