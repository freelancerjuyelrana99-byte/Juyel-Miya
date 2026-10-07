import React, { useState } from 'react';
import {
  Heart,
  Bookmark,
  Trash2,
  Plus,
  Volume2,
  FileText,
  Sparkles,
  Layers,
} from 'lucide-react';
import { LanguageMetadata, LearnerNote, UserProgress, VoiceSettings, VocabularyWord } from '../types';
import { getVocabularyForLanguage, getSentencesForLanguage } from '../data';
import { AudioButton } from '../components/AudioButton';

interface NotesAndSavedPageProps {
  language: LanguageMetadata;
  progress: UserProgress;
  onToggleFavorite: (id: string) => void;
  onSaveNote: (note: LearnerNote) => void;
  onDeleteNote: (id: string) => void;
  voiceSettings: VoiceSettings;
}

export const NotesAndSavedPage: React.FC<NotesAndSavedPageProps> = ({
  language,
  progress,
  onToggleFavorite,
  onSaveNote,
  onDeleteNote,
  voiceSettings,
}) => {
  const [activeTab, setActiveTab] = useState<'words' | 'notes'>('words');

  // New Note Modal state
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  // Collect favorite items
  const allVocab = getVocabularyForLanguage(language.id);
  const allSentences = getSentencesForLanguage(language.id);

  const favoriteWords: VocabularyWord[] = allVocab.filter((v) =>
    progress.favorites.includes(v.id)
  );

  const favoriteSentences = allSentences.filter((s) =>
    progress.favorites.includes(s.id)
  );

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;

    const newNote: LearnerNote = {
      id: `note_${Date.now()}`,
      title: noteTitle.trim(),
      content: noteContent.trim(),
      languageId: language.id,
      createdAt: new Date().toLocaleDateString('bn-BD'),
    };

    onSaveNote(newNote);
    setNoteTitle('');
    setNoteContent('');
    setIsNoteModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-pink-800 text-xs font-semibold border border-pink-200">
          <Bookmark className="w-3.5 h-3.5" />
          <span>সংরক্ষিত শব্দ ও ব্যক্তিগত নোটবুক</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          আমার সংরক্ষিত শব্দ ও নোট (My Words & Notes)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-bangla">
          পছন্দের তালিকায় রাখা শব্দগুলো এক জায়গায় শুনুন এবং নিজের প্রয়োজনীয় নোট লিখে রাখুন।
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('words')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'words'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            পছন্দের শব্দমালা ({favoriteWords.length + favoriteSentences.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('notes')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'notes'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            ব্যক্তিগত নোট ({progress.notes.length})
          </button>
        </div>

        {activeTab === 'notes' && (
          <button
            type="button"
            onClick={() => setIsNoteModalOpen(true)}
            className="mb-2 px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>নতুন নোট লিখুন</span>
          </button>
        )}
      </div>

      {/* Tab 1: Favorites */}
      {activeTab === 'words' && (
        <div className="space-y-6">
          {favoriteWords.length === 0 && favoriteSentences.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
              <Heart className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-slate-700 font-semibold text-sm">
                এখনো কোনো শব্দ বা বাক্য পছন্দ করা হয়নি।
              </p>
              <p className="text-xs text-slate-500">
                শব্দভাণ্ডার বা প্রতিদিনের কথার যেকোনো কার্ডে ❤️ চেপে পছন্দের তালিকায় যুক্ত করতে পারেন।
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favoriteWords.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {item.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => onToggleFavorite(item.id)}
                        className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                        title="তালিকা থেকে সরান"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <span className="text-xl font-bold text-slate-900 block font-malayalam pt-2">
                      {item.word}
                    </span>
                    <span className="text-xs text-slate-500 font-mono block">
                      উচ্চারণ: {item.banglish}
                    </span>
                    <p className="text-sm font-semibold text-emerald-800 font-bangla pt-1">
                      অর্থ: {item.bangla}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400">শুনুন</span>
                    <AudioButton
                      text={item.word}
                      locale={language.voiceCode}
                      settings={voiceSettings}
                      size="sm"
                    />
                  </div>
                </div>
              ))}

              {favoriteSentences.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {item.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => onToggleFavorite(item.id)}
                        className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                        title="তালিকা থেকে সরান"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <span className="text-lg font-bold text-slate-900 block font-malayalam pt-2">
                      {item.target}
                    </span>
                    <span className="text-xs text-slate-500 font-mono block">
                      উচ্চারণ: {item.banglish}
                    </span>
                    <p className="text-sm font-semibold text-emerald-800 font-bangla pt-1">
                      অর্থ: {item.bangla}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400">শুনুন</span>
                    <AudioButton
                      text={item.target}
                      locale={language.voiceCode}
                      settings={voiceSettings}
                      size="sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Notes */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          {progress.notes.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
              <FileText className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-slate-700 font-semibold text-sm">
                এখনো কোনো ব্যক্তিগত নোট লেখা হয়নি।
              </p>
              <p className="text-xs text-slate-500">
                কেরালা ভ্রমণের পরিকল্পনা বা দরকারি শব্দগুলো লিখে রাখুন।
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {progress.notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-mono">
                        {note.createdAt}
                      </span>
                      <button
                        type="button"
                        onClick={() => onDeleteNote(note.id)}
                        className="text-slate-300 hover:text-rose-500 p-1 cursor-pointer"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base">{note.title}</h3>
                    <p className="text-xs text-slate-700 font-bangla whitespace-pre-line leading-relaxed">
                      {note.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Create Note Modal */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <h3 className="font-bold text-slate-900 text-base">নতুন নোট যোগ করুন</h3>
              <button
                type="button"
                onClick={() => setIsNoteModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-semibold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNote} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  নোটের শিরোনাম
                </label>
                <input
                  type="text"
                  required
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="যেমন: কেরালা বাজারের দরদাম বাক্য..."
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  নোটের বিস্তারিত
                </label>
                <textarea
                  required
                  rows={4}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="এখানে আপনার বাক্য বা শব্দাবলী লিখুন..."
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNoteModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold shadow-xs cursor-pointer"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
