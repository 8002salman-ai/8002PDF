import { useState, useEffect } from 'react';
import { Globe, Trash2, Clock } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const TIMEZONES = [
  { label: 'UTC', value: 'UTC' },
  { label: 'New York (EST/EDT)', value: 'America/New_York' },
  { label: 'Los Angeles (PST/PDT)', value: 'America/Los_Angeles' },
  { label: 'Chicago (CST/CDT)', value: 'America/Chicago' },
  { label: 'London (GMT/BST)', value: 'Europe/London' },
  { label: 'Paris (CET/CEST)', value: 'Europe/Paris' },
  { label: 'Berlin (CET/CEST)', value: 'Europe/Berlin' },
  { label: 'Dubai (GST)', value: 'Asia/Dubai' },
  { label: 'Mumbai (IST)', value: 'Asia/Kolkata' },
  { label: 'Singapore (SGT)', value: 'Asia/Singapore' },
  { label: 'Hong Kong (HKT)', value: 'Asia/Hong_Kong' },
  { label: 'Tokyo (JST)', value: 'Asia/Tokyo' },
  { label: 'Sydney (AEST/AEDT)', value: 'Australia/Sydney' },
  { label: 'Auckland (NZST/NZDT)', value: 'Pacific/Auckland' },
  { label: 'São Paulo (BRT)', value: 'America/Sao_Paulo' },
  { label: 'Karachi (PKT)', value: 'Asia/Karachi' },
];

export default function TimezoneConverter() {
  const [sourceTime, setSourceTime] = useState('');
  const [sourceDate, setSourceDate] = useState('');
  const [sourceTimezone, setSourceTimezone] = useState('UTC');
  const [targetTimezones, setTargetTimezones] = useState(['America/New_York', 'Europe/London', 'Asia/Tokyo']);
  const [currentTimes, setCurrentTimes] = useState<Record<string, string>>({});

  // Set initial time to now
  useEffect(() => {
    const now = new Date();
    setSourceDate(now.toISOString().split('T')[0]);
    setSourceTime(now.toTimeString().slice(0, 5));
  }, []);

  // Update current times
  useEffect(() => {
    const update = () => {
      const times: Record<string, string> = {};
      TIMEZONES.forEach((tz) => {
        times[tz.value] = new Date().toLocaleTimeString('en-US', {
          timeZone: tz.value,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
      });
      setCurrentTimes(times);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const convertTime = (targetTz: string) => {
    if (!sourceTime || !sourceDate) return '--:--';
    
    try {
      // Create date in source timezone
      const dateStr = `${sourceDate}T${sourceTime}:00`;
      const sourceDate2 = new Date(dateStr);
      
      // Format in target timezone
      const targetFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: targetTz,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      
      return targetFormatter.format(sourceDate2);
    } catch {
      return '--:--';
    }
  };

  const addTimezone = (tz: string) => {
    if (!targetTimezones.includes(tz)) {
      setTargetTimezones([...targetTimezones, tz]);
    }
  };

  const removeTimezone = (tz: string) => {
    setTargetTimezones(targetTimezones.filter((t) => t !== tz));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Globe className="w-8 h-8 text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Timezone Converter</h1>
        <p className="text-gray-500">Convert time between different timezones</p>
      </div>

      <AdBanner slot="header" />

      <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-6">
        {/* Source Time */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Convert From</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Date</label>
              <input
                type="date"
                value={sourceDate}
                onChange={(e) => setSourceDate(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Time</label>
              <input
                type="time"
                value={sourceTime}
                onChange={(e) => setSourceTime(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Timezone</label>
              <select
                value={sourceTimezone}
                onChange={(e) => setSourceTimezone(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              >
                {TIMEZONES.map((tz) => (
                  <option key={tz.value} value={tz.value}>{tz.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Target Timezones */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Convert To</h3>
            <div className="flex items-center gap-2">
              <select
                onChange={(e) => {
                  if (e.target.value) addTimezone(e.target.value);
                  e.target.value = '';
                }}
                className="text-sm border border-gray-200 rounded-lg px-2 py-1"
              >
                <option value="">+ Add timezone</option>
                {TIMEZONES.filter((tz) => !targetTimezones.includes(tz.value)).map((tz) => (
                  <option key={tz.value} value={tz.value}>{tz.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            {targetTimezones.map((tz) => {
              const tzInfo = TIMEZONES.find((t) => t.value === tz);
              return (
                <div key={tz} className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                  <div>
                    <p className="font-medium text-gray-700">{tzInfo?.label || tz}</p>
                    <p className="text-lg font-bold text-blue-600">{convertTime(tz)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Current time</p>
                      <p className="text-sm text-gray-500">{currentTimes[tz] || '--:--'}</p>
                    </div>
                    <button
                      onClick={() => removeTimezone(tz)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Info */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Your local time</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </p>
        </div>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
