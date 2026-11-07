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
  },

  // Event Date & Timings
  dates: [
    {
      id: "2027-01-28",
      shortDate: "Jan 28",
      fullDate: "Thursday, Jan 28, 2027",
      dayName: "Thursday",
      time: "5:00 PM – 8:00 PM",
      label: "Jan 28, 2027 (Thu)",
      isoTimestamp: "2027-01-28T17:00:00+05:30",
    },
  ],

  // Countdown target date (Jan 28, 2027 at 5:00 PM IST)
  countdownTarget: "2027-01-28T17:00:00+05:30",

  // Official Guest WhatsApp Group for communication
  whatsappGroupUrl: "https://chat.whatsapp.com/JBXorw9WFvi7xaq06S5tkJ?s=cl&p=a&iam=2",

  // Bride & Groom Introduction Video
  introVideo: {
    title: "Introducing Amritha & Sanjay",
    subtitle: "A glimpse into our story & moments together before the celebration match!",
    googleDriveUrl: "https://drive.google.com/file/d/1ysO38QxdAXsJpIKa_J9XkUM6DWtPpf9N/view?usp=drive_link",
    embedUrl: "https://drive.google.com/file/d/1ysO38QxdAXsJpIKa_J9XkUM6DWtPpf9N/preview",
    localVideoUrl: "", // Optional local mp4 fallback if added to public/photos/
  },

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

  // Organizers Contact Info (Footer)
  contacts: [
    {
      role: "Groom's Brother & Coordinator",
      name: "Sager Prasad",
      phone: "+91 88484 85363",
      whatsapp: "918848485363",
    },
  ],

  // WhatsApp Share invitation message template
  whatsAppInviteText: "Hey! 💍✨ Join us for Amritha & Sanjay's Pre-Wedding Celebration & Turf Match! Custom jerseys, friendly games, and dinner under golden lights. Pick your squad and RSVP here: ",
};
