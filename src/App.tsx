import React from 'react';
import { OpeningAnimation } from './components/OpeningAnimation';
import { PageTransition } from './components/PageTransition';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { WhatWeOfferSection } from './components/WhatWeOfferSection';
import { ProjectsSection } from './components/ProjectsSection';
import { StudioStatement } from './components/StudioStatement';
import { CharacterWalker } from './components/CharacterWalker';
import { ContactSection } from './components/ContactSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { ClientsSection } from './components/ClientsSection';
import { Footer, SignOff } from './components/Footer';
import { BlogPage } from './components/BlogPage';
import { AboutPage } from './components/AboutPage';
import { useRoute } from './state/router';
import { useRevealOnScroll } from './hooks/useInView';

/** Section order follows NST WEB PROTOTYPE REF 1 top to bottom. */
const HomePage: React.FC = () => (
  <main>
    <HeroSection />
    <ServicesSection />
    <WhatWeOfferSection />
    <ProjectsSection />
    <StudioStatement />
    <CharacterWalker />
    <ContactSection />
    <ReviewsSection />
    <FaqSection />
    <ClientsSection />
    <SignOff />
  </main>
);

export const App: React.FC = () => {
  const route = useRoute();
  useRevealOnScroll(route);

  return (
    <div className="app">
      <OpeningAnimation />
      <PageTransition />
      <Header />
      {route === 'blog' ? <BlogPage /> : route === 'about' ? <AboutPage /> : <HomePage />}
      <Footer />
    </div>
  );
};

export default App;
