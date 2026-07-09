import { useState } from 'react';
import { FileText, Clock, Hash } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function WordCounter() {
  const [text, setText] = useState('');

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.split(/[.!?]+/).filter((s) => s.trim()).length,
    paragraphs: text.split(/\n\n+/).filter((p) => p.trim()).length,
    lines: text.split('\n').length,
  };

  const readingTime = Math.ceil(stats.words / 200);
  const speakingTime = Math.ceil(stats.words / 150);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Word Counter</h1>
        <p className="text-gray-500">Count words, characters, sentences and more</p>
      </div>

      <AdBanner slot="header" />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {[
          { label: 'Words', value: stats.words, color: 'bg-blue-500' },
          { label: 'Characters', value: stats.characters, color: 'bg-purple-500' },
          { label: 'No Spaces', value: stats.charactersNoSpaces, color: 'bg-pink-500' },
          { label: 'Sentences', value: stats.sentences, color: 'bg-orange-500' },
          { label: 'Paragraphs', value: stats.paragraphs, color: 'bg-green-500' },
          { label: 'Lines', value: stats.lines, color: 'bg-cyan-500' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-100 rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${stat.color.replace('bg-', 'text-')}`}>{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Reading Time */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
            <Clock className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Reading Time</p>
            <p className="text-lg font-semibold text-gray-800">{readingTime} min</p>
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
            <Hash className="w-6 h-6 text-teal-500" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Speaking Time</p>
            <p className="text-lg font-semibold text-gray-800">{speakingTime} min</p>
          </div>
        </div>
      </div>

      {/* Text Area */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="w-full h-64 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
        />
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={() => setText('')}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Clear text
          </button>
          <p className="text-xs text-gray-400">
            Avg reading speed: 200 wpm | Speaking: 150 wpm
          </p>
        </div>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
