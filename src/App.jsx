import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FaceOffBanner from './components/FaceOffBanner';
import Timeline from './components/Timeline';
import StoryGallery from './components/StoryGallery';
import RsvpForm from './components/RsvpForm';
import Footer from './components/Footer';
import AdminView from './components/AdminView';
import RsvpSuccessModal from './components/RsvpSuccessModal';
import { subscribeToSquadCounts } from './services/db';

export default function App() {
  const [squadCounts, setSquadCounts] = useState({ bride: null, groom: null, isReady: false });
  const [activeView, setActiveView] = useState(() => {
    const hash = window.location.hash.toLowerCase();
    const pathname = window.location.pathname.toLowerCase();
    if (hash === '#admin' || hash === '#/admin' || pathname === '/admin') {
      return 'admin';
    }
    return 'home';
  });

  const [preselectedTeam, setPreselectedTeam] = useState('bride');
  const [successModalData, setSuccessModalData] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Subscribe to real-time public squad counts (stats/squads) - no guest list is read
  useEffect(() => {
    const unsubscribe = subscribeToSquadCounts((counts) => {
      setSquadCounts(counts);
    });

    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin' || hash === '#/admin') {
        setActiveView('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setActiveView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      if (unsubscribe) unsubscribe();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleNavigateToAdmin = () => {
    window.location.hash = 'admin';
    setActiveView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    window.location.hash = '';
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRsvpSuccess = (savedData) => {
    setSuccessModalData(savedData);
    setIsSuccessModalOpen(true);
  };

  // Render Admin View if on admin route
  if (activeView === 'admin') {
    return (
      <AdminView
        onBackToHome={handleBackToHome}
      />
    );
  }

  // Render Public Invitation Landing Page
  return (
    <div className="min-h-screen bg-[#fffaf5] text-stone-800 font-sans selection:bg-rose-500 selection:text-white">
      {/* Navigation */}
      <Navbar
        onNavigateToAdmin={handleNavigateToAdmin}
        activeView={activeView}
      />

      {/* Main Sections */}
      <main>
        {/* Hero Section with Couple, Countdown & Dates */}
        <Hero />

        {/* Live Team Bride vs Team Groom Face-off & Real-time Squad Counter */}
        <FaceOffBanner
          squadCounts={squadCounts}
          onSelectTeam={(teamId) => setPreselectedTeam(teamId)}
        />

        {/* Evening Schedule & Visual Timeline */}
        <Timeline />

        {/* "Our Story" Photo Carousel & Lightbox */}
        <StoryGallery />

        {/* Mobile-first RSVP Wizard with Jersey Selector */}
        <RsvpForm
          initialTeam={preselectedTeam}
          onRsvpSuccess={handleRsvpSuccess}
        />

      </main>

      {/* Footer with Hashtag, Contacts, and Admin Link */}
      <Footer onNavigateToAdmin={handleNavigateToAdmin} />

      {/* Celebratory Post-RSVP Modal with Confetti & Ticket Pass */}
      <RsvpSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        rsvpData={successModalData}
        onEditAgain={() => {
          setIsSuccessModalOpen(false);
          const rsvpEl = document.getElementById('rsvp');
          if (rsvpEl) rsvpEl.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </div>
  );
}
