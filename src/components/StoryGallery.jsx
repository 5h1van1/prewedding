import React from 'react';
import { motion } from 'framer-motion';
import { config, resolveImageUrl } from '../config';
import { Heart, Sparkles, ExternalLink, Film } from 'lucide-react';

export default function StoryGallery() {
  const introVideo = config.introVideo || {
    title: 'Introducing Amritha & Sanjay',
    subtitle: 'A glimpse into our journey together — from friends to forever teammates 💍✨',
    googleDriveUrl:
      'https://drive.google.com/file/d/1ysO38QxdAXsJpIKa_J9XkUM6DWtPpf9N/view?usp=drive_link',
    embedUrl: 'https://drive.google.com/file/d/1ysO38QxdAXsJpIKa_J9XkUM6DWtPpf9N/preview',
    localVideoUrl: '',
  };

  return (
    <section id="gallery" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#fffaf5] relative">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300 px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-rose-600" />
            <span>Introducing The Bride & Groom</span>
            <Heart className="h-3 w-3 text-rose-600 fill-rose-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
            Meet <span className="text-rose-700">Amritha</span> & <span className="text-amber-700">Sanjay</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto leading-relaxed">
            From playful friendly bickering to forever teammates. Watch our official couple introduction video! ✨
          </p>
        </div>

        {/* Video Player Theater Card playing on loop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-stone-950 shadow-2xl border-2 border-amber-400/40 p-2.5 sm:p-5"
        >
          {/* Subtle Ambient Golden / Rose Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-36 bg-gradient-to-r from-rose-500/20 via-amber-400/25 to-rose-500/20 blur-3xl pointer-events-none rounded-full" />

          {/* Video Container (16:9 on desktop, mobile responsive) */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-black shadow-inner flex items-center justify-center">
            {introVideo.localVideoUrl ? (
              <video
                src={resolveImageUrl(introVideo.localVideoUrl)}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="h-full w-full object-cover"
              />
            ) : (
              <iframe
                src={introVideo.embedUrl}
                title={introVideo.title}
                className="h-full w-full border-0 rounded-2xl"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            )}

            {/* Tag Badge Top-Left */}
            <div className="absolute top-3 left-3 pointer-events-none z-10">
              <span className="rounded-full bg-stone-950/85 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-amber-300 border border-amber-300/40 shadow-md flex items-center gap-1.5">
                <Film className="h-3.5 w-3.5 text-amber-300" />
                <span>Amritha & Sanjay • Couple Video</span>
              </span>
            </div>

            {/* Direct Drive Button Top-Right */}
            <a
              href={introVideo.googleDriveUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open video in Google Drive"
              className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-black/75 hover:bg-black px-3.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md transition-all border border-white/20 shadow-md"
            >
              <span>Watch on Drive</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Video Card Footer Info */}
          <div className="mt-4 px-2 sm:px-3 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-stone-800">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-amber-200 font-serif">
                {introVideo.title}
              </h3>
              <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                {introVideo.subtitle}
              </p>
            </div>

            <a
              href={introVideo.googleDriveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/40 px-3.5 py-2 text-xs font-bold text-amber-300 transition-colors shrink-0 self-start sm:self-center"
            >
              <span>Open in Full Screen (Drive)</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
