import React from 'react';
import { motion } from 'framer-motion';
import { config, resolveImageUrl } from '../config';
import Countdown from './Countdown';
import { Calendar, MapPin, Sparkles, ChevronDown, Heart } from 'lucide-react';

export default function Hero() {
  const scrollToRsvp = () => {
    const el = document.getElementById('rsvp');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const primaryDate = config.dates[0];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-6 pb-14 sm:pb-20 bg-stone-950">
      {/* Luxurious Rose & Gold Wedding Glows & Night Stadium Floodlight Ambience (No stock photos) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep ambient dark gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c0812] via-[#0f0c0d] to-[#0a0708]" />
        
        {/* Radial rose gold floodlight glows */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-rose-600/25 via-amber-500/15 to-transparent blur-3xl rounded-full opacity-70" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-rose-700/15 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-600/15 blur-3xl rounded-full" />

        {/* Elegant geometric wedding arches */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-[520px] h-[520px] rounded-full border border-amber-300" />
          <div className="absolute w-[680px] h-[680px] rounded-full border border-rose-300 border-dashed" />
        </div>
      </div>

      {/* Romantic Golden Bokeh Glows */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-xl h-44 bg-gradient-to-r from-rose-500/15 via-amber-400/20 to-rose-400/15 blur-3xl pointer-events-none rounded-full" />

      {/* Hero Content Card */}
      <div className="relative z-10 mx-auto max-w-xl px-4 sm:px-6 text-center text-white flex flex-col items-center">
        
        {/* Pre-wedding Event Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full bg-stone-900/80 via-rose-950/70 to-amber-950/70 px-4 py-1.5 backdrop-blur-md border border-amber-300/40 mb-3 shadow-lg shadow-black/30"
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-spin-slow" />
          <span className="text-xs font-semibold tracking-widest uppercase text-amber-200">
            A Pre-Wedding Celebration
          </span>
          <Heart className="h-3 w-3 text-rose-400 fill-rose-400" />
        </motion.div>

        {/* Real Couple Portrait Halo Frame */}
        {config.couple.photoUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="relative mb-3 group"
          >
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500 blur-sm opacity-70 group-hover:opacity-100 transition duration-500" />
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-amber-300 shadow-2xl shadow-rose-950/80 bg-stone-900">
              <img
                src={resolveImageUrl(config.couple.photoUrl)}
                alt={`${config.couple.brideName} & ${config.couple.groomName}`}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-stone-900/90 text-amber-300 border border-amber-300/60 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase whitespace-nowrap shadow-md">
              💍 The Couple
            </div>
          </motion.div>
        )}

        {/* Couple Names with Prominent Capital 'A' */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mb-2"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-rose-100 to-amber-200 drop-shadow-xl leading-tight sm:leading-none">
            <span className="font-serif font-black">A</span><span className="font-script">mritha</span>{' '}
            <span className="font-serif text-3xl sm:text-5xl font-light text-amber-300 mx-1">&</span>{' '}
            <span className="font-serif font-black">S</span><span className="font-script">anjay</span>
          </h1>
          <p className="font-serif italic text-xs sm:text-sm tracking-wide text-amber-200/90 mt-2 font-light">
            {config.couple.brideNickname} <span className="text-rose-300 font-sans text-xs">♡</span> {config.couple.groomNickname}
          </p>
        </motion.div>

        {/* Event Title with Rose & Gold Tag */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl font-extrabold uppercase tracking-widest text-white mt-1 mb-2 flex items-center gap-2"
        >
          <span>The Pre-Wedding Soirée & Match</span>
          <span className="text-[11px] font-bold text-amber-300 border border-amber-400/50 bg-stone-900/80 rounded-full px-2.5 py-0.5">
            ✨ {primaryDate ? primaryDate.shortDate.toUpperCase() + ' 2027' : 'JAN 2027'}
          </span>
        </motion.h2>

        {/* Friendly Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-xs sm:text-sm text-rose-100/90 max-w-md mb-6 leading-relaxed font-normal"
        >
          {config.couple.heroSubtitle}
        </motion.p>

        {/* Key Info Badges with Rose & Gold Styling */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-6 text-xs text-rose-100"
        >
          <div className="flex items-center gap-1.5 rounded-full bg-stone-900/80 border border-amber-400/30 px-3.5 py-1.5 backdrop-blur-md shadow-md">
            <Calendar className="h-3.5 w-3.5 text-amber-400" />
            <span className="font-semibold text-white">
              {primaryDate ? primaryDate.fullDate : 'Thursday, Jan 28, 2027'}
            </span>
            <span className="text-amber-400/60">|</span>
            <span>{primaryDate ? primaryDate.time : '5:00 PM – 8:00 PM'}</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-stone-900/80 border border-rose-400/30 px-3.5 py-1.5 backdrop-blur-md shadow-md">
            <MapPin className="h-3.5 w-3.5 text-rose-400" />
            <span className="font-medium text-white">{config.venue.shortLocation}</span>
          </div>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="w-full mb-6"
        >
          <Countdown />
        </motion.div>

        {/* CTA Button: Luxury Rose Gold Gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs"
        >
          <button
            onClick={scrollToRsvp}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-rose-950/40 hover:from-rose-700 hover:to-amber-700 active:scale-98 transition-all border border-amber-300/30"
          >
            <span>Choose Your Squad & RSVP</span>
            <span className="text-base">💍</span>
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="mt-8 flex flex-col items-center text-rose-200/80 text-xs animate-bounce-subtle">
          <span className="font-serif italic">Scroll to view celebration details</span>
          <ChevronDown className="h-4 w-4 mt-0.5 text-amber-300" />
        </div>
      </div>
    </section>
  );
}
