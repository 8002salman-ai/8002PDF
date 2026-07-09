import { useState, useCallback } from 'react';
import { Key, Copy, Check, RefreshCw, Shield } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let chars = '';
    if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      setPassword('Select at least one option');
      return;
    }

    let result = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
  }, [length, uppercase, lowercase, numbers, symbols]);

  const copyToClipboard = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    if (!password || password.includes('Select')) return { label: 'N/A', color: 'bg-gray-200', percent: 0 };
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { label: 'Weak', color: 'bg-red-500', percent: 25 };
    if (score <= 4) return { label: 'Fair', color: 'bg-yellow-500', percent: 50 };
    if (score <= 5) return { label: 'Good', color: 'bg-blue-500', percent: 75 };
    return { label: 'Strong', color: 'bg-green-500', percent: 100 };
  };

  const strength = getStrength();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Key className="w-8 h-8 text-purple-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Password Generator</h1>
        <p className="text-gray-500">Create strong, secure passwords instantly</p>
      </div>

      <AdBanner slot="header" />

      <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-6">
        {/* Generated Password */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <input
              type="text"
              value={password}
              readOnly
              className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 text-lg font-mono focus:outline-none"
              placeholder="Click Generate to create password"
            />
            <button
              onClick={copyToClipboard}
              disabled={!password}
              className="p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-gray-400" />}
            </button>
          </div>

          {/* Strength Meter */}
          {password && !password.includes('Select') && (
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-500">Strength:</span>
                <span className={`font-medium ${strength.color.replace('bg-', 'text-')}`}>{strength.label}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${strength.color} transition-all duration-300`}
                  style={{ width: `${strength.percent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Length Slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Password Length</label>
            <span className="text-sm font-bold text-purple-600">{length} characters</span>
          </div>
          <input
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-purple-500"
          />
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Uppercase (A-Z)', value: uppercase, set: setUppercase },
            { label: 'Lowercase (a-z)', value: lowercase, set: setLowercase },
            { label: 'Numbers (0-9)', value: numbers, set: setNumbers },
            { label: 'Symbols (!@#$)', value: symbols, set: setSymbols },
          ].map((opt) => (
            <button
              key={opt.label}
              onClick={() => opt.set(!opt.value)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                opt.value
                  ? 'bg-purple-50 border-purple-200 text-purple-700'
                  : 'bg-white border-gray-200 text-gray-500'
              }`}
            >
              <div className={`w-4 h-4 rounded border-2 ${opt.value ? 'bg-purple-500 border-purple-500' : 'border-gray-300'}`}>
                {opt.value && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className="text-sm font-medium">{opt.label}</span>
            </button>
          ))}
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
          Generate Password
        </button>

        {/* Security Note */}
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3">
          <Shield className="w-5 h-5 text-green-500 mt-0.5" />
          <div className="text-sm text-green-700">
            <p className="font-medium">100% Secure</p>
            <p className="text-green-600">Passwords are generated locally in your browser. Nothing is sent to any server.</p>
          </div>
        </div>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
