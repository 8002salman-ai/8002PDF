import { useState } from 'react';
import { AlignLeft, Copy, Check } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'perspiciatis', 'unde',
  'omnis', 'iste', 'natus', 'error', 'voluptatem', 'accusantium', 'doloremque',
  'laudantium', 'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo',
  'inventore', 'veritatis', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta',
];

export default function LoremGenerator() {
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [count, setCount] = useState(3);
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const [startWithLorem, setStartWithLorem] = useState(true);

  const getRandomWord = () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];

  const generateSentence = (wordCount: number, isFirst: boolean) => {
    const words: string[] = [];
    for (let i = 0; i < wordCount; i++) {
      if (isFirst && startWithLorem && i < 2) {
        words.push(i === 0 ? 'Lorem' : 'ipsum');
      } else {
        words.push(getRandomWord());
      }
    }
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ') + '.';
  };

  const generateParagraph = (isFirst: boolean) => {
    const sentenceCount = Math.floor(Math.random() * 4) + 4;
    const sentences: string[] = [];
    for (let i = 0; i < sentenceCount; i++) {
      const wordCount = Math.floor(Math.random() * 10) + 6;
      sentences.push(generateSentence(wordCount, isFirst && i === 0));
    }
    return sentences.join(' ');
  };

  const generate = () => {
    let result = '';
    
    if (type === 'words') {
      const words: string[] = [];
      for (let i = 0; i < count; i++) {
        if (startWithLorem && i < 2) {
          words.push(i === 0 ? 'Lorem' : 'ipsum');
        } else {
          words.push(getRandomWord());
        }
      }
      result = words.join(' ');
    } else if (type === 'sentences') {
      const sentences: string[] = [];
      for (let i = 0; i < count; i++) {
        const wordCount = Math.floor(Math.random() * 10) + 6;
        sentences.push(generateSentence(wordCount, i === 0));
      }
      result = sentences.join(' ');
    } else {
      const paragraphs: string[] = [];
      for (let i = 0; i < count; i++) {
        paragraphs.push(generateParagraph(i === 0));
      }
      result = paragraphs.join('\n\n');
    }

    setText(result);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <AlignLeft className="w-8 h-8 text-amber-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Lorem Ipsum Generator</h1>
        <p className="text-gray-500">Generate placeholder text for your designs</p>
      </div>

      <AdBanner slot="header" />

      <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">
        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(['paragraphs', 'sentences', 'words'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`py-3 rounded-xl font-medium transition-all capitalize ${
                type === t
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-amber-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How many {type}?
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Math.max(1, Number(e.target.value)))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="startLorem"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
              className="w-4 h-4 accent-amber-500"
            />
            <label htmlFor="startLorem" className="text-sm text-gray-600">
              Start with "Lorem ipsum"
            </label>
          </div>
        </div>

        <button
          onClick={generate}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Generate Lorem Ipsum
        </button>

        {/* Output */}
        {text && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700">Generated Text</p>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 px-3 py-1.5 rounded-lg hover:bg-amber-50 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 max-h-96 overflow-y-auto">
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{text}</p>
            </div>
          </div>
        )}
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
