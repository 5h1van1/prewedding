import React from 'react';
import { config } from '../config';
import { MapPin, Navigation, Car, Sparkles, Compass, Heart } from 'lucide-react';

export default function VenueSection() {
  const handleOpenMaps = () => {
    window.open(config.venue.googleMapsUrl, '_blank');
  };

  return (
    <section id="venue" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#fffdfa] relative">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-100/80 text-rose-900 border border-rose-300 px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
            <Compass className="h-3.5 w-3.5 text-rose-600" />
            <span>Celebration Location</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
            The Arena & Pavilion
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto leading-relaxed">
            All-weather turf under golden canopy floodlights, luxury lounge seating, and complimentary valet parking.
          </p>
        </div>

        {/* Venue Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Details Column with Rose & Gold Wedding Dark Contrast */}
          <div className="flex flex-col justify-between rounded-3xl bg-stone-900 p-6 sm:p-8 text-white shadow-xl border border-amber-400/20">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 text-amber-200 px-3 py-1 text-xs font-semibold mb-4 border border-amber-400/30">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span>Under The Golden Lights</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight font-serif">
                {config.venue.name}
              </h3>

              <div className="mt-4 flex items-start gap-2.5 text-sm text-stone-300">
                <MapPin className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{config.venue.address}</p>
              </div>

              <div className="mt-6 space-y-3.5 border-t border-stone-800 pt-5 text-xs text-stone-300">
                <div className="flex items-center gap-2.5">
                  <Car className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>{config.venue.parkingNote}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-base">👟</span>
                  <span>{config.venue.dressCode}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles className="h-4 w-4 text-rose-400 shrink-0" />
                  <span>{config.venue.turfType}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={handleOpenMaps}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-950/40 hover:from-rose-700 hover:to-amber-700 active:scale-98 transition-all border border-amber-300/30"
              >
                <Navigation className="h-4 w-4" />
                <span>Open in Google Maps</span>
              </button>
            </div>
          </div>

          {/* Visual Map / Graphic Column with Romantic Golden Pavilion Theme */}
          <div className="relative min-h-[300px] overflow-hidden rounded-3xl border border-rose-200 bg-gradient-to-br from-[#fff1f2] via-[#fffaf5] to-[#fef3c7] shadow-md flex flex-col justify-between p-6">
            {/* Elegant Wedding Motif Decor */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-dashed border-rose-300 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-amber-400/50 rounded-full" />
            </div>

            {/* Floating Venue Tag */}
            <div className="relative z-10 self-start rounded-2xl bg-white/95 px-4 py-2 text-xs font-bold text-stone-800 shadow-lg backdrop-blur-md flex items-center gap-2 border border-rose-200">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span className="font-serif">{config.venue.shortLocation}</span>
            </div>

            {/* Center Monogram / Wedding Emblem with Capital A & S */}
            <div className="relative z-10 self-center text-center my-auto">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md border border-amber-200 text-rose-700 mb-2">
                <span className="font-serif text-lg font-black tracking-tighter text-rose-700 flex items-center justify-center">
                  <span>A</span>
                  <Heart className="h-4 w-4 text-rose-500 fill-rose-100 mx-0.5" />
                  <span>S</span>
                </span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-extrabold text-stone-800">
                <span className="text-rose-700 font-black">A</span>mritha <span className="font-script text-2xl font-normal text-amber-600">&</span> <span className="text-amber-700 font-black">S</span>anjay
              </h4>
              <p className="text-[11px] font-serif italic text-amber-800">
                Match & Celebrations Arena
              </p>
            </div>

            {/* Bottom Directions Button */}
            <div className="relative z-10 self-end w-full">
              <button
                onClick={handleOpenMaps}
                className="w-full rounded-xl bg-white/95 px-4 py-2.5 text-xs font-bold text-stone-900 shadow-md backdrop-blur-md hover:bg-white transition-all flex items-center justify-center gap-2 border border-rose-200"
              >
                <Navigation className="h-3.5 w-3.5 text-rose-600" />
                <span>Get Driving Directions</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
