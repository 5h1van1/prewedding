import React from 'react';
import { config } from '../config';
import { MapPin, Car, Sparkles, Compass, Heart, MessageCircle, ExternalLink } from 'lucide-react';

export default function VenueSection() {
  const whatsappUrl = config.whatsappGroupUrl || 'https://chat.whatsapp.com/JBXorw9WFvi7xaq06S5tkJ?s=cl&p=a&iam=2';

  return (
    <section id="venue" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#fffdfa] relative">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-100/80 text-rose-900 border border-rose-300 px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
            <Compass className="h-3.5 w-3.5 text-rose-600" />
            <span>Venue & Event Information</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
            The Celebration Arena
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto leading-relaxed">
            All-weather turf under golden canopy floodlights, luxury dugout seating, and complimentary guest parking.
          </p>
        </div>

        {/* Venue Information Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Details Column with Rose & Gold Contrast */}
          <div className="flex flex-col justify-between rounded-3xl bg-stone-900 p-6 sm:p-8 text-white shadow-xl border border-amber-400/20">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 text-amber-200 px-3 py-1 text-xs font-semibold mb-4 border border-amber-400/30">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span>Under The Golden Lights</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight font-serif">
                {config.venue.name}
              </h3>

              {/* Coordinator Location Notice */}
              <div className="mt-4 rounded-2xl bg-stone-800/80 border border-amber-400/30 p-4">
                <div className="flex items-start gap-2.5 text-sm text-amber-200">
                  <MapPin className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider font-serif">
                      Location Details
                    </h4>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      Exact venue location and Google Maps pin will be provided directly by the coordinators via the official WhatsApp group chat.
                    </p>
                  </div>
                </div>
              </div>

              {/* Match Day Essentials */}
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

            {/* Direct WhatsApp Group Button for Venue Details */}
            <div className="mt-8 pt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-950/40 hover:from-emerald-700 hover:to-green-700 active:scale-98 transition-all border border-emerald-400/30"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Join Group for Location Updates</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-80" />
              </a>
            </div>
          </div>

          {/* Aesthetic Motif Column */}
          <div className="relative min-h-[300px] overflow-hidden rounded-3xl border border-rose-200 bg-gradient-to-br from-[#fff1f2] via-[#fffaf5] to-[#fef3c7] shadow-md flex flex-col justify-between p-6">
            {/* Elegant Wedding Motif Decor */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-dashed border-rose-300 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-amber-400/50 rounded-full" />
            </div>

            {/* Floating Tag */}
            <div className="relative z-10 self-start rounded-2xl bg-white/95 px-4 py-2 text-xs font-bold text-stone-800 shadow-lg backdrop-blur-md flex items-center gap-2 border border-rose-200">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-serif">Private Pre-Wedding Turf</span>
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
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-stone-900/80 text-amber-200 px-3.5 py-1 text-xs font-semibold backdrop-blur-sm">
                <MapPin className="h-3.5 w-3.5 text-rose-400" />
                <span>Location Pin Sent via WhatsApp</span>
              </div>
            </div>

            {/* Bottom Group Action Pill */}
            <div className="relative z-10 self-end w-full">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl bg-white/95 px-4 py-2.5 text-xs font-bold text-emerald-800 shadow-md backdrop-blur-md hover:bg-white transition-all flex items-center justify-center gap-2 border border-emerald-200"
              >
                <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                <span>Get Location from Coordinators</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
