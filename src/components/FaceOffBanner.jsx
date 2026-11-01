import React from 'react';
import { motion } from 'framer-motion';
import { config } from '../config';
import { Crown, Sparkles, Users, Shirt, Heart } from 'lucide-react';

export default function FaceOffBanner({ rsvps = [], onSelectTeam }) {
  const brideCount = rsvps.filter((r) => r.team === 'bride').length;
  const groomCount = rsvps.filter((r) => r.team === 'groom').length;
  const totalCount = brideCount + groomCount;

  const bridePercentage = totalCount > 0 ? Math.round((brideCount / totalCount) * 100) : 50;
  const groomPercentage = 100 - bridePercentage;

  const handleTeamClick = (teamId) => {
    if (onSelectTeam) {
      onSelectTeam(teamId);
    }
    const rsvpEl = document.getElementById('rsvp');
    if (rsvpEl) {
      rsvpEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="faceoff" className="py-14 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-[#fffaf5] via-[#fff5f6] to-[#fffaf5]">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-100/80 text-rose-900 border border-rose-300 px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
            <Heart className="h-3.5 w-3.5 text-rose-600 fill-rose-600" />
            <span>The Joyful Celebration Match</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
            {config.teams.bride.name} <span className="text-amber-500 font-script font-normal text-4xl sm:text-5xl">&</span> {config.teams.groom.name}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto leading-relaxed">
            Choose your side for the celebration match! Whether you're cheering for Amritha's Rose Squad or Sanjay's Gold Squad, custom jerseys await you!
          </p>
        </div>

        {/* Live Squad Balance Bar */}
        <div className="mb-8 rounded-3xl bg-white/90 backdrop-blur-md p-5 shadow-lg shadow-rose-900/5 border border-rose-200/60">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-2.5">
            <div className="flex items-center gap-1.5 text-rose-700">
              <Crown className="h-4 w-4 text-rose-600" />
              <span>{config.teams.bride.name} ({brideCount})</span>
            </div>
            <div className="text-[11px] font-serif uppercase tracking-widest text-amber-700 font-semibold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              LIVE LINEUP
            </div>
            <div className="flex items-center gap-1.5 text-amber-700">
              <span>({groomCount}) {config.teams.groom.name}</span>
              <Sparkles className="h-4 w-4 text-amber-500" />
            </div>
          </div>

          {/* Rose & Gold Progress Bar */}
          <div className="h-4 w-full overflow-hidden rounded-full bg-stone-100 flex p-0.5 shadow-inner border border-stone-200/70">
            <motion.div
              className="h-full rounded-l-full bg-gradient-to-r from-rose-500 to-pink-600 transition-all duration-700 relative"
              style={{ width: `${bridePercentage}%` }}
            >
              {bridePercentage > 15 && (
                <span className="absolute inset-y-0 right-2 flex items-center text-[10px] font-bold text-white drop-shadow">
                  {bridePercentage}%
                </span>
              )}
            </motion.div>
            <motion.div
              className="h-full rounded-r-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 transition-all duration-700 relative"
              style={{ width: `${groomPercentage}%` }}
            >
              {groomPercentage > 15 && (
                <span className="absolute inset-y-0 left-2 flex items-center text-[10px] font-bold text-white drop-shadow">
                  {groomPercentage}%
                </span>
              )}
            </motion.div>
          </div>
          <div className="mt-2.5 text-center text-xs text-stone-500 font-serif italic">
            {brideCount === groomCount ? (
              <span>Squad numbers are equal! Next RSVP takes the lead. ✨</span>
            ) : brideCount > groomCount ? (
              <span className="text-rose-700 font-medium">Team Amritha's Rose Squad has the bigger cheer squad right now! 🌸</span>
            ) : (
              <span className="text-amber-800 font-medium">Team Sanjay's Gold Squad is shining with strong player numbers! 👑</span>
            )}
          </div>
        </div>

        {/* Squad Cards Grid: Rose vs Gold */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Team Amritha (Dusty Rose & Blush) */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => handleTeamClick('bride')}
            className="group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-rose-200 bg-gradient-to-b from-rose-50/80 via-white to-rose-50/40 p-6 shadow-md shadow-rose-900/5 transition-all hover:border-rose-400 hover:shadow-xl"
          >
            <div className="absolute top-0 right-0 rounded-bl-2xl bg-gradient-to-r from-rose-500 to-pink-600 px-3.5 py-1 text-[11px] font-bold text-white shadow-sm">
              {config.teams.bride.captain}
            </div>

            <div className="flex items-center gap-3.5 mb-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-600 to-rose-700 text-white shadow-md shadow-rose-500/20">
                <Crown className="h-6 w-6 text-amber-200" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-rose-950 font-serif">
                  {config.teams.bride.name}
                </h3>
                <p className="text-xs font-semibold text-rose-700">
                  {config.teams.bride.subtitle}
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-600 font-serif italic mb-4">
              "{config.teams.bride.motto}"
            </p>

            <div className="space-y-2 border-t border-rose-100 pt-3.5 text-xs text-stone-600">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-stone-500">
                  <Shirt className="h-3.5 w-3.5 text-rose-500" />
                  Jersey Theme:
                </span>
                <span className="font-semibold text-rose-800">{config.teams.bride.colorName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-stone-500">
                  <Users className="h-3.5 w-3.5 text-rose-500" />
                  Confirmed Players:
                </span>
                <span className="font-bold text-rose-700 text-sm">{brideCount} Joined</span>
              </div>
            </div>

            <button className="mt-5 w-full rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 py-3 text-center text-xs font-bold text-white shadow-md shadow-rose-600/20 transition-all group-hover:from-rose-700 group-hover:to-pink-700">
              Join Team Amritha (Rose) →
            </button>
          </motion.div>

          {/* Team Sanjay (Champagne Gold & Amber) */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => handleTeamClick('groom')}
            className="group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-amber-200 bg-gradient-to-b from-amber-50/80 via-white to-amber-50/40 p-6 shadow-md shadow-amber-900/5 transition-all hover:border-amber-400 hover:shadow-xl"
          >
            <div className="absolute top-0 right-0 rounded-bl-2xl bg-gradient-to-r from-amber-500 to-yellow-600 px-3.5 py-1 text-[11px] font-bold text-stone-950 shadow-sm font-semibold">
              {config.teams.groom.captain}
            </div>

            <div className="flex items-center gap-3.5 mb-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-600 to-amber-700 text-white shadow-md shadow-amber-500/20">
                <Sparkles className="h-6 w-6 text-amber-100" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-amber-950 font-serif">
                  {config.teams.groom.name}
                </h3>
                <p className="text-xs font-semibold text-amber-700">
                  {config.teams.groom.subtitle}
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-600 font-serif italic mb-4">
              "{config.teams.groom.motto}"
            </p>

            <div className="space-y-2 border-t border-amber-100 pt-3.5 text-xs text-stone-600">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-stone-500">
                  <Shirt className="h-3.5 w-3.5 text-amber-600" />
                  Jersey Theme:
                </span>
                <span className="font-semibold text-amber-900">{config.teams.groom.colorName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-stone-500">
                  <Users className="h-3.5 w-3.5 text-amber-600" />
                  Confirmed Players:
                </span>
                <span className="font-bold text-amber-700 text-sm">{groomCount} Joined</span>
              </div>
            </div>

            <button className="mt-5 w-full rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 py-3 text-center text-xs font-bold text-stone-950 shadow-md shadow-amber-600/20 transition-all group-hover:from-amber-600 group-hover:to-yellow-700">
              Join Team Sanjay (Gold) →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
