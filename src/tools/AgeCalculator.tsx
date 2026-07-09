import { useState } from 'react';
import { Calendar, Cake } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalMonths: number;
    totalHours: number;
    nextBirthday: string;
    daysUntilBirthday: number;
  } | null>(null);

  const calculate = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();

    if (birth > today) {
      alert('Birth date cannot be in the future!');
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;

    // Calculate next birthday
    let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= today) {
      nextBirthday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      nextBirthday: nextBirthday.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      daysUntilBirthday,
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-rose-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Age Calculator</h1>
        <p className="text-gray-500">Calculate your exact age in years, months, and days</p>
      </div>

      <AdBanner slot="header" />

      <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">
        {/* Date Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Birth Date</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
          />
        </div>

        <button
          onClick={calculate}
          disabled={!birthDate}
          className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Calculate Age
        </button>

        {/* Results */}
        {result && (
          <div className="space-y-4 pt-4">
            {/* Main Age */}
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-6 text-center">
              <p className="text-sm text-rose-600 mb-2">Your Age</p>
              <div className="flex items-center justify-center gap-4">
                <div>
                  <p className="text-4xl font-bold text-rose-600">{result.years}</p>
                  <p className="text-xs text-gray-500">Years</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-rose-500">{result.months}</p>
                  <p className="text-xs text-gray-500">Months</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-rose-400">{result.days}</p>
                  <p className="text-xs text-gray-500">Days</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Total Days', value: result.totalDays.toLocaleString() },
                { label: 'Total Weeks', value: result.totalWeeks.toLocaleString() },
                { label: 'Total Months', value: result.totalMonths.toLocaleString() },
                { label: 'Total Hours', value: result.totalHours.toLocaleString() },
              ].map((stat) => (
                <div key={stat.label} className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Next Birthday */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Cake className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Next Birthday</p>
                <p className="text-sm text-gray-500">{result.nextBirthday}</p>
                <p className="text-xs text-amber-600 font-medium">
                  {result.daysUntilBirthday === 0 ? '🎉 Happy Birthday!' : `${result.daysUntilBirthday} days to go!`}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
