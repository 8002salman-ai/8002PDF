import { useState } from 'react';
import { Heart, Scale, Ruler, Info } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function BMICalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(7);
  const [pounds, setPounds] = useState(154);

  const calculateBMI = () => {
    let bmi: number;
    if (unit === 'metric') {
      const heightInMeters = height / 100;
      bmi = weight / (heightInMeters * heightInMeters);
    } else {
      const totalInches = feet * 12 + inches;
      bmi = (pounds / (totalInches * totalInches)) * 703;
    }
    return bmi;
  };

  const bmi = calculateBMI();

  const getCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-500', bg: 'bg-blue-500' };
    if (bmi < 25) return { label: 'Normal', color: 'text-green-500', bg: 'bg-green-500' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-500', bg: 'bg-yellow-500' };
    return { label: 'Obese', color: 'text-red-500', bg: 'bg-red-500' };
  };

  const category = getCategory(bmi);

  const getIdealWeight = () => {
    const heightM = unit === 'metric' ? height / 100 : (feet * 12 + inches) * 0.0254;
    const minWeight = 18.5 * heightM * heightM;
    const maxWeight = 24.9 * heightM * heightM;
    if (unit === 'imperial') {
      return { min: minWeight * 2.205, max: maxWeight * 2.205 };
    }
    return { min: minWeight, max: maxWeight };
  };

  const idealWeight = getIdealWeight();

  // Calculate position on scale (0-100%)
  const getScalePosition = () => {
    if (bmi <= 15) return 0;
    if (bmi >= 40) return 100;
    return ((bmi - 15) / 25) * 100;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-rose-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">BMI Calculator</h1>
        <p className="text-gray-500">Calculate your Body Mass Index</p>
      </div>

      <AdBanner slot="header" />

      <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-6">
        {/* Unit Toggle */}
        <div className="flex justify-center">
          <div className="bg-gray-100 rounded-xl p-1 flex">
            <button
              onClick={() => setUnit('metric')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                unit === 'metric' ? 'bg-white text-gray-800 shadow' : 'text-gray-500'
              }`}
            >
              Metric (kg/cm)
            </button>
            <button
              onClick={() => setUnit('imperial')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                unit === 'imperial' ? 'bg-white text-gray-800 shadow' : 'text-gray-500'
              }`}
            >
              Imperial (lb/ft)
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weight */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Weight</span>
            </div>
            {unit === 'metric' ? (
              <div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-rose-300"
                  />
                  <span className="text-gray-500">kg</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="200"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full mt-2 accent-rose-500"
                />
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={pounds}
                    onChange={(e) => setPounds(Number(e.target.value))}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-rose-300"
                  />
                  <span className="text-gray-500">lbs</span>
                </div>
                <input
                  type="range"
                  min="66"
                  max="440"
                  value={pounds}
                  onChange={(e) => setPounds(Number(e.target.value))}
                  className="w-full mt-2 accent-rose-500"
                />
              </div>
            )}
          </div>

          {/* Height */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Height</span>
            </div>
            {unit === 'metric' ? (
              <div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-rose-300"
                  />
                  <span className="text-gray-500">cm</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="220"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full mt-2 accent-rose-500"
                />
              </div>
            ) : (
              <div className="flex gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={feet}
                      onChange={(e) => setFeet(Number(e.target.value))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                    <span className="text-gray-500">ft</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={inches}
                      onChange={(e) => setInches(Number(e.target.value))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                    <span className="text-gray-500">in</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Result */}
        <div className="bg-gray-50 rounded-2xl p-6 text-center">
          <p className="text-sm text-gray-500 mb-2">Your BMI</p>
          <p className={`text-5xl font-bold ${category.color}`}>{bmi.toFixed(1)}</p>
          <p className={`text-lg font-semibold mt-2 ${category.color}`}>{category.label}</p>

          {/* BMI Scale */}
          <div className="mt-6 relative">
            <div className="h-3 rounded-full flex overflow-hidden">
              <div className="bg-blue-400 w-1/4" />
              <div className="bg-green-400 w-1/4" />
              <div className="bg-yellow-400 w-1/4" />
              <div className="bg-red-400 w-1/4" />
            </div>
            <div
              className="absolute top-0 -translate-x-1/2 -translate-y-1"
              style={{ left: `${getScalePosition()}%` }}
            >
              <div className={`w-5 h-5 rounded-full ${category.bg} border-2 border-white shadow`} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
          </div>
        </div>

        {/* Ideal Weight */}
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-green-700">Healthy Weight Range</p>
            <p className="text-green-600">
              {idealWeight.min.toFixed(1)} - {idealWeight.max.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          {[
            { range: '< 18.5', label: 'Underweight', color: 'bg-blue-100 text-blue-700' },
            { range: '18.5-24.9', label: 'Normal', color: 'bg-green-100 text-green-700' },
            { range: '25-29.9', label: 'Overweight', color: 'bg-yellow-100 text-yellow-700' },
            { range: '≥ 30', label: 'Obese', color: 'bg-red-100 text-red-700' },
          ].map((cat) => (
            <div key={cat.label} className={`${cat.color} rounded-lg p-2 text-center`}>
              <p className="font-bold">{cat.range}</p>
              <p>{cat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
