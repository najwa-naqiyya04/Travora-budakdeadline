import React from 'react';
import { Navbar, LANDING_NAV } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PartnersSection } from './components/PartnersSection';
import { AboutSection } from './components/AboutSection';
import { FeaturedAccommodations } from './components/FeaturedAccommodations';
import { BenefitsSection } from './components/BenefitsSection';
import { PromoSection } from './components/PromoSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ACCOMMODATIONS } from './data/accommodations';
import { UserNavbar } from './components/UserNavbar';
import { AppProvider, useApp } from './lib/store';
import { navigate, useRoute } from './lib/router';
import { useScrollReveal } from './lib/reveal';
import Login from './pages/Login';
import Destinasi from './pages/Destinasi';
import Favorit from './pages/Favorit';
import Cari from './pages/Cari';
import Profil from './pages/Profil';
import Detail from './pages/Detail';

function Landing() {
  useScrollReveal();
  const { user, favorites, toggleFavorite, applyTo, openAccommodation } = useApp();
  const [activeSection, setActiveSection] = React.useState('home');

  // Scroll-spy: tandai menu navbar sesuai section yang sedang di layar
  React.useEffect(() => {
    const onScroll = () => {
      let current = 'home';
      for (const n of LANDING_NAV) {
        if (n.id === 'home') continue;
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = n.id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#222222] font-sans flex flex-col selection:bg-[#4F8DF7] selection:text-white">
      {/* Seamless Dark Navy Header & Hero with Zero Gap at Top */}
      <div className="bg-[#142642] pt-4 sm:pt-6 w-full relative">
        {user ? <UserNavbar active="/" /> : <Navbar onNavigate={scrollToSection} active={activeSection} />}
        <HeroSection onNavigate={() => scrollToSection('fitur')} />
      </div>

      {/* Main Landing Page Content */}
      <main className="flex-1">
        {/* Horizontal Brand Partners Bar */}
        <PartnersSection />

        {/* About Us Section ("Tentang Kami") */}
        <div id="about" className="scroll-mt-24">
          <AboutSection onExplore={() => scrollToSection('fitur')} />
        </div>

        {/* Featured Accommodations ("Fitur kami") */}
        <div id="fitur" className="scroll-mt-24">
          <FeaturedAccommodations
            accommodations={ACCOMMODATIONS}
            favorites={user ? favorites : []}
            onToggleFavorite={user ? toggleFavorite : undefined}
            onSelectAccommodation={openAccommodation}
            onApply={applyTo}
          />
        </div>

        {/* Benefits Section ("Benefit Untuk Mu!") */}
        <div id="benefit" className="scroll-mt-24">
          <BenefitsSection />
        </div>

        {/* Promotional Feature Box ("Bingung Mau Nginep Dimana?") */}
        <div id="promo" className="scroll-mt-24">
          <PromoSection
            onExplore={() => scrollToSection('fitur')}
            onSelectAccommodation={openAccommodation}
          />
        </div>

        {/* How It Works ("Bagaimana Cara Pakainya?") */}
        <div id="how-it-works" className="scroll-mt-24">
          <HowItWorksSection />
        </div>

        {/* FAQ Accordion ("Ada Yang Ingin Kau Tanyakan?") */}
        <div id="faq" className="scroll-mt-24">
          <FaqSection />
        </div>
      </main>

      {/* Footer with Wavy Bottom Graphics */}
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}

function Router() {
  const { path } = useRoute();
  const { user } = useApp();

  const detail = path.match(/^\/detail\/([\w-]+)$/);
  const isProtected = path === '/home' || path === '/favorit' || path === '/profil' || path === '/cari' || !!detail;

  React.useEffect(() => {
    if (isProtected && !user) {
      sessionStorage.setItem('travora_next', path);
      navigate('/login');
    }
  }, [isProtected, user, path]);

  if (isProtected && !user) return null;

  if (path === '/login') return <Login />;
  if (path === '/home') return <Destinasi />;
  if (path === '/favorit') return <Favorit />;
  if (path === '/cari') return <Cari />;
  if (path === '/profil') return <Profil />;
  if (detail) return <Detail id={detail[1]} />;
  return <Landing />;
}

export default function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}