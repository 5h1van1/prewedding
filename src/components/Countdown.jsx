import React, { useState, useEffect } from 'react';
import { config } from '../config';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });

  useEffect(() => {
    const target = new Date(config.countdownTarget).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isOver: false });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINS', value: timeLeft.minutes },
    { label: 'SECS', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="flex items-center justify-center gap-1.5 sm:gap-2.5">
        {timeUnits.map((unit, idx) => (
          <div
            key={idx}
            className="flex-1 flex flex-col items-center justify-center rounded-2xl bg-stone-900/85 backdrop-blur-md px-2 py-2.5 sm:py-3 border border-amber-300/40 shadow-lg shadow-black/25"
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
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-200/90 bg-stone-900/70 px-3 py-0.5 rounded-full border border-amber-400/30">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
          <span>Countdown to the Wedding Celebrations</span>
        </span>
      </div>
    </div>
  );
}
