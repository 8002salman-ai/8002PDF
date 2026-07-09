import { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function EbayCalculator() {
  const [salePrice, setSalePrice] = useState(100);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [shippingCost, setShippingCost] = useState(5);
  const [itemCost, setItemCost] = useState(30);
  const [ebayFeePercent, setEbayFeePercent] = useState(13.25);
  const [paypalFeePercent, setPaypalFeePercent] = useState(2.9);
  const [paypalFeeFixed, setPaypalFeeFixed] = useState(0.30);
  const [promotedPercent, setPromotedPercent] = useState(0);
  
  const [results, setResults] = useState({
    totalRevenue: 0,
    ebayFee: 0,
    paymentFee: 0,
    promotedFee: 0,
    totalFees: 0,
    netProfit: 0,
    profitMargin: 0,
    roi: 0,
  });

  useEffect(() => {
    calculateProfit();
  }, [salePrice, shippingCharge, shippingCost, itemCost, ebayFeePercent, paypalFeePercent, paypalFeeFixed, promotedPercent]);

  const calculateProfit = () => {
    const totalRevenue = salePrice + shippingCharge;
    const ebayFee = (totalRevenue * ebayFeePercent) / 100;
    const paymentFee = (totalRevenue * paypalFeePercent) / 100 + paypalFeeFixed;
    const promotedFee = (salePrice * promotedPercent) / 100;
    const totalFees = ebayFee + paymentFee + promotedFee;
    const totalCosts = itemCost + shippingCost;
    const netProfit = totalRevenue - totalFees - totalCosts;
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
    const roi = totalCosts > 0 ? (netProfit / totalCosts) * 100 : 0;

    setResults({
      totalRevenue,
      ebayFee,
      paymentFee,
      promotedFee,
      totalFees,
      netProfit,
      profitMargin,
      roi,
    });
  };

  const formatMoney = (amount: number) => {
    return '$' + amount.toFixed(2);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Calculator className="w-8 h-8 text-yellow-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">eBay Fee Calculator</h1>
        <p className="text-gray-500">Calculate your profit after eBay fees and costs</p>
      </div>

      <AdBanner slot="header" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Side */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Sale Details</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price ($)</label>
              <input
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Charged ($)</label>
              <input
                type="number"
                value={shippingCharge}
                onChange={(e) => setShippingCharge(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 pt-2">Your Costs</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Cost ($)</label>
              <input
                type="number"
                value={itemCost}
                onChange={(e) => setItemCost(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Actual Shipping ($)</label>
              <input
                type="number"
                value={shippingCost}
                onChange={(e) => setShippingCost(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 pt-2">Fee Settings</h3>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">eBay Final Value Fee (%)</label>
              <input
                type="number"
                value={ebayFeePercent}
                onChange={(e) => setEbayFeePercent(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
                min="0"
                max="100"
                step="0.01"
              />
              <p className="text-xs text-gray-400 mt-1">Standard: 13.25% for most categories</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Fee (%)</label>
                <input
                  type="number"
                  value={paypalFeePercent}
                  onChange={(e) => setPaypalFeePercent(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">+ Fixed Fee ($)</label>
                <input
                  type="number"
                  value={paypalFeeFixed}
                  onChange={(e) => setPaypalFeeFixed(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Promoted Listing Fee (%)</label>
              <input
                type="number"
                value={promotedPercent}
                onChange={(e) => setPromotedPercent(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
          </div>
        </div>

        {/* Results Side */}
        <div className="space-y-4">
          {/* Profit Card */}
          <div className={`rounded-2xl p-6 ${results.netProfit >= 0 ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Net Profit</h3>
              {results.netProfit < 0 && <AlertCircle className="w-5 h-5 text-red-500" />}
            </div>
            <p className={`text-4xl font-bold ${results.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatMoney(results.netProfit)}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Profit Margin</p>
                <p className={`font-semibold ${results.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {results.profitMargin.toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-gray-500">ROI</p>
                <p className={`font-semibold ${results.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {results.roi.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Breakdown
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Total Revenue</span>
                <span className="font-medium text-green-600">{formatMoney(results.totalRevenue)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">eBay Fee ({ebayFeePercent}%)</span>
                <span className="font-medium text-red-500">-{formatMoney(results.ebayFee)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Payment Processing</span>
                <span className="font-medium text-red-500">-{formatMoney(results.paymentFee)}</span>
              </div>
              {results.promotedFee > 0 && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Promoted Listing</span>
                  <span className="font-medium text-red-500">-{formatMoney(results.promotedFee)}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Item Cost</span>
                <span className="font-medium text-red-500">-{formatMoney(itemCost)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Shipping Cost</span>
                <span className="font-medium text-red-500">-{formatMoney(shippingCost)}</span>
              </div>
              <div className="flex justify-between py-3 bg-gray-50 -mx-6 px-6 font-semibold">
                <span>Total Fees</span>
                <span className="text-red-500">-{formatMoney(results.totalFees)}</span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5" />
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-1">Tips to increase profit:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-600">
                  <li>Offer free shipping but add cost to item price</li>
                  <li>Look for lower fee categories</li>
                  <li>Consider eBay store subscription for lower fees</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
