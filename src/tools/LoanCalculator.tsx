import { useState, useEffect } from 'react';
import { Wallet, TrendingDown, Calendar, DollarSign } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(250000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [result, setResult] = useState({ monthlyPayment: 0, totalPayment: 0, totalInterest: 0 });

  useEffect(() => {
    calculate();
  }, [loanAmount, interestRate, loanTerm]);

  const calculate = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      const monthlyPayment = principal / numberOfPayments;
      setResult({
        monthlyPayment,
        totalPayment: principal,
        totalInterest: 0,
      });
      return;
    }

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
    });
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const payoffDate = new Date();
  payoffDate.setMonth(payoffDate.getMonth() + loanTerm * 12);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Wallet className="w-8 h-8 text-emerald-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Loan Calculator</h1>
        <p className="text-gray-500">Calculate monthly payments for mortgages, car loans & more</p>
      </div>

      <AdBanner slot="header" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-6">
          <div>
            <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Loan Amount</span>
              <span className="text-emerald-600 font-semibold">{formatMoney(loanAmount)}</span>
            </label>
            <input
              type="range"
              min="10000"
              max="1000000"
              step="5000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>$10K</span>
              <span>$1M</span>
            </div>
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Interest Rate (APR)</span>
              <span className="text-emerald-600 font-semibold">{interestRate}%</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="20"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0.5%</span>
              <span>20%</span>
            </div>
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Loan Term</span>
              <span className="text-emerald-600 font-semibold">{loanTerm} years</span>
            </label>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1 year</span>
              <span>30 years</span>
            </div>
          </div>

          {/* Quick presets */}
          <div>
            <p className="text-xs text-gray-400 mb-2">Quick presets:</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Car Loan', amount: 35000, rate: 7.5, term: 5 },
                { label: 'Home', amount: 350000, rate: 6.5, term: 30 },
                { label: 'Student', amount: 50000, rate: 5.0, term: 10 },
                { label: 'Personal', amount: 15000, rate: 12.0, term: 3 },
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => {
                    setLoanAmount(preset.amount);
                    setInterestRate(preset.rate);
                    setLoanTerm(preset.term);
                  }}
                  className="text-xs bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-700 px-3 py-1.5 rounded-full transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center">
            <p className="text-sm text-emerald-600 mb-1">Monthly Payment</p>
            <p className="text-4xl font-bold text-emerald-700">
              {formatMoney(result.monthlyPayment)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Total Payment</p>
                <p className="text-lg font-bold text-gray-800">{formatMoney(result.totalPayment)}</p>
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Total Interest</p>
                <p className="text-lg font-bold text-red-600">{formatMoney(result.totalInterest)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Payoff Date</p>
              <p className="text-lg font-bold text-gray-800">
                {payoffDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-700 mb-3">Payment Breakdown</p>
            <div className="h-4 rounded-full overflow-hidden flex">
              <div
                className="bg-emerald-500 h-full"
                style={{ width: `${(loanAmount / result.totalPayment) * 100}%` }}
              />
              <div
                className="bg-red-400 h-full"
                style={{ width: `${(result.totalInterest / result.totalPayment) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs mt-2">
              <span className="text-emerald-600">Principal: {((loanAmount / result.totalPayment) * 100).toFixed(0)}%</span>
              <span className="text-red-500">Interest: {((result.totalInterest / result.totalPayment) * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
