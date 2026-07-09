import { useState } from 'react';
import { Binary, ArrowRightLeft, Copy, Check } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const process = () => {
    setError('');
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch {
      setError(mode === 'decode' ? 'Invalid Base64 string' : 'Failed to encode');
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swapMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput('');
    setError('');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Binary className="w-8 h-8 text-slate-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Base64 Encoder/Decoder</h1>
        <p className="text-gray-500">Encode text to Base64 or decode Base64 to text</p>
      </div>

      <AdBanner slot="header" />

      <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">
        {/* Mode Toggle */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setMode('encode')}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
              mode === 'encode'
                ? 'bg-slate-800 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Encode
          </button>
          <button
            onClick={swapMode}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Swap"
          >
            <ArrowRightLeft className="w-5 h-5 text-gray-400" />
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
              mode === 'decode'
                ? 'bg-slate-800 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Decode
          </button>
        </div>

        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
            className="w-full h-32 border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-slate-300 resize-none"
          />
        </div>

        {/* Process Button */}
        <button
          onClick={process}
          disabled={!input.trim()}
          className="w-full bg-slate-800 hover:bg-slate-900 disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
        </button>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Output */}
        {output && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">Result</label>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              className="w-full h-32 border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono bg-gray-50 resize-none"
            />
          </div>
        )}
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
