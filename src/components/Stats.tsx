export default function Stats() {
  const stats = [
    { value: '11+', label: 'PDF tools', icon: '🛠️' },
    { value: '100%', label: 'Free & secure', icon: '🔒' },
    { value: '0', label: 'Files uploaded to server', icon: '☁️' },
    { value: '∞', label: 'No limits', icon: '🎉' },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-extrabold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
