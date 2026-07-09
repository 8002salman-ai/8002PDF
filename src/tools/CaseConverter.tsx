import { useState } from 'react';
import { Type, Copy, Check } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function CaseConverter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const conversions = [
    {
      label: 'UPPERCASE',
      convert: (t: string) => t.toUpperCase(),
      example: 'HELLO WORLD',
    },
    {
      label: 'lowercase',
      convert: (t: string) => t.toLowerCase(),
      example: 'hello world',
    },
    {
      label: 'Title Case',
      convert: (t: string) =>
        t.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
      example: 'Hello World',
    },
    {
      label: 'Sentence case',
      convert: (t: string) =>
        t.toLowerCase().replace(/(^\w|\.\s+\w)/g, (c) => c.toUpperCase()),
      example: 'Hello world. This is text.',
    },
    {
      label: 'aLtErNaTiNg',
      convert: (t: string) =>
        t
          .split('')
          .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
          .join(''),
      example: 'hElLo WoRlD',
    },
    {
      label: 'InVeRsE',
      convert: (t: string) =>
        t
          .split('')
          .map((c) => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
          .join(''),
      example: 'hELLO wORLD',
    },
    {
      label: 'snake_case',
      convert: (t: string) =>
        t.toLowerCase().replace(/\s+/g, '_'),
      example: 'hello_world',
    },
    {
      label: 'kebab-case',
      convert: (t: string) =>
        t.toLowerCase().replace(/\s+/g, '-'),
      example: 'hello-world',
    },
    {
      label: 'camelCase',
      convert: (t: string) =>
        t.toLowerCase().replace(/\s+(.)/g, (_, c) => c.toUpperCase()),
      example: 'helloWorld',
    },
    {
      label: 'PascalCase',
      convert: (t: string) =>
        t.toLowerCase().replace(/(?:^|\s+)(.)/g, (_, c) => c.toUpperCase()),
      example: 'HelloWorld',
    },
  ];

  const applyConversion = (convert: (t: string) => string) => {
    setText(convert(text));
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Type className="w-8 h-8 text-teal-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Case Converter</h1>
        <p className="text-gray-500">Convert text between different cases</p>
      </div>

      <AdBanner slot="header" />

      {/* Text Area */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full h-40 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none"
        />
        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-2">
            <button
              onClick={() => setText('')}
              className="text-sm text-gray-400 hover:text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={copyToClipboard}
              disabled={!text}
              className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700 px-3 py-1.5 rounded-lg hover:bg-teal-50 transition-colors disabled:opacity-50"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="text-xs text-gray-400">{text.length} characters</p>
        </div>
      </div>

      {/* Conversion Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {conversions.map((conv) => (
          <button
            key={conv.label}
            onClick={() => applyConversion(conv.convert)}
            disabled={!text}
            className="bg-white border border-gray-100 rounded-xl p-4 hover:border-teal-200 hover:bg-teal-50 disabled:opacity-50 disabled:hover:bg-white transition-all text-left"
          >
            <p className="text-sm font-semibold text-gray-800 mb-1">{conv.label}</p>
            <p className="text-xs text-gray-400 truncate">{conv.example}</p>
          </button>
        ))}
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
