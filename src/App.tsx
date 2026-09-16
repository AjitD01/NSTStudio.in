import React, { useState, useEffect } from 'react';
import { SceneCanvas } from './three/SceneCanvas';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { WhatWeOfferSection } from './components/WhatWeOfferSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CharacterWalker } from './components/CharacterWalker';
import { ContactSection } from './components/ContactSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { ClientsSection } from './components/ClientsSection';
import { Footer } from './components/Footer';
import { BrandDossierModal } from './components/BrandDossierModal';
import { LandingAnimation } from './components/LandingAnimation';
import { scrollManager, TOTAL_SECTIONS } from './state/scrollStore';

export const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);
  const [dossierPage, setDossierPage] = useState<number>(1);

  useEffect(() => {
    const unsubscribe = scrollManager.subscribe((curr) => {
      setScrollProgress(curr);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleOpenDossier = (page: number = 1) => {
    setDossierPage(page);
    setIsDossierOpen(true);
  };

  return (
    <div className="nst-blueprint-app">
      {/* 1. Prototype 'Story First.' Opening Animation Curtain */}
      <LandingAnimation />

      {/* 2. Global Reading Progress Ribbon */}
      <div
        className="top-progress-ribbon"
        style={{ width: `${(scrollProgress / (TOTAL_SECTIONS - 1)) * 100}%` }}
      />

      {/* 3. Sleek Floating Header with 'US 1' Pill & Floating Menu Drawer */}
      <Header onOpenDossier={handleOpenDossier} />

      {/* 4. Fixed 3D WebGL Canvas Layer (Hero Spotlight & Stardust Atmosphere) */}
      <div className="canvas-fixed-background">
        <SceneCanvas />
      </div>

      {/* 5. Continuous Blueprint HTML Sections matching Prototype Layout */}
      <main className="blueprint-main-flow">
        {/* Hero: 'New DESIGN Era.' with floating character in spotlight beam & blog cards */}
        <HeroSection onOpenDossier={handleOpenDossier} />

        {/* Brand Narrative: About NST, Story First, and The Story Behind Nikunj */}
        <AboutSection />

        {/* Service: Handheld Pro Plan Arpeggio Membership Card & Atelier Preview */}
        <ServicesSection onOpenDossier={handleOpenDossier} />

        {/* What We Offer: 4 Numbered Disciplines with Interactive Active View */}
        <WhatWeOfferSection />

        {/* Projects: Ascending Stacked Cards & Film Reel Sprocket Manifesto */}
        <ProjectsSection />

        {/* Walking Animation Transition: Stick Character Walk Loop + 'Got a Project in Mind ?' */}
        <CharacterWalker />

        {/* Contact: 'Begin your Story.' Transparent Card with Character Pose & 'ON YOU' Button */}
        <ContactSection />

        {/* Reviews: 'Our work speaks loudest...' 4.78/5 Rating & Slide Carousel */}
        <ReviewsSection />

        {/* FAQ: 'FAQ' + 'Your query not here?' Card & Accordion */}
        <FaqSection />

        {/* Clients: 'Our Valued Clients .' with Infinite Repeating Marquee */}
        <ClientsSection />

        {/* Footer: Pre-footer Emblem & Hello/Namastey Card + LYNIQ Architectural Footer */}
        <Footer onOpenDossier={handleOpenDossier} />
      </main>

      {/* 6. Holy Grail Brand Dossier Modal (26 Pages) */}
      <BrandDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        initialPage={dossierPage}
      />
    </div>
  );
};

export default App;
