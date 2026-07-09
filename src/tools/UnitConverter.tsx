import { useState } from 'react';
import { ArrowRightLeft, Ruler } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const CONVERSIONS: Record<string, { units: string[]; factors: Record<string, number> }> = {
  Length: {
    units: ['Meters', 'Kilometers', 'Centimeters', 'Millimeters', 'Miles', 'Yards', 'Feet', 'Inches'],
    factors: {
      Meters: 1,
      Kilometers: 0.001,
      Centimeters: 100,
      Millimeters: 1000,
      Miles: 0.000621371,
      Yards: 1.09361,
      Feet: 3.28084,
      Inches: 39.3701,
    },
  },
  Weight: {
    units: ['Kilograms', 'Grams', 'Milligrams', 'Pounds', 'Ounces', 'Tons'],
    factors: {
      Kilograms: 1,
      Grams: 1000,
      Milligrams: 1000000,
      Pounds: 2.20462,
      Ounces: 35.274,
      Tons: 0.001,
    },
  },
  Temperature: {
    units: ['Celsius', 'Fahrenheit', 'Kelvin'],
    factors: {}, // Special handling
  },
  Area: {
    units: ['Sq Meters', 'Sq Kilometers', 'Sq Feet', 'Sq Yards', 'Acres', 'Hectares'],
    factors: {
      'Sq Meters': 1,
      'Sq Kilometers': 0.000001,
      'Sq Feet': 10.7639,
      'Sq Yards': 1.19599,
      'Acres': 0.000247105,
      'Hectares': 0.0001,
    },
  },
  Volume: {
    units: ['Liters', 'Milliliters', 'Gallons', 'Quarts', 'Pints', 'Cups'],
    factors: {
      Liters: 1,
      Milliliters: 1000,
      Gallons: 0.264172,
      Quarts: 1.05669,
      Pints: 2.11338,
      Cups: 4.22675,
    },
  },
  Speed: {
    units: ['m/s', 'km/h', 'mph', 'knots'],
    factors: {
      'm/s': 1,
      'km/h': 3.6,
      'mph': 2.23694,
      'knots': 1.94384,
    },
  },
  Data: {
    units: ['Bytes', 'KB', 'MB', 'GB', 'TB'],
    factors: {
      Bytes: 1,
      KB: 0.001,
      MB: 0.000001,
      GB: 0.000000001,
      TB: 0.000000000001,
    },
  },
};

export default function UnitConverter() {
  const [category, setCategory] = useState('Length');
  const [fromUnit, setFromUnit] = useState('Meters');
  const [toUnit, setToUnit] = useState('Feet');
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('');

  const convert = (value: string, from: string, to: string) => {
    if (!value || isNaN(Number(value))) {
      setToValue('');
      return;
    }

    const num = Number(value);

    if (category === 'Temperature') {
      let celsius: number;
      // Convert to Celsius first
      if (from === 'Celsius') celsius = num;
      else if (from === 'Fahrenheit') celsius = (num - 32) * 5 / 9;
      else celsius = num - 273.15; // Kelvin

      // Convert from Celsius to target
      let result: number;
      if (to === 'Celsius') result = celsius;
      else if (to === 'Fahrenheit') result = celsius * 9 / 5 + 32;
      else result = celsius + 273.15; // Kelvin

      setToValue(result.toFixed(4).replace(/\.?0+$/, ''));
    } else {
      const factors = CONVERSIONS[category].factors;
      const baseValue = num / factors[from];
      const result = baseValue * factors[to];
      setToValue(result.toFixed(6).replace(/\.?0+$/, ''));
    }
  };

  const handleFromChange = (value: string) => {
    setFromValue(value);
    convert(value, fromUnit, toUnit);
  };

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    const units = CONVERSIONS[cat].units;
    setFromUnit(units[0]);
    setToUnit(units[1]);
    setFromValue('1');
    convert('1', units[0], units[1]);
  };

  const handleFromUnitChange = (unit: string) => {
    setFromUnit(unit);
    convert(fromValue, unit, toUnit);
  };

  const handleToUnitChange = (unit: string) => {
    setToUnit(unit);
    convert(fromValue, fromUnit, unit);
  };

  const swap = () => {
    const tempUnit = fromUnit;
    const tempValue = toValue;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    setFromValue(tempValue);
    convert(tempValue, toUnit, tempUnit);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Ruler className="w-8 h-8 text-cyan-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Unit Converter</h1>
        <p className="text-gray-500">Convert between different units of measurement</p>
      </div>

      <AdBanner slot="header" />

      <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">
        {/* Category Selection */}
        <div className="flex flex-wrap gap-2 justify-center">
          {Object.keys(CONVERSIONS).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                category === cat
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-cyan-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Converter */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
          {/* From */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">From</label>
            <select
              value={fromUnit}
              onChange={(e) => handleFromUnitChange(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
            >
              {CONVERSIONS[category].units.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
            <input
              type="number"
              value={fromValue}
              onChange={(e) => handleFromChange(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-cyan-300"
            />
          </div>

          {/* Swap Button */}
          <button
            onClick={swap}
            className="p-3 rounded-xl bg-gray-100 hover:bg-cyan-100 transition-colors self-end mb-1.5"
          >
            <ArrowRightLeft className="w-5 h-5 text-gray-500" />
          </button>

          {/* To */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">To</label>
            <select
              value={toUnit}
              onChange={(e) => handleToUnitChange(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
            >
              {CONVERSIONS[category].units.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
            <input
              type="text"
              value={toValue}
              readOnly
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-lg font-medium bg-gray-50"
            />
          </div>
        </div>

        {/* Formula Display */}
        {fromValue && toValue && (
          <div className="text-center text-sm text-gray-500 bg-gray-50 rounded-xl py-3">
            {fromValue} {fromUnit} = {toValue} {toUnit}
          </div>
        )}
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
