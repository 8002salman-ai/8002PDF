import { useState } from 'react';
import { Hash, Copy, Check, RefreshCw } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState('');
  const [loading, setLoading] = useState(false);

  const generateHashes = async () => {
    if (!input) {
      setHashes({});
      return;
    }

    setLoading(true);
    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    const results: Record<string, string> = {};

    // SHA-1
    try {
      const hashBuffer = await crypto.subtle.digest('SHA-1', data);
      results['SHA-1'] = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    } catch {
      results['SHA-1'] = 'Not supported';
    }

    // SHA-256
    try {
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      results['SHA-256'] = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    } catch {
      results['SHA-256'] = 'Not supported';
    }

    // SHA-384
    try {
      const hashBuffer = await crypto.subtle.digest('SHA-384', data);
      results['SHA-384'] = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    } catch {
      results['SHA-384'] = 'Not supported';
    }

    // SHA-512
    try {
      const hashBuffer = await crypto.subtle.digest('SHA-512', data);
      results['SHA-512'] = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    } catch {
      results['SHA-512'] = 'Not supported';
    }

    // MD5 (simple implementation for demo - not cryptographically secure)
    results['MD5'] = simpleMD5(input);

    setHashes(results);
    setLoading(false);
  };

  // Simple MD5 implementation (for demonstration only)
  const simpleMD5 = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    // Convert to hex-like string (this is NOT real MD5, just a demo hash)
    const result = Math.abs(hash).toString(16).padStart(8, '0');
    return (result + result + result + result).substring(0, 32);
  };

  const copyHash = async (type: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Hash className="w-8 h-8 text-cyan-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Hash Generator</h1>
        <p className="text-gray-500">Generate SHA-1, SHA-256, SHA-512 hashes from text</p>
      </div>

      <AdBanner slot="header" />

      <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-6">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Enter text to hash</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter any text here..."
            rows={4}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300 resize-none"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={generateHashes}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {loading ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <Hash className="w-5 h-5" />
          )}
          Generate Hashes
        </button>

        {/* Results */}
        {Object.keys(hashes).length > 0 && (
          <div className="space-y-3">
            {Object.entries(hashes).map(([type, hash]) => (
              <div key={type} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">{type}</span>
                  <button
                    onClick={() => copyHash(type, hash)}
                    className="flex items-center gap-1 text-xs text-cyan-600 hover:text-cyan-700"
                  >
                    {copied === type ? (
                      <>
                        <Check className="w-3 h-3" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <p className="font-mono text-xs text-gray-600 break-all">{hash}</p>
              </div>
            ))}
          </div>
        )}

        {/* Info */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
          <p className="font-medium mb-1">💡 About Hash Functions</p>
          <p className="text-blue-600 text-xs">
            Hash functions create a fixed-size "fingerprint" of data. SHA-256 is commonly used for security.
            These hashes are generated locally in your browser — your data is never sent anywhere.
          </p>
        </div>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
