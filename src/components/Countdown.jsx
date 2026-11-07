import React, { useState, useEffect } from 'react';
import { config } from '../config';

/**
 * Robust cross-browser parser for countdown target date.
 * Handles Safari / iOS WebKit quirks and ensures precise IST (+05:30) evaluation.
 */
function getTargetTimestamp(targetStr) {
  if (!targetStr) return null;
  // If ISO string with timezone offset (+05:30) or Z
  if (targetStr.includes('+') || (targetStr.includes('-') && targetStr.length > 10) || targetStr.endsWith('Z')) {
    const parsed = Date.parse(targetStr);
    if (!isNaN(parsed)) return parsed;
  }
  // Safe regex fallback: "YYYY-MM-DDTHH:mm:ss"
  const match = targetStr.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?)?/);
  if (match) {
    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1;
    const day = parseInt(match[3], 10);
    const hour = match[4] ? parseInt(match[4], 10) : 17;
    const min = match[5] ? parseInt(match[5], 10) : 0;
    const sec = match[6] ? parseInt(match[6], 10) : 0;
    // Default to Indian Standard Time (UTC+5:30)
    return Date.UTC(year, month, day, hour - 5, min - 30, sec);
  }
  const fallback = new Date(targetStr).getTime();
  return isNaN(fallback) ? null : fallback;
}

function calculateDifference(targetTimestamp) {
  if (!targetTimestamp) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: false };
  }
  const now = Date.now();
  const diff = targetTimestamp - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isOver: false };
}

export default function Countdown() {
  const targetDateStr = config.countdownTarget || config.dates[0]?.isoTimestamp || '2027-01-28T17:00:00+05:30';
  const targetTimestamp = getTargetTimestamp(targetDateStr);

  // Synchronous initial state to avoid 00:00:00:00 flash on load
  const [timeLeft, setTimeLeft] = useState(() => calculateDifference(targetTimestamp));

  useEffect(() => {
    if (!targetTimestamp) return;

    const tick = () => {
      setTimeLeft(calculateDifference(targetTimestamp));
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetTimestamp]);

  const targetDateObj = config.dates[0];

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINS', value: timeLeft.minutes },
    { label: 'SECS', value: timeLeft.seconds },
  ];

  if (timeLeft.isOver) {
    return (
      <div className="w-full max-w-sm mx-auto text-center">
        <div className="rounded-2xl bg-stone-900/90 backdrop-blur-md px-4 py-3.5 border border-amber-300/60 shadow-xl">
          <span className="font-serif text-lg sm:text-xl font-bold text-amber-300 tracking-wide">
            💍 The Celebration & Match is Live! ✨
          </span>
          <p className="text-xs text-rose-200 mt-1">
            Welcome to Amritha & Sanjay's Turf Day
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="flex items-center justify-center gap-1.5 sm:gap-2.5">
        {timeUnits.map((unit, idx) => (
          <div
            key={idx}
            className="flex-1 flex flex-col items-center justify-center rounded-2xl bg-stone-900/85 backdrop-blur-md px-2 py-2.5 sm:py-3 border border-amber-300/40 shadow-lg shadow-black/25 transition-transform hover:scale-102"
          >
            <span className="font-serif text-xl sm:text-2xl font-black text-amber-300 tracking-tight leading-none">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-rose-200/80 tracking-widest mt-1 uppercase">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2.5 text-center">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-200/90 bg-stone-900/70 px-3 py-1 rounded-full border border-amber-400/30 shadow-sm">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
          <span>
            Countdown to {targetDateObj ? targetDateObj.fullDate : 'Jan 28, 2027'} (5:00 PM)
          </span>
        </span>
      </div>
    </div>
  );
}
