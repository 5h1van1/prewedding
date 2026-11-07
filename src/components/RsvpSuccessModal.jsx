import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { config } from '../config';
import { generateIcsCalendar, getGoogleCalendarUrl } from '../services/calendar';
import {
  CheckCircle2,
  Calendar,
  Share2,
  Download,
  Edit3,
  X,
  MapPin,
  Shirt,
  Trophy,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

export default function RsvpSuccessModal({ isOpen, onClose, rsvpData, onEditAgain }) {
  useEffect(() => {
    if (isOpen) {
      // Fire celebratory Rose & Gold confetti cannon!
      const count = 220;
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 9999,
        colors: ['#be185d', '#f43f5e', '#fb7185', '#d4af37', '#f59e0b', '#fef08a'],
      };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
  }, [isOpen]);

  if (!isOpen || !rsvpData) return null;

  const selectedDateObj = config.dates.find((d) => d.id === rsvpData.preferredDate) || config.dates[0];
  const isBride = rsvpData.team === 'bride';
  const teamConfig = isBride ? config.teams.bride : config.teams.groom;

  const handleDownloadIcs = () => {
    generateIcsCalendar({
      title: `${config.couple.brideName} & ${config.couple.groomName}: Pre-Wedding Celebration 💍✨`,
      description: `Pre-Wedding Celebration & Match!\nSquad: ${teamConfig.name}\nJersey: ${rsvpData.needsJersey ? rsvpData.jerseySize : 'None'}\n\nWear sneakers & party chic casuals!`,
      location: `${config.venue.name}, ${config.venue.address}`,
      dateId: rsvpData.preferredDate,
      startTime: '17:00',
      endTime: '20:00',
    });
  };

  const handleGoogleCalendar = () => {
    const url = getGoogleCalendarUrl({
      title: `${config.couple.brideName} & ${config.couple.groomName}: Pre-Wedding Celebration 💍✨`,
      description: `Pre-Wedding Celebration & Match!\nSquad: ${teamConfig.name}\nJersey: ${rsvpData.needsJersey ? rsvpData.jerseySize : 'None'}`,
      location: `${config.venue.name}, ${config.venue.address}`,
      dateId: rsvpData.preferredDate,
      startTime: '17:00',
      endTime: '20:00',
    });
    window.open(url, '_blank');
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `💍✨ Hey! I just RSVP'd for ${config.couple.brideName} & ${config.couple.groomName}'s Pre-Wedding Celebration on ${selectedDateObj.shortDate}!\nI'm on *${teamConfig.name}*! 🎉\n\nPick your squad and grab your jersey here: ${window.location.origin}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const whatsappGroupLink =
    config.whatsappGroupUrl ||
    'https://chat.whatsapp.com/JBXorw9WFvi7xaq06S5tkJ?s=cl&p=a&iam=2';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-stone-950/80 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Card with Rose & Gold Wedding Elegance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative z-10 w-full max-w-sm sm:max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl border border-rose-200/80 my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header celebration badge: Rose & Gold */}
          <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 px-6 pt-7 pb-6 text-center text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full bg-black/20 p-1.5 text-white/80 hover:bg-black/40 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10, delay: 0.1 }}
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-rose-600 shadow-xl mb-3"
            >
              <CheckCircle2 className="h-8 w-8 text-rose-600 fill-rose-100" />
            </motion.div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-serif">
              You're on the Guest Roster! 🎉
            </h3>
            <p className="text-xs text-rose-100 mt-1">
              Your RSVP is saved. We cannot wait to celebrate with you!
            </p>
          </div>

          {/* Digital Match Pass / Ticket with Rose & Gold Accents */}
          <div className="p-5 sm:p-6 bg-[#fffaf5]">
            <div className="relative rounded-3xl bg-white p-5 shadow-sm border border-rose-200/70 overflow-hidden">
              {/* Ticket Jagged Edges */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#fffaf5] border-r border-rose-200" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#fffaf5] border-l border-rose-200" />

              {/* Match Header */}
              <div className="flex items-center justify-between border-b border-dashed border-rose-200 pb-3 mb-3">
                <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                  OFFICIAL GUEST PASS
                </span>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  CONFIRMED 💍
                </span>
              </div>

              {/* Guest Name & Team */}
              <div className="mb-4">
                <span className="text-xs text-stone-400 font-serif">Guest Name</span>
                <h4 className="text-xl font-extrabold text-stone-900 leading-tight font-serif">
                  {rsvpData.name}
                </h4>

                <div className="mt-2 flex items-center gap-2">
                  <div
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-bold text-white shadow-sm ${
                      isBride
                        ? 'bg-gradient-to-r from-rose-500 to-pink-600'
                        : 'bg-gradient-to-r from-amber-500 to-yellow-600 text-stone-950 font-semibold'
                    }`}
                  >
                    <Trophy className="h-3.5 w-3.5" />
                    <span>{teamConfig.name}</span>
                  </div>
                </div>
              </div>

              {/* Match Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs border-t border-rose-100 pt-3">
                <div>
                  <span className="text-stone-400 block text-[11px] font-serif">Celebration Date</span>
                  <span className="font-bold text-stone-800 flex items-center gap-1 mt-0.5 font-serif">
                    <Calendar className="h-3.5 w-3.5 text-rose-600" />
                    {selectedDateObj.shortDate} (5-8 PM)
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px] font-serif">Custom Jersey</span>
                  <span className="font-bold text-stone-800 flex items-center gap-1 mt-0.5">
                    <Shirt className="h-3.5 w-3.5 text-amber-600" />
                    {rsvpData.needsJersey ? `Size ${rsvpData.jerseySize}` : 'No Jersey'}
                  </span>
                </div>
              </div>

              <div className="mt-3 border-t border-rose-100 pt-2 text-[11px] text-stone-500 flex items-center gap-1">
                <MapPin className="h-3 w-3 text-rose-500 shrink-0" />
                <span className="truncate">{config.venue.name}, {config.venue.shortLocation}</span>
              </div>
            </div>

            {/* Official WhatsApp Group Join Card (Primary for communication) */}
            <div className="mt-5 rounded-2xl bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100/80 p-4 border-2 border-emerald-400 shadow-md">
              <div className="flex items-center gap-2.5 text-emerald-950 font-bold text-sm font-serif">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white shrink-0 shadow-sm">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="leading-tight font-extrabold text-emerald-950">Join Our WhatsApp Group! 💬</h5>
                  <span className="text-[10px] text-emerald-700 font-sans font-semibold uppercase tracking-wider">
                    For further communication & updates
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-700 mt-2 leading-relaxed">
                Please join the official celebration WhatsApp group where match fixtures, jersey pickup details, photo drops, and further updates will be shared!
              </p>

              <a
                href={whatsappGroupLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 py-3 px-4 text-xs sm:text-sm font-extrabold text-white shadow-md shadow-emerald-900/25 hover:from-emerald-700 hover:to-green-700 active:scale-98 transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Join Official WhatsApp Group</span>
                <ExternalLink className="h-3.5 w-3.5 ml-0.5 opacity-90" />
              </a>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 space-y-2.5">
              {/* WhatsApp Share invitation */}
              <button
                onClick={handleShareWhatsApp}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <Share2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Share Invitation with Friends on WhatsApp</span>
              </button>

              {/* Calendar Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleDownloadIcs}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-stone-300 bg-white py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  <Download className="h-3.5 w-3.5 text-rose-600" />
                  <span>Download .ics</span>
                </button>
                <button
                  onClick={handleGoogleCalendar}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-stone-300 bg-white py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  <Calendar className="h-3.5 w-3.5 text-amber-600" />
                  <span>Google Cal</span>
                </button>
              </div>

              {/* Edit RSVP Button */}
              <button
                onClick={() => {
                  onClose();
                  if (onEditAgain) onEditAgain();
                }}
                className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-800 py-1 transition-colors"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>Need to adjust date or size? Edit RSVP</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
