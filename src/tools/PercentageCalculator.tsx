import { useState } from 'react';
import { Percent, ArrowRight } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function PercentageCalculator() {
  // What is X% of Y?
  const [whatPercent, setWhatPercent] = useState(25);
  const [whatOf, setWhatOf] = useState(200);

  // X is what % of Y?
  const [isWhat, setIsWhat] = useState(50);
  const [isWhatOf, setIsWhatOf] = useState(200);

  // Percentage change
  const [changeFrom, setChangeFrom] = useState(100);
  const [changeTo, setChangeTo] = useState(125);

  // Percentage increase/decrease
  const [increaseValue, setIncreaseValue] = useState(100);
  const [increasePercent, setIncreasePercent] = useState(20);
  const [operation, setOperation] = useState<'increase' | 'decrease'>('increase');

  // Tip calculator
  const [billAmount, setBillAmount] = useState(50);
  const [tipPercent, setTipPercent] = useState(15);
  const [splitCount, setSplitCount] = useState(1);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Percent className="w-8 h-8 text-violet-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Percentage Calculator</h1>
        <p className="text-gray-500">Calculate percentages easily</p>
      </div>

      <AdBanner slot="header" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* What is X% of Y? */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">What is X% of Y?</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-gray-600">What is</span>
            <input
              type="number"
              value={whatPercent}
              onChange={(e) => setWhatPercent(Number(e.target.value))}
              className="w-20 border border-gray-200 rounded-lg px-3 py-2 text-center text-lg font-medium"
            />
            <span className="text-gray-600">% of</span>
            <input
              type="number"
              value={whatOf}
              onChange={(e) => setWhatOf(Number(e.target.value))}
              className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-center text-lg font-medium"
            />
            <span className="text-gray-600">?</span>
          </div>
          <div className="mt-4 p-4 bg-violet-50 rounded-xl">
            <p className="text-sm text-gray-500">Answer:</p>
            <p className="text-3xl font-bold text-violet-600">
              {((whatPercent / 100) * whatOf).toFixed(2)}
            </p>
          </div>
        </div>

        {/* X is what % of Y? */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">X is what % of Y?</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="number"
              value={isWhat}
              onChange={(e) => setIsWhat(Number(e.target.value))}
              className="w-20 border border-gray-200 rounded-lg px-3 py-2 text-center text-lg font-medium"
            />
            <span className="text-gray-600">is what % of</span>
            <input
              type="number"
              value={isWhatOf}
              onChange={(e) => setIsWhatOf(Number(e.target.value))}
              className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-center text-lg font-medium"
            />
            <span className="text-gray-600">?</span>
          </div>
          <div className="mt-4 p-4 bg-violet-50 rounded-xl">
            <p className="text-sm text-gray-500">Answer:</p>
            <p className="text-3xl font-bold text-violet-600">
              {isWhatOf !== 0 ? ((isWhat / isWhatOf) * 100).toFixed(2) : 0}%
            </p>
          </div>
        </div>

        {/* Percentage Change */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Percentage Change</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-gray-600">From</span>
            <input
              type="number"
              value={changeFrom}
              onChange={(e) => setChangeFrom(Number(e.target.value))}
              className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-center text-lg font-medium"
            />
            <ArrowRight className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600">to</span>
            <input
              type="number"
              value={changeTo}
              onChange={(e) => setChangeTo(Number(e.target.value))}
              className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-center text-lg font-medium"
            />
          </div>
          <div className="mt-4 p-4 bg-violet-50 rounded-xl">
            <p className="text-sm text-gray-500">Change:</p>
            <p className={`text-3xl font-bold ${changeTo >= changeFrom ? 'text-green-600' : 'text-red-600'}`}>
              {changeFrom !== 0 ? (((changeTo - changeFrom) / changeFrom) * 100).toFixed(2) : 0}%
              <span className="text-lg ml-2">{changeTo >= changeFrom ? '↑' : '↓'}</span>
            </p>
          </div>
        </div>

        {/* Increase/Decrease */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Increase / Decrease</h3>
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <input
              type="number"
              value={increaseValue}
              onChange={(e) => setIncreaseValue(Number(e.target.value))}
              className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-center text-lg font-medium"
            />
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value as 'increase' | 'decrease')}
              className="border border-gray-200 rounded-lg px-3 py-2 text-gray-600"
            >
              <option value="increase">+ increase by</option>
              <option value="decrease">- decrease by</option>
            </select>
            <input
              type="number"
              value={increasePercent}
              onChange={(e) => setIncreasePercent(Number(e.target.value))}
              className="w-20 border border-gray-200 rounded-lg px-3 py-2 text-center text-lg font-medium"
            />
            <span className="text-gray-600">%</span>
          </div>
          <div className="mt-4 p-4 bg-violet-50 rounded-xl">
            <p className="text-sm text-gray-500">Result:</p>
            <p className="text-3xl font-bold text-violet-600">
              {operation === 'increase'
                ? (increaseValue * (1 + increasePercent / 100)).toFixed(2)
                : (increaseValue * (1 - increasePercent / 100)).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Tip Calculator - Full Width */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">💰 Tip Calculator</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Bill Amount</label>
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">$</span>
                <input
                  type="number"
                  value={billAmount}
                  onChange={(e) => setBillAmount(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-lg font-medium"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Tip %</label>
              <div className="flex gap-1">
                {[10, 15, 18, 20, 25].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTipPercent(t)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                      tipPercent === t ? 'bg-violet-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {t}%
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Split</label>
              <input
                type="number"
                min="1"
                value={splitCount}
                onChange={(e) => setSplitCount(Math.max(1, Number(e.target.value)))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-lg font-medium"
              />
            </div>
            <div className="bg-violet-50 rounded-xl p-4">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Tip:</span>
                <span className="font-medium">${(billAmount * (tipPercent / 100)).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Total:</span>
                <span className="font-medium">${(billAmount * (1 + tipPercent / 100)).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-violet-600 mt-2 pt-2 border-t">
                <span>Per Person:</span>
                <span>${((billAmount * (1 + tipPercent / 100)) / splitCount).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
