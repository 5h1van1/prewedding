import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config, resolveImageUrl } from '../config';
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Film,
  Image,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export default function StoryGallery() {
  const [activeTab, setActiveTab] = useState('video'); // 'video' | 'photos'
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const gallery = config.gallery || [];
  const introVideo = config.introVideo || {
    title: 'Introducing Amritha & Sanjay',
    subtitle: 'A glimpse into our journey together — from friends to forever teammates 💍✨',
    googleDriveUrl:
      'https://drive.google.com/file/d/1ysO38QxdAXsJpIKa_J9XkUM6DWtPpf9N/view?usp=drive_link',
    embedUrl: 'https://drive.google.com/file/d/1ysO38QxdAXsJpIKa_J9XkUM6DWtPpf9N/preview',
    localVideoUrl: '',
  };

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const openLightbox = (index) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  return (
    <section id="gallery" className="py-12 sm:py-16 px-4 sm:px-6 bg-[#fffaf5]">
      <div className="mx-auto max-w-4xl">
        {/* Section Header: Introducing the Bride & Groom */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300 px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-rose-600" />
            <span>Introducing The Bride & Groom</span>
            <Heart className="h-3 w-3 text-rose-600 fill-rose-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
            Meet <span className="text-rose-700">Amritha</span> & <span className="text-amber-700">Sanjay</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
            From friendly turf bickering to forever teammates. Watch our couple introduction video & cherish our journey!
          </p>
        </div>

        {/* View Switcher Tabs: Video Introduction vs Photo Moments */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
              activeTab === 'video'
                ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-rose-900/20 scale-102 ring-2 ring-rose-400/30'
                : 'bg-white text-stone-700 border border-stone-200 hover:border-rose-300 hover:bg-rose-50/50'
            }`}
          >
            <Film className="h-4 w-4" />
            <span>Couple Video Intro</span>
            <span className="text-[10px] uppercase tracking-wider bg-black/20 px-1.5 py-0.5 rounded-full">Loop</span>
          </button>

          <button
            onClick={() => setActiveTab('photos')}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
              activeTab === 'photos'
                ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-rose-900/20 scale-102 ring-2 ring-rose-400/30'
                : 'bg-white text-stone-700 border border-stone-200 hover:border-rose-300 hover:bg-rose-50/50'
            }`}
          >
            <Image className="h-4 w-4" />
            <span>Photo Memories</span>
            <span className="text-[10px] text-stone-500 font-normal">({gallery.length})</span>
          </button>
        </div>

        {/* TAB 1: Video Player on Loop (Introducing the Bride and Groom) */}
        {activeTab === 'video' && (
          <div className="relative overflow-hidden rounded-3xl bg-stone-950 shadow-2xl border-2 border-amber-400/30 p-2 sm:p-4 animate-in fade-in zoom-in-95 duration-200">
            {/* Ambient romantic glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-rose-500/15 blur-3xl pointer-events-none rounded-full" />

            {/* Video Container */}
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
                  <Sparkles className="h-3 w-3 text-amber-300 animate-spin-slow" />
                  <span>Introducing Amritha & Sanjay</span>
                </span>
              </div>

              {/* External Link Top-Right */}
              <a
                href={introVideo.googleDriveUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open video in Google Drive"
                className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-black/70 hover:bg-black/90 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md transition-colors border border-white/20 shadow-md"
              >
                <span>Drive</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Video Footer Caption */}
            <div className="mt-3.5 px-3 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-stone-800">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-amber-100 font-serif">
                  {introVideo.title}
                </h4>
                <p className="text-xs text-stone-400 mt-0.5">
                  {introVideo.subtitle}
                </p>
              </div>

              <a
                href={introVideo.googleDriveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline shrink-0"
              >
                <span>Open in Full Screen (Drive)</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* TAB 2: Photo Carousel Gallery */}
        {activeTab === 'photos' && (
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl border border-rose-200/80 p-2 sm:p-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl bg-stone-950">
              <AnimatePresence mode="wait">
                <motion.img
                  key={carouselIndex}
                  src={resolveImageUrl(gallery[carouselIndex]?.image)}
                  alt={gallery[carouselIndex]?.title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="h-full w-full object-cover cursor-pointer"
                  onClick={() => openLightbox(carouselIndex)}
                />
              </AnimatePresence>

              {/* Gradient Overlay for Caption readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Tag badge */}
              <div className="absolute top-3 left-3">
                <span className="rounded-full bg-stone-900/80 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-amber-300 border border-amber-300/30">
                  {gallery[carouselIndex]?.tag}
                </span>
              </div>

              {/* Lightbox Trigger button */}
              <button
                onClick={() => openLightbox(carouselIndex)}
                className="absolute top-3 right-3 rounded-full bg-black/60 p-2 text-white hover:bg-black/90 transition-colors backdrop-blur-md"
                title="Expand photo"
              >
                <Maximize2 className="h-4 w-4" />
              </button>

              {/* Bottom Caption */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
                <h3 className="text-lg sm:text-xl font-bold font-serif drop-shadow-sm">
                  {gallery[carouselIndex]?.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-200 mt-1 line-clamp-2 drop-shadow font-normal">
                  {gallery[carouselIndex]?.caption}
                </p>
              </div>

              {/* Nav Arrows */}
              <button
                onClick={handlePrev}
                aria-label="Previous slide"
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/80 active:scale-95 transition-all"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next slide"
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/80 active:scale-95 transition-all"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Carousel Dots & Thumbnails Strip */}
            <div className="mt-4 flex items-center justify-between px-2">
              <div className="flex items-center gap-1.5">
                {gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      carouselIndex === i ? 'w-7 bg-gradient-to-r from-rose-600 to-amber-500' : 'w-2 bg-stone-300'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <span className="text-xs font-serif italic text-stone-500">
                Moment {carouselIndex + 1} of {gallery.length}
              </span>
            </div>

            {/* Small thumbnail previews */}
            <div className="mt-3 grid grid-cols-4 gap-2">
              {gallery.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setCarouselIndex(i)}
                  className={`relative aspect-video overflow-hidden rounded-xl border-2 transition-all ${
                    carouselIndex === i
                      ? 'border-rose-600 ring-2 ring-rose-400/30 scale-102'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={resolveImageUrl(item.image)}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal for Photo expansion */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-lg"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
              aria-label="Close Lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            <div
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={resolveImageUrl(gallery[activeLightboxIndex]?.image)}
                alt={gallery[activeLightboxIndex]?.title}
                className="max-h-[75vh] w-full rounded-2xl object-contain mx-auto shadow-2xl"
              />
              <div className="mt-4 rounded-xl bg-stone-900/90 p-4 text-white border border-stone-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {gallery[activeLightboxIndex]?.tag}
                  </span>
                  <span className="text-xs text-stone-400 font-mono">
                    {activeLightboxIndex + 1} / {gallery.length}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-serif">
                  {gallery[activeLightboxIndex]?.title}
                </h3>
                <p className="text-sm text-stone-300 mt-1">
                  {gallery[activeLightboxIndex]?.caption}
                </p>
              </div>

              {/* Lightbox prev / next */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightboxIndex((prev) =>
                    prev === 0 ? gallery.length - 1 : prev - 1
                  );
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightboxIndex((prev) =>
                    prev === gallery.length - 1 ? 0 : prev + 1
                  );
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
