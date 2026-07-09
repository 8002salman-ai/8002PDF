import { useState } from 'react';
import { Braces, Copy, Check, Minimize2, Maximize2, AlertCircle } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [indent, setIndent] = useState(2);

  const formatJson = () => {
    setError('');
    if (!input.trim()) {
      setOutput('');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  };

  const minifyJson = () => {
    setError('');
    if (!input.trim()) {
      setOutput('');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleJson = {
    name: "John Doe",
    age: 30,
    email: "john@example.com",
    skills: ["JavaScript", "React", "Node.js"],
    address: {
      city: "New York",
      country: "USA"
    }
  };

  const loadSample = () => {
    setInput(JSON.stringify(sampleJson));
    setError('');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Braces className="w-8 h-8 text-yellow-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">JSON Formatter</h1>
        <p className="text-gray-500">Format, validate, and minify JSON data</p>
      </div>

      <AdBanner slot="header" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Input JSON</label>
            <button
              onClick={loadSample}
              className="text-xs text-yellow-600 hover:text-yellow-700"
            >
              Load sample
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name": "value"}'
            className="w-full h-80 border border-gray-200 rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 resize-none"
          />
          
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={formatJson}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-5 py-2.5 rounded-xl transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
              Format
            </button>
            <button
              onClick={minifyJson}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-5 py-2.5 rounded-xl transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
              Minify
            </button>
            <div className="flex items-center gap-2 ml-auto">
              <label className="text-xs text-gray-500">Indent:</label>
              <select
                value={indent}
                onChange={(e) => setIndent(Number(e.target.value))}
                className="border border-gray-200 rounded-lg px-2 py-1 text-sm"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
              </select>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Output</label>
            {output && (
              <button
                onClick={copyOutput}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
              >
                {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          
          {error ? (
            <div className="h-80 border border-red-200 rounded-xl p-4 bg-red-50">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-700 mb-2">Invalid JSON</p>
                  <p className="text-sm text-red-600 font-mono">{error}</p>
                </div>
              </div>
            </div>
          ) : (
            <textarea
              value={output}
              readOnly
              placeholder="Formatted JSON will appear here..."
              className="w-full h-80 border border-gray-200 rounded-xl px-4 py-3 font-mono text-sm bg-gray-50 resize-none"
            />
          )}

          {output && !error && (
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>Size: {new Blob([output]).size} bytes</span>
              <span>Lines: {output.split('\n').length}</span>
            </div>
          )}
        </div>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
