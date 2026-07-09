import { Star, Wrench } from 'lucide-react';
import { getSettings } from '../store/adminStore';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const settings = getSettings();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-white">
      <div className="absolute top-10 right-0 w-64 h-64 opacity-10">
        <div className="grid grid-cols-8 gap-3">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-indigo-400" />
          ))}
        </div>
      </div>
      <div className="absolute top-20 left-0 w-64 h-64 opacity-10">
        <div className="grid grid-cols-8 gap-3">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-purple-400" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 mb-8 shadow-sm">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className={`w-4 h-4 ${s <= 5 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-700">Free Tools</span>
          <span className="text-sm text-gray-400">·</span>
          <span className="text-sm text-gray-500">No Registration</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            {settings.siteName}
          </span>
          <br />
          <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-pink-500">
            + PDF Lover ❤️
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          {settings.siteTagline}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5"
          >
            Explore All Tools
          </button>
          <button
            onClick={() => onNavigate('merge')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium px-6 py-4 rounded-xl border border-gray-200 hover:border-gray-300 bg-white transition-all hover:-translate-y-0.5"
          >
            <Wrench className="w-5 h-5" />
            Try PDF Merge
          </button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
          <span className="flex items-center gap-1">✓ 100% Free</span>
          <span className="flex items-center gap-1">✓ No Sign-up</span>
          <span className="flex items-center gap-1">✓ Works Offline</span>
          <span className="flex items-center gap-1">✓ Privacy First</span>
        </div>
      </div>
    </section>
  );
}
