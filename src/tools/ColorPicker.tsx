import { useState } from 'react';
import { Palette, Copy, Check } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function ColorPicker() {
  const [color, setColor] = useState('#6366f1');
  const [copied, setCopied] = useState('');

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const formats = [
    { label: 'HEX', value: color.toUpperCase() },
    { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: 'RGBA', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` },
  ];

  const copyToClipboard = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  // Generate color palette
  const generatePalette = () => {
    const shades = [];
    for (let i = 9; i >= 1; i--) {
      const lightness = Math.min(95, hsl.l + (9 - i) * 8);
      shades.push(`hsl(${hsl.h}, ${hsl.s}%, ${lightness}%)`);
    }
    shades.push(color);
    for (let i = 1; i <= 4; i++) {
      const lightness = Math.max(5, hsl.l - i * 10);
      shades.push(`hsl(${hsl.h}, ${hsl.s}%, ${lightness}%)`);
    }
    return shades;
  };

  const palette = generatePalette();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Palette className="w-8 h-8 text-pink-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Color Picker</h1>
        <p className="text-gray-500">Pick colors and get HEX, RGB, HSL values</p>
      </div>

      <AdBanner slot="header" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Color Picker */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <div
            className="w-full h-48 rounded-xl mb-4 shadow-inner"
            style={{ backgroundColor: color }}
          />
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-12 rounded-xl cursor-pointer border-0"
          />
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full mt-3 border border-gray-200 rounded-xl px-4 py-2.5 text-center font-mono uppercase focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        {/* Color Values */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-3">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Color Values</h3>
          {formats.map((fmt) => (
            <div
              key={fmt.label}
              className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3"
            >
              <div>
                <p className="text-xs text-gray-400">{fmt.label}</p>
                <p className="font-mono text-sm text-gray-700">{fmt.value}</p>
              </div>
              <button
                onClick={() => copyToClipboard(fmt.value, fmt.label)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {copied === fmt.label ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Color Palette */}
      <div className="mt-6 bg-white border border-gray-100 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Color Palette</h3>
        <div className="flex rounded-xl overflow-hidden">
          {palette.map((c, i) => (
            <button
              key={i}
              onClick={() => {
                const ctx = document.createElement('canvas').getContext('2d')!;
                ctx.fillStyle = c;
                setColor(ctx.fillStyle);
              }}
              className="flex-1 h-12 hover:scale-y-110 transition-transform"
              style={{ backgroundColor: c }}
              title={c}
            />
          ))}
        </div>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
