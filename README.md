# 💍 Amritha & Sanjay: Turf Day — Pre-Wedding Invitation & RSVP

> **"A job that could have easily been done using a simple Google Form, but we wanted to complicate things because why not?"** 🏏✨

This is a fun project made together with my friend **Sager** for his brother's pre-wedding celebration. Enjoy the work we did, because we clearly didn't want to study during exam study holidays lol! 📚🚫

👉 **Live site:** hosted on Cloudflare Workers (project `amrithawedsanjay`). Organizer portal: add `/#admin` to the site URL.

---

## 📖 The Story

Instead of sending out a boring Google Form link, we built a full-fledged, mobile-first luxury wedding invitation web app themed in **Rose & Gold** with sporty cricket turf vibes. It gets shared over WhatsApp, looks stunning on phones, and collects RSVPs in real time straight into Firebase Cloud Firestore.

### 🏏 The Match & Celebration Lineup
- **Event:** Amritha & Sanjay: Turf Day
- **Date:** Thursday, January 28, 2027 (5:00 PM – 8:00 PM)
- **Venue:** Location details provided by coordinators via WhatsApp group
- **Schedule:**
  1. Arrival & Team Jersey Handover
  2. The Friendly Clash: **Team Amritha (Rose)** vs **Team Sanjay (Gold)**
  3. The Great Tug-of-War Battle on center turf
  4. Celebration Cake Cutting & Toasts
  5. Dinner & Post-Match Soirée

---

## ✨ Features

- **📱 Mobile-First & WhatsApp Ready:** Built for 375px+ mobile viewports with fast load times and custom Open Graph meta tags so WhatsApp previews show the couple photo and event teaser text.
- **🌸 Luxury Rose & Gold Theme:** Dusty rose and champagne gold gradients, elegant typography (*Great Vibes*, *Playfair Display*, and *Plus Jakarta Sans*), subtle animations, and celebratory confetti.
- **🔥 Live Squad Face-Off Banner:** Real-time scoreboard showing how many guests have drafted into Team Amritha vs Team Sanjay. Reads a public counter document (`stats/squads`), never the guest list.
- **📋 Seamless Multi-Step RSVP Form:**
  1. Full Name input
  2. Squad selection (Team Amritha in Rose Gold vs Team Sanjay in Champagne Gold)
  3. "Custom jersey available. Do you need one?" (Yes / No toggle)
  4. Jersey Size Selector (S, M, L, XL, XXL) with an interactive **Size Chart Modal** in inches.
- **🎟️ Celebratory Confirmation Pass:**
  - Full-screen confetti cannon.
  - Digital personalized match ticket pass with guest name, squad badge, match date, and jersey size.
  - One-click **"Add to Calendar"** (.ics file download & Google Calendar link).
  - One-click **"Join Official WhatsApp Group"** for live coordinator updates and announcements.
- **🛡️ Organizer Admin Portal (`/#admin`):**
  - Secured by **Firebase Email/Password Authentication** restricted to the authorized organizer UID.
  - Live analytics cards: Total Guests, squad balance, and jersey counts.
  - **Vendor Jersey Tally Matrix:** Size-by-size breakdown (XS through 3XL) ready for ordering.
  - Search guests, filter by squad/date/jersey, and one-click **"Export CSV"**.
  - Manual guest addition and inline guest editor.
- **☁️ Cloud Firestore Real-Time Database:**
  - Every guest submission is saved to the `rsvps` collection in Firebase Firestore.
  - Secured with custom Firestore rules: public create-only with schema & server timestamp validation, and authenticated admin-only read/update/delete. The only public read is `stats/squads` (two squad totals, no guest data); the public can raise it only by +1 together with a real RSVP.
  - Resilient local fallback store for offline testing.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, Lucide Icons, Canvas Confetti
- **Backend / Database:** Firebase Cloud Firestore (v10.14.1 modular SDK)
- **Authentication:** Firebase Email/Password Authentication
- **Hosting:** Cloudflare Workers (Git-connected builds)

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/5h1van1/prewedding.git
cd prewedding
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser (switch to Mobile Device Mode in DevTools at 375px).

### 3. Build for Production
```bash
npm run build
```

### Deploying
1. Cloudflare: set VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID and VITE_FIREBASE_APP_ID under "Build variables and secrets", then rebuild (Vite reads them at build time).
2. Publish firestore.rules in Firebase Console > Firestore Database > Rules (Cloudflare does not deploy rules).
3. After the first deploy, sign in at /#admin and press "Recount" once to create/refresh stats/squads.

---

## ⚙️ Customization (`src/config.js`)

All event details, names, photos, timeline items, and size charts live in a single centralized file: [`src/config.js`](file:///src/config.js).

- **Couple Details:** Names, nicknames, hashtag (`#AmrithaAndSanjay`), cover photo.
- **Event Date & Venue:** Timings, coordinator group chat location notice.
- **Squads:** Team names, captain titles, color hex codes, and mottos.
- **Jersey Size Chart:** Chest, length, sleeve length, and shoulder measurements in inches.
- **Timeline & Surprise Segment:** Easily enable a surprise sangeet teaser or dance battle slot.

---

## 👥 Authors & Credits

Made with lots of fun, caffeine, and zero desire to study for exams:
- **Shivani** ([@5h1van1](https://github.com/5h1van1))
- **Sager Prasad** ([@Sagerprasad](https://github.com/Sagerprasad))
