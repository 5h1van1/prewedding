/**
 * =========================================================================
 * WEDDING TURF DAY - MASTER CONFIGURATION
 * =========================================================================
 * ALL personal details, dates, venue info, story captions, jersey size chart,
 * and event text can be customized right here!
 *
 * Theme: Rose & Gold Wedding Aesthetic (Amritha & Sanjay)
 */

/**
 * Helper to safely resolve local vs remote photo paths across GitHub Pages and subpaths
 */
export function resolveImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  // Convert root-relative /photos/ to ./photos/ for relative static hosting
  if (url.startsWith('/')) {
    return '.' + url;
  }
  return url;
}

export const config = {
  // Couple Information
  couple: {
    brideName: "Amritha",
    groomName: "Sanjay",
    brideNickname: "The Rose Queen",
    groomNickname: "The Golden Striker",
    hashtag: "#AmrithaAndSanjay",
    tagline: "Before we step into wedding elegance, let's play our hearts out! 💍✨",
    heroSubtitle: "A warm, joyful pre-wedding evening filled with friendly matches, laughter, custom jerseys, and dinner under glowing fairy lights.",
    // Elegant couple portrait with warm golden rose tones
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
    ringPhoto: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80",
  },

  // Event Dates & Timings (Guests can pick one preferred date)
  dates: [
    {
      id: "2026-01-28",
      shortDate: "Jan 28",
      fullDate: "Wednesday, Jan 28, 2026",
      dayName: "Wednesday",
      time: "5:00 PM – 8:00 PM",
      label: "Jan 28 (Wed)",
      isoTimestamp: "2026-01-28T17:00:00",
    },
    {
      id: "2026-01-29",
      shortDate: "Jan 29",
      fullDate: "Thursday, Jan 29, 2026",
      dayName: "Thursday",
      time: "5:00 PM – 8:00 PM",
      label: "Jan 29 (Thu)",
      isoTimestamp: "2026-01-29T17:00:00",
    },
  ],

  // Countdown target date (First event date)
  countdownTarget: "2026-01-28T17:00:00",

  // Venue Details
  venue: {
    name: "The Pavilion Arena & Sports Turf",
    shortLocation: "Bandra West, Mumbai",
    address: "Off Linking Road, Next to St. Andrew's Grounds, Bandra West, Mumbai 400050",
    googleMapsUrl: "https://maps.google.com/?q=Bandra+West+Mumbai+Cricket+Turf",
    embedQuery: "Bandra West Mumbai",
    dressCode: "Chic Athletic / Sneakers & Party Casual (Custom jerseys provided!)",
    parkingNote: "Complimentary valet and guest parking available at the arena gates.",
    turfType: "All-weather turf with golden canopy floodlights & luxury dugout lounge",
  },

  // Teams Configuration: Rose vs Gold Wedding Theme
  teams: {
    bride: {
      id: "bride",
      name: "Team Amritha",
      subtitle: "The Rose Gold Squad",
      captain: "Captain Amritha",
      colorName: "Dusty Rose & Blush",
      primaryHex: "#be185d", // Rose gold / deep blush
      secondaryHex: "#fff1f2", // Rose 50
      badgeGradient: "from-rose-500 via-pink-600 to-rose-700",
      accentBg: "bg-rose-50 border-rose-200 text-rose-900",
      icon: "Crown",
      motto: "Grace, glam, and beautiful boundary sixers!",
      jerseyDesign: "Dusty rose dri-fit with metallic gold cursive print",
    },
    groom: {
      id: "groom",
      name: "Team Sanjay",
      subtitle: "The Champagne Gold Army",
      captain: "Captain Sanjay",
      colorName: "Champagne Gold & Warm Amber",
      primaryHex: "#d97706", // Warm amber gold
      secondaryHex: "#fffbeb", // Amber 50
      badgeGradient: "from-amber-500 via-yellow-600 to-amber-700",
      accentBg: "bg-amber-50 border-amber-200 text-amber-950",
      icon: "Sparkles",
      motto: "Pure power, cheerful vibes, and unforgettable memories!",
      jerseyDesign: "Champagne gold dri-fit with rich amber lettering",
    },
  },

  // Evening Timeline with Elegant Wedding Tone
  timeline: [
    {
      step: 1,
      time: "5:00 PM",
      title: "Welcome Drinks & Jersey Gifting",
      description: "Arrival cocktails, mocktails, collecting your customized match jersey, and lacing up your sneakers.",
      icon: "Shirt",
      highlight: false,
    },
    {
      step: 2,
      time: "5:45 PM",
      title: "The Friendly Clash: Team Amritha vs Team Sanjay",
      description: "A fun-filled 8-a-side box cricket match with mystery powerplays, hilarious umpire reviews, and cheer squads!",
      icon: "Trophy",
      highlight: true,
    },
    {
      step: 3,
      time: "6:45 PM",
      title: "The Great Tug-of-War Battle",
      description: "Bride's side vs Groom's side on the center pitch! Cheerful rivalry, high spirits, and endless laughter.",
      icon: "Flame",
      highlight: false,
    },
    {
      step: 4,
      time: "7:15 PM",
      title: "Celebration Cake Cutting & Toasts",
      description: "Popping confetti, toasting to Amritha & Sanjay, and snapping unforgettable squad photos.",
      icon: "Cake",
      highlight: false,
    },
    {
      step: 5,
      time: "7:30 PM",
      title: "Dinner & Post-Match Soirée",
      description: "Gourmet food stations, sliders, live chaat, woodfired bites, music, and chilling out as wedding festivities begin.",
      icon: "Utensils",
      highlight: false,
    },
  ],

  // Hidden, easy-to-enable "Surprise Segment"
  surpriseSegment: {
    enabled: false,
    positionAfterStep: 3,
    time: "7:00 PM",
    title: "Surprise Sangeet Teaser & Dance Battle 💃🕺",
    description: "An impromptu 10-minute flashmob & couple dance face-off before we cut the cake!",
    icon: "Sparkles",
  },

  // Jersey Size Chart (Measurements in cm)
  jerseySizeChart: [
    { size: "XS", chest: 86, length: 64, shoulder: 40 },
    { size: "S", chest: 91, length: 66, shoulder: 42 },
    { size: "M", chest: 97, length: 69, shoulder: 44 },
    { size: "L", chest: 102, length: 71, shoulder: 46 },
    { size: "XL", chest: 107, length: 74, shoulder: 48 },
    { size: "XXL", chest: 112, length: 76, shoulder: 50 },
    { size: "3XL", chest: 117, length: 78, shoulder: 52 },
  ],

  // "Our Story" Photo Gallery with Moments & Captions
  gallery: [
    {
      id: 1,
      title: "How We Met",
      caption: "A chance meeting that turned into endless conversations, shared laughter, and a bond that grew stronger every day.",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80",
      tag: "The Beginning",
    },
    {
      id: 2,
      title: "Playful Weekends",
      caption: "From board games and box matches to late-night drives and coffee stops, every moment with Sanjay is a joyful adventure.",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
      tag: "Fun Memories",
    },
    {
      id: 3,
      title: "The Golden Proposal",
      caption: "Under a warm sunset sky, Sanjay asked the most magical question of all — and Amritha said the easiest 'Yes' of her life.",
      image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=80",
      tag: "She Said Yes!",
    },
    {
      id: 4,
      title: "Ready to Celebrate with You",
      caption: "Before the traditional rituals, we want to kick back, wear our jerseys, and make magical memories with our favorite people!",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
      tag: "Pre-Wedding Vibes",
    },
  ],

  // Organizers Contact Info (Footer)
  contacts: [
    {
      role: "Bride's Side Coordinator",
      name: "Divya (Bride's Sister)",
      phone: "+91 98765 43210",
      whatsapp: "919876543210",
    },
    {
      role: "Groom's Side Coordinator",
      name: "Rahul (Groom's Brother)",
      phone: "+91 91234 56789",
      whatsapp: "919123456789",
    },
  ],

  // WhatsApp Share invitation message template
  whatsAppInviteText: "Hey! 💍✨ Join us for Amritha & Sanjay's Pre-Wedding Celebration & Turf Match! Custom jerseys, friendly games, and dinner under golden lights. Pick your squad and RSVP here: ",
};
