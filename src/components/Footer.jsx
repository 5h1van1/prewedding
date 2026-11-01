import React, { useState } from 'react';
import { config } from '../config';
import { Phone, MessageCircle, Copy, Check, Heart, Shield } from 'lucide-react';

export default function Footer({ onNavigateToAdmin }) {
  const [copied, setCopied] = useState(false);

  const handleCopyHashtag = () => {
    navigator.clipboard.writeText(config.couple.hashtag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="border-t border-rose-200/80 bg-stone-950 text-white pt-14 pb-10 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl text-center">
        {/* Couple Hashtag with Copy */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-widest text-amber-300 font-serif font-semibold block mb-2.5">
            Official Celebration Hashtag
          </span>
          <button
            onClick={handleCopyHashtag}
            className="group inline-flex items-center gap-2 rounded-2xl bg-stone-900 border border-amber-400/40 px-6 py-3 text-lg sm:text-xl font-bold text-amber-300 hover:border-amber-300 hover:bg-stone-800 transition-all shadow-lg font-serif"
          >
            <span>{config.couple.hashtag}</span>
            {copied ? (
              <span className="flex items-center gap-1 text-xs text-rose-400 font-sans font-semibold">
                <Check className="h-4 w-4" /> Copied!
              </span>
            ) : (
              <Copy className="h-4 w-4 text-stone-400 group-hover:text-amber-300 transition-colors" />
            )}
          </button>
        </div>

        {/* Organizers Contact Numbers */}
        <div className="mb-10 rounded-3xl bg-stone-900/90 border border-stone-800 p-6 max-w-lg mx-auto shadow-xl">
          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 font-serif mb-3.5">
            {config.contacts.length === 1 ? 'Questions? Contact The Coordinator' : 'Questions? Contact The Family Coordinators'}
          </h4>
          <div className={`grid ${config.contacts.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' : 'grid-cols-1 sm:grid-cols-2'} gap-3.5 text-left`}>
            {config.contacts.map((contact, i) => (
              <div
                key={i}
                className="rounded-2xl bg-stone-800/90 p-4 border border-stone-700/60 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase font-serif tracking-wider">
                    {contact.role}
                  </span>
                  <p className="text-sm font-bold text-white mt-1 font-serif">{contact.name}</p>
                  <p className="text-xs text-stone-300 font-mono mt-0.5">{contact.phone}</p>
                </div>

                <div className="mt-3.5 flex items-center gap-2 pt-2.5 border-t border-stone-700/80">
                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 py-1.5 text-xs font-semibold transition-colors"
                  >
                    <MessageCircle className="h-3 w-3" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-stone-700 hover:bg-stone-600 text-stone-200 py-1.5 text-xs font-semibold transition-colors"
                  >
                    <Phone className="h-3 w-3" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warm Wedding Sign-off */}
        <div className="flex items-center justify-center gap-2 text-sm text-stone-400 mb-6 font-serif">
          <span>Made with love for</span>
          <span className="font-bold text-white font-script text-2xl">
            {config.couple.brideName} & {config.couple.groomName}
          </span>
          <Heart className="h-4 w-4 text-rose-500 fill-rose-500 animate-pulse" />
        </div>

        {/* Admin Link */}
        <div className="border-t border-stone-900 pt-6 flex items-center justify-between text-xs text-stone-500">
          <span>© {new Date().getFullYear()} {config.couple.brideName} & {config.couple.groomName} Pre-Wedding Celebration</span>
          <button
            onClick={onNavigateToAdmin}
            className="inline-flex items-center gap-1 text-stone-400 hover:text-amber-300 transition-colors py-1 px-2.5 rounded-lg hover:bg-stone-900"
          >
            <Shield className="h-3.5 w-3.5" />
            <span>Organizer Portal</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
