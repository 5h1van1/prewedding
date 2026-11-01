import React, { useState } from 'react';
import { config } from '../config';
import { Menu, X, Shield, CalendarCheck, Heart } from 'lucide-react';

export default function Navbar({ onNavigateToAdmin, activeView }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (activeView === 'admin') {
      window.location.hash = '';
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      <div className="mx-auto max-w-5xl px-4 py-2.5 sm:px-6">
        <nav className="glass-panel flex items-center justify-between rounded-full px-4 py-2.5 shadow-md shadow-rose-950/5 border border-rose-200/60">
          {/* Couple Monogram / Brand */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (activeView === 'admin') {
                window.location.hash = '';
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 group"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-500 text-white shadow-sm transition-transform group-hover:scale-105">
              <Heart className="h-4 w-4 text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-script text-xl leading-none font-bold text-stone-900">
                {config.couple.brideName} & {config.couple.groomName}
              </span>
              <span className="text-[10px] tracking-wider font-serif uppercase text-rose-700 font-semibold">
                Celebration & Match 💍
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
            <button
              onClick={() => scrollToSection('faceoff')}
              className="hover:text-rose-700 transition-colors font-serif"
            >
              Squads
            </button>
            <button
              onClick={() => scrollToSection('timeline')}
              className="hover:text-rose-700 transition-colors font-serif"
            >
              Itinerary
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="hover:text-rose-700 transition-colors font-serif"
            >
              Our Moments
            </button>
            <button
              onClick={() => scrollToSection('venue')}
              className="hover:text-rose-700 transition-colors font-serif"
            >
              Venue
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {activeView === 'admin' ? (
              <button
                onClick={() => {
                  window.location.hash = '';
                }}
                className="flex items-center gap-1.5 rounded-full bg-stone-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-stone-800 transition-all"
              >
                ← Back to Invitation
              </button>
            ) : (
              <>
                <button
                  onClick={() => scrollToSection('rsvp')}
                  className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md shadow-rose-900/15 hover:from-rose-700 hover:to-amber-700 active:scale-95 transition-all"
                >
                  <CalendarCheck className="h-3.5 w-3.5 text-amber-200" />
                  <span>RSVP Now</span>
                </button>

                <button
                  onClick={onNavigateToAdmin}
                  title="Organizer Admin Portal"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                >
                  <Shield className="h-4 w-4" />
                </button>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden flex h-8 w-8 items-center justify-center rounded-full text-stone-600 hover:bg-stone-100"
                  aria-label="Toggle Navigation Menu"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mt-2 md:hidden glass-panel rounded-3xl p-4 shadow-xl border border-rose-200/80 animate-in fade-in slide-in-from-top-2 duration-200 bg-white/95">
            <div className="flex flex-col gap-2.5 text-sm font-medium text-stone-700">
              <button
                onClick={() => scrollToSection('faceoff')}
                className="text-left px-3 py-2 rounded-xl hover:bg-rose-50 flex items-center justify-between"
              >
                <span>{config.teams.bride.name} vs {config.teams.groom.name}</span>
                <span className="text-xs text-rose-600 font-semibold font-serif">Squads</span>
              </button>
              <button
                onClick={() => scrollToSection('timeline')}
                className="text-left px-3 py-2 rounded-xl hover:bg-rose-50"
              >
                Evening Itinerary & Timeline
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="text-left px-3 py-2 rounded-xl hover:bg-rose-50"
              >
                Our Moments & Story
              </button>
              <button
                onClick={() => scrollToSection('venue')}
                className="text-left px-3 py-2 rounded-xl hover:bg-rose-50"
              >
                Venue & Location Map
              </button>
              <div className="pt-2 border-t border-rose-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateToAdmin();
                  }}
                  className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1.5"
                >
                  <Shield className="h-3.5 w-3.5" />
                  <span>Organizer Admin</span>
                </button>
                <span className="text-xs text-amber-600 font-serif font-bold">{config.hashtag}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
