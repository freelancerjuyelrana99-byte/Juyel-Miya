import React, { useState } from 'react';
import {
  FileText,
  Volume2,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ChevronDown,
} from 'lucide-react';
import { LanguageMetadata, VoiceSettings } from '../types';
import { getGrammarForLanguage } from '../data';
import { AudioButton } from '../components/AudioButton';

interface GrammarPageProps {
  language: LanguageMetadata;
  voiceSettings: VoiceSettings;
}

export const GrammarPage: React.FC<GrammarPageProps> = ({
  language,
  voiceSettings,
}) => {
  const topics = getGrammarForLanguage(language.id);
  const [selectedTopicId, setSelectedTopicId] = useState<string>(topics[0]?.id || '');

  const activeTopic = topics.find((t) => t.id === selectedTopicId) || topics[0];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <FileText className="w-3.5 h-3.5" />
          <span>সহজ বাংলা ব্যাকরণ গাইড</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {language.banglaName} সহজ ব্যাকরণ (Grammar Guide)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-bangla max-w-2xl leading-relaxed">
          কোনো জটিল পারিভাষিক শব্দ ছাড়াই বাংলা উদাহরণের মাধ্যমে সর্বনাম, কাল, প্রশ্ন ও বাক্য গঠনের নিয়ম শিখুন।
        </p>
      </div>

      {/* Topics Horizontal Selector */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
        {topics.map((topic) => {
          const isSelected = topic.id === activeTopic?.id;
          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => setSelectedTopicId(topic.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {topic.title}
            </button>
          );
        })}
      </div>

      {/* Active Topic Content */}
      {activeTopic && (
        <article className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
          <header className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              {activeTopic.title}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              {activeTopic.banglaTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-bangla mt-1">
              {activeTopic.summary}
            </p>
          </header>

          {/* Explanation in simple Bengali */}
          <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 text-sm text-slate-700 font-bangla leading-relaxed whitespace-pre-line">
            {activeTopic.explanation}
          </div>

          {/* Real examples list */}
          <section className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base uppercase tracking-wider">
              বাস্তব উদাহরণ ও প্রয়োগ (Examples)
            </h3>

            <div className="space-y-3">
              {activeTopic.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="space-y-1">
                    <span className="text-lg font-bold font-malayalam text-slate-900 block">
                      {ex.target}
                    </span>
                    <span className="text-xs text-slate-500 font-mono block">
                      উচ্চারণ: {ex.banglish}
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-emerald-800 font-bangla">
                      অর্থ: {ex.bangla}
                    </p>
                    {ex.breakdown && (
                      <p className="text-[11px] text-slate-500 font-sans italic pt-0.5">
                        {ex.breakdown}
                      </p>
                    )}
                  </div>

                  <AudioButton
                    text={ex.target}
                    locale={language.voiceCode}
                    settings={voiceSettings}
                    size="md"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Tips & Common Mistakes if any */}
          {activeTopic.tips && activeTopic.tips.length > 0 && (
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs space-y-1.5 text-amber-950">
              <span className="font-bold flex items-center gap-1.5 text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-600" />
                গুরুত্বপূর্ণ টিপস:
              </span>
              <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700">
                {activeTopic.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </article>
      )}
    </div>
  );
};
