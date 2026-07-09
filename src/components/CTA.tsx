import { ArrowRight, Wrench } from 'lucide-react';

interface CTAProps {
  onNavigate: (page: string) => void;
}

export default function CTA({ onNavigate }: CTAProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8">
          <Wrench className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          All tools, completely free!
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
          No sign-up required. No limits. All processing happens in your browser.
          Your files stay on your device.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('merge')}
            className="bg-white text-indigo-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl text-lg transition-all shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
          >
            Start with PDF Tools
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => onNavigate('qr-generator')}
            className="text-white/90 hover:text-white font-medium px-6 py-4 rounded-xl border border-white/30 hover:border-white/50 transition-all hover:-translate-y-0.5"
          >
            Try QR Generator
          </button>
        </div>
      </div>
    </section>
  );
}
