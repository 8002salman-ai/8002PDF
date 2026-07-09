import { Shield, Zap, Globe, Lock, Cpu, Heart } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Shield,
      title: '100% Secure',
      desc: 'All files are processed locally in your browser. Nothing is uploaded to any server.',
      color: 'text-green-500',
      bg: 'bg-green-50',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      desc: 'No waiting for server uploads. Instant processing powered by JavaScript.',
      color: 'text-yellow-500',
      bg: 'bg-yellow-50',
    },
    {
      icon: Globe,
      title: 'Works Everywhere',
      desc: 'Use on any device — desktop, tablet, or phone. No installation needed.',
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      icon: Lock,
      title: 'No Account Needed',
      desc: 'Start using immediately. No sign-up, no email, no credit card.',
      color: 'text-purple-500',
      bg: 'bg-purple-50',
    },
    {
      icon: Cpu,
      title: 'Powered by pdf-lib',
      desc: 'Built on trusted open-source technology. No third-party APIs or hidden costs.',
      color: 'text-indigo-500',
      bg: 'bg-indigo-50',
    },
    {
      icon: Heart,
      title: 'Made with Love',
      desc: 'Built for everyone who needs simple, reliable PDF tools without the hassle.',
      color: 'text-pink-500',
      bg: 'bg-pink-50',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why PDF Lover?
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            We built the PDF tools we always wanted — simple, fast, and completely free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
