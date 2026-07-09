import { useState, useRef } from 'react';
import { Wand2, Download, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function AIImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const imgRef = useRef<HTMLImageElement>(null);

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }
    setLoading(true);
    setError('');
    setImageUrl('');

    try {
      // Using Pollinations.ai - FREE, no API key needed!
      const encodedPrompt = encodeURIComponent(prompt);
      const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&nologo=true`;
      
      // Preload the image
      const img = new Image();
      img.onload = () => {
        setImageUrl(url);
        setLoading(false);
      };
      img.onerror = () => {
        setError('Failed to generate image. Try a different prompt.');
        setLoading(false);
      };
      img.src = url;
      
      // Timeout after 60 seconds
      setTimeout(() => {
        if (loading) {
          setError('Generation timed out. Please try again.');
          setLoading(false);
        }
      }, 60000);
    } catch (err) {
      setError('Failed to generate image');
      setLoading(false);
    }
  };

  const downloadImage = async () => {
    if (!imageUrl) return;
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-image-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError('Failed to download image');
    }
  };

  const examplePrompts = [
    'A magical forest with glowing mushrooms at night',
    'Futuristic city with flying cars and neon lights',
    'Cute robot playing guitar in a coffee shop',
    'Majestic dragon flying over mountains at sunset',
    'Underwater palace with mermaids and colorful fish',
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Wand2 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Image Generator</h1>
        <p className="text-gray-500">Create stunning images from text descriptions — 100% FREE!</p>
        <p className="text-xs text-green-600 mt-2">Powered by Pollinations.ai • No API key needed</p>
      </div>

      <AdBanner slot="header" />

      <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">
        {/* Prompt Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Describe your image</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A beautiful sunset over mountains with a lake reflection..."
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none"
          />
        </div>

        {/* Example Prompts */}
        <div>
          <p className="text-xs text-gray-400 mb-2">Try these:</p>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => setPrompt(p)}
                className="text-xs bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-700 px-3 py-1.5 rounded-full transition-colors"
              >
                {p.substring(0, 30)}...
              </button>
            ))}
          </div>
        </div>

        {/* Size Options */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
            <select
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm"
            >
              {[256, 512, 768, 1024].map((w) => (
                <option key={w} value={w}>{w}px</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
            <select
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm"
            >
              {[256, 512, 768, 1024].map((h) => (
                <option key={h} value={h}>{h}px</option>
              ))}
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateImage}
          disabled={loading || !prompt.trim()}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-300 text-white font-semibold py-3 rounded-xl transition-all"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating... (may take 30-60 seconds)
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Image
            </>
          )}
        </button>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Result */}
        {imageUrl && (
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden bg-gray-100">
              <img
                ref={imgRef}
                src={imageUrl}
                alt="AI Generated"
                className="w-full h-auto"
              />
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={downloadImage}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2.5 rounded-xl transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              <button
                onClick={generateImage}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-2.5 rounded-xl transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 bg-green-50 border border-green-100 rounded-xl p-4 text-center">
        <p className="text-sm text-green-700">
          🎨 This tool is <strong>100% FREE</strong> with unlimited generations!
          <br />
          <span className="text-xs text-green-600">Powered by Pollinations.ai open-source AI</span>
        </p>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
