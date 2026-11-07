import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { config, resolveImageUrl } from '../config';
import {
  Heart,
  Sparkles,
  Film,
  Volume2,
  VolumeX,
  Crown,
  Trophy,
  Camera,
} from 'lucide-react';

export default function StoryGallery() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const introVideo = config.introVideo || {
    title: 'Introducing Amritha & Sanjay',
    subtitle: 'A glimpse into our journey together before the celebration match! 💍✨',
    localVideoUrl: '/videos/intro.mp4',
  };

  const couplePhotoUrl = config.couple.photoUrl || '/photos/couple.jpg';

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <section id="gallery" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#fffaf5] relative overflow-hidden">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-rose-200/40 via-amber-200/30 to-rose-200/40 blur-3xl rounded-full pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300 px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-2.5 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-rose-600" />
            <span>Meet The Bride & Groom</span>
            <Heart className="h-3 w-3 text-rose-600 fill-rose-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
            Meet <span className="text-rose-700">Amritha</span> & <span className="text-amber-700">Sanjay</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-lg mx-auto leading-relaxed">
            From cheerful banter to forever teammates. Watch our couple introduction video below, and meet the captains before the turf clash! ✨💍
          </p>
        </div>

        {/* Side-by-Side Dual Feature: Couple Portrait + Intro Video */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto items-stretch">
          {/* Card 1: Couple Official Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col rounded-3xl bg-white shadow-xl border-2 border-rose-200/80 overflow-hidden group hover:border-rose-400 transition-all duration-300"
          >
            {/* Image Container with phone/portrait proportions */}
            <div className="relative aspect-[9/13] sm:aspect-[4/5] md:aspect-[9/13] w-full overflow-hidden bg-stone-900">
              <img
                src={resolveImageUrl(couplePhotoUrl)}
                alt={`${config.couple.brideName} & ${config.couple.groomName}`}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Bottom Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent pointer-events-none" />

              {/* Top-Left Badge */}
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="rounded-full bg-stone-900/85 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-rose-300 border border-rose-300/40 shadow-md flex items-center gap-1.5">
                  <Camera className="h-3.5 w-3.5 text-rose-300" />
                  <span>The Captains</span>
                </span>
              </div>

              {/* In-Photo Bottom Caption */}
              <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-600/90 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                    <Crown className="h-3 w-3" /> Team Amritha
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-600/90 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                    <Trophy className="h-3 w-3" /> Team Sanjay
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white drop-shadow-md">
                  Amritha & Sanjay
                </h3>
                <p className="text-xs text-rose-200/90 font-serif italic mt-0.5">
                  {config.couple.brideNickname} ♡ {config.couple.groomNickname}
                </p>
              </div>
            </div>

            {/* Photo Card Footer */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white border-t border-rose-100">
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Ready to trade vows soon, but not before an unforgettable face-off on the cricket turf! Pick your team and celebrate with us.
              </p>
              <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-stone-500 font-serif">
                  {config.couple.hashtag}
                </span>
                <span className="text-[11px] font-medium text-rose-700/80">
                  Pre-Wedding Celebration
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Couple Intro Video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col rounded-3xl bg-stone-950 shadow-2xl border-2 border-amber-400/50 overflow-hidden group hover:border-amber-400 transition-all duration-300"
          >
            {/* Video Container (aspect matches portrait / vertical reel) */}
            <div className="relative aspect-[9/13] sm:aspect-[4/5] md:aspect-[9/13] w-full overflow-hidden bg-black flex items-center justify-center">
              <video
                ref={videoRef}
                src={resolveImageUrl(introVideo.localVideoUrl)}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                controls
                className="h-full w-full object-cover"
              />

              {/* Tag Badge Top-Left */}
              <div className="absolute top-3.5 left-3.5 pointer-events-none z-10">
                <span className="rounded-full bg-stone-950/85 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-amber-300 border border-amber-300/40 shadow-md flex items-center gap-1.5">
                  <Film className="h-3.5 w-3.5 text-amber-300" />
                  <span>Intro Video</span>
                </span>
              </div>

              {/* Sound Toggle Button (Bottom-Right Floating) */}
              <button
                onClick={toggleSound}
                type="button"
                title={isMuted ? 'Click to unmute sound' : 'Click to mute sound'}
                className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 rounded-full bg-stone-900/90 hover:bg-stone-900 text-amber-300 border border-amber-400/60 px-3 py-1.5 text-xs font-bold shadow-lg backdrop-blur-md transition-all active:scale-95"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="h-4 w-4 text-rose-400" />
                    <span>Unmute</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4 text-emerald-400" />
                    <span>Mute</span>
                  </>
                )}
              </button>
            </div>

            {/* Video Card Footer Info */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-stone-950 border-t border-stone-800 text-white">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-amber-200 font-serif">
                  {introVideo.title}
                </h3>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  {introVideo.subtitle}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-stone-800/80 flex items-center justify-between">
                <span className="text-[11px] text-amber-300/80 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-amber-400" /> Amritha & Sanjay
                </span>
                <span className="text-[11px] text-stone-400 font-serif italic">
                  #AmrithaAndSanjay
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
