import React, { useState } from 'react';
import {
  MessageSquare,
  Volume2,
  Mic,
  Compass,
  ShoppingBag,
  Utensils,
  MapPin,
  Briefcase,
  Users,
  Phone,
  UserCheck,
} from 'lucide-react';
import { LanguageMetadata, VoiceSettings, ConversationScenario } from '../types';
import { getConversationsForLanguage } from '../data';
import { AudioButton } from '../components/AudioButton';

interface RoleplayPageProps {
  language: LanguageMetadata;
  voiceSettings: VoiceSettings;
}

export const RoleplayPage: React.FC<RoleplayPageProps> = ({
  language,
  voiceSettings,
}) => {
  const scenarios = getConversationsForLanguage(language.id);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(scenarios[0]?.id || '');

  const activeScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  const getScenarioIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('shop')) return <ShoppingBag className="w-4 h-4 text-emerald-600" />;
    if (t.includes('restaurant')) return <Utensils className="w-4 h-4 text-amber-600" />;
    if (t.includes('travel')) return <MapPin className="w-4 h-4 text-rose-600" />;
    if (t.includes('work')) return <Briefcase className="w-4 h-4 text-blue-600" />;
    if (t.includes('friends')) return <Users className="w-4 h-4 text-purple-600" />;
    if (t.includes('phone')) return <Phone className="w-4 h-4 text-teal-600" />;
    if (t.includes('intro')) return <UserCheck className="w-4 h-4 text-indigo-600" />;
    return <Compass className="w-4 h-4 text-emerald-600" />;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-semibold border border-purple-200">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>বাস্তব জীবনের দুই তরফের সংলাপ</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          বাস্তব কথোপকথন (Conversation Roleplay)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-bangla">
          কেরালা ও দৈনন্দিন জীবনের বিভিন্ন পরিস্থিতিতে দুই পক্ষের বাস্তব কথোপকথন শুনুন ও লাইন বাই লাইন অনুশীলন করুন।
        </p>
      </div>

      {/* Scenario Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {scenarios.map((scenario) => {
          const isSelected = scenario.id === activeScenario?.id;
          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() => setSelectedScenarioId(scenario.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {getScenarioIcon(scenario.title)}
              <span>{scenario.banglaTitle}</span>
            </button>
          );
        })}
      </div>

      {/* Active Conversation Dialogue Box */}
      {activeScenario && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900">
              {activeScenario.banglaTitle}
            </h2>
            <p className="text-xs text-slate-500 font-sans mt-0.5">
              {activeScenario.title} · {activeScenario.description}
            </p>
          </div>

          {/* Dialogue Feed */}
          <div className="space-y-4">
            {activeScenario.lines.map((line) => {
              const isLearner = line.speaker === 'learner';
              return (
                <div
                  key={line.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    isLearner
                      ? 'bg-emerald-50/70 border-emerald-200 ml-4 sm:ml-8'
                      : 'bg-slate-50/80 border-slate-200 mr-4 sm:mr-8'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        isLearner
                          ? 'bg-emerald-200 text-emerald-900'
                          : 'bg-slate-200 text-slate-800'
                      }`}
                    >
                      {line.speakerName}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <AudioButton
                        text={line.text}
                        locale={language.voiceCode}
                        settings={voiceSettings}
                        size="sm"
                      />
                      <AudioButton
                        text={line.text}
                        locale={language.voiceCode}
                        settings={voiceSettings}
                        slow={true}
                        size="sm"
                        className="bg-amber-50 text-amber-800 border-amber-200"
                        title="ধীরে শুনুন (🐢)"
                      />
                    </div>
                  </div>

                  <p className="text-base sm:text-lg font-bold text-slate-900 font-malayalam leading-relaxed">
                    {line.text}
                  </p>
                  <p className="text-xs text-slate-600 font-mono mt-0.5">
                    উচ্চারণ: {line.banglish}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-800 font-bangla mt-1.5">
                    বাংলা অর্থ: {line.bangla}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
