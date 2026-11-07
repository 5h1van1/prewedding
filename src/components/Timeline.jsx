import React from 'react';
import { motion } from 'framer-motion';
import { config } from '../config';
import { Shirt, Trophy, Flame, Cake, Utensils, Sparkles, Clock, Heart } from 'lucide-react';

const iconMap = {
  Shirt: Shirt,
  Trophy: Trophy,
  Flame: Flame,
  Cake: Cake,
  Utensils: Utensils,
  Sparkles: Sparkles,
};

export default function Timeline() {
  // Construct the active timeline items, inserting surprise segment if enabled in config
  const items = [...config.timeline];

  if (config.surpriseSegment && config.surpriseSegment.enabled) {
    const insertIndex = config.surpriseSegment.positionAfterStep || 3;
    items.splice(insertIndex, 0, {
      step: '★',
      time: config.surpriseSegment.time,
      title: config.surpriseSegment.title,
      description: config.surpriseSegment.description,
      icon: config.surpriseSegment.icon || 'Sparkles',
      isSurprise: true,
      highlight: true,
    });
  }

  return (
    <section id="timeline" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#fffdfa] relative overflow-hidden">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-3xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 text-amber-900 border border-amber-300 px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
            <Clock className="h-3.5 w-3.5 text-amber-600" />
            <span>Itinerary & Celebrations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
            Plan of the Evening
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto leading-relaxed">
            From team jersey handover to boundary sixers, cake cutting, and dinner under warm fairy lights.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-rose-400 before:via-amber-400 before:to-rose-400">
          {items.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Trophy;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Timeline node icon */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-2 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border-2 transition-transform group-hover:scale-110 shadow-sm ${
                    item.isSurprise
                      ? 'bg-amber-400 border-amber-300 text-stone-950 animate-pulse ring-2 ring-amber-300/40'
                      : item.highlight
                      ? 'bg-rose-600 border-rose-300 text-white shadow-rose-600/30 ring-2 ring-rose-200'
                      : 'bg-white border-amber-300 text-amber-700'
                  }`}
                >
                  <IconComponent className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>

                {/* Content Box with Elegant Wedding Styling */}
                <div
                  className={`rounded-3xl p-5 sm:p-6 transition-all ${
                    item.isSurprise
                      ? 'bg-gradient-to-r from-amber-50/90 via-white to-amber-50/70 border-2 border-amber-300 shadow-lg shadow-amber-900/5'
                      : item.highlight
                      ? 'bg-gradient-to-r from-rose-50/90 via-white to-amber-50/50 border-2 border-rose-300/80 shadow-lg shadow-rose-900/5'
                      : 'bg-white border border-stone-200/80 hover:border-amber-300 shadow-sm'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span
                      className={`inline-flex items-center gap-1.5 font-serif text-xs font-bold px-3 py-1 rounded-full ${
                        item.isSurprise
                          ? 'bg-amber-400 text-stone-950 font-bold'
                          : item.highlight
                          ? 'bg-rose-100 text-rose-900'
                          : 'bg-amber-50 text-amber-900 border border-amber-200'
                      }`}
                    >
                      <Clock className="h-3 w-3" />
                      {item.time}
                    </span>

                    {item.highlight && !item.isSurprise && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-100/70 px-2.5 py-0.5 rounded-full border border-rose-300">
                        ⚡ Main Match
                      </span>
                    )}

                    {item.isSurprise && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded-full border border-amber-400">
                        ✨ Surprise Act
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 font-serif group-hover:text-rose-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
