import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (page: string, accommodationId?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Smooth upward slide emergence animation on load
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  // 5 destination cards with progressive vertical stepping (center highest, flanks descending)
  const cards = [
    {
      title: 'Jempol Beach',
      location: 'Jawa barat , pucuk ubi',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80',
      accId: 'accommodation-009',
      rotation: '-rotate-14',
      zIndex: 10,
      offsetPercent: -34,
      bottomClass: 'bottom-[-100px] sm:bottom-[-135px] md:bottom-[-165px] lg:bottom-[-185px]',
      sizeClass: 'w-38 h-64 sm:w-52 sm:h-84 md:w-64 md:h-[400px] lg:w-72 lg:h-[450px]',
      tier: 'rise-2'
    },
    {
      title: 'Jempol Beach',
      location: 'Jawa barat , pucuk ubi',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
      accId: 'accommodation-006',
      rotation: '-rotate-7',
      zIndex: 20,
      offsetPercent: -17,
      bottomClass: 'bottom-[-60px] sm:bottom-[-80px] md:bottom-[-105px] lg:bottom-[-120px]',
      sizeClass: 'w-42 h-68 sm:w-56 sm:h-92 md:w-68 md:h-[430px] lg:w-76 lg:h-[480px]',
      tier: 'rise-1'
    },
    {
      title: 'Jempol Beach',
      location: 'Jawa barat , pucuk ubi',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      accId: 'accommodation-004',
      rotation: 'rotate-0 scale-105',
      zIndex: 30,
      offsetPercent: 0,
      bottomClass: 'bottom-[-20px] sm:bottom-[-30px] md:bottom-[-40px] lg:bottom-[-50px]', // Center is highest
      sizeClass: 'w-46 h-72 sm:w-64 sm:h-96 md:w-76 md:h-[460px] lg:w-84 lg:h-[520px]',
      tier: 'rise-0'
    },
    {
      title: 'Jempol Beach',
      location: 'Jawa barat , pucuk ubi',
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80',
      accId: 'accommodation-005',
      rotation: 'rotate-7',
      zIndex: 20,
      offsetPercent: 17,
      bottomClass: 'bottom-[-60px] sm:bottom-[-80px] md:bottom-[-105px] lg:bottom-[-120px]',
      sizeClass: 'w-42 h-68 sm:w-56 sm:h-92 md:w-68 md:h-[430px] lg:w-76 lg:h-[480px]',
      tier: 'rise-1'
    },
    {
      title: 'Jempol Beach',
      location: 'Jawa barat , pucuk ubi',
      image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1000&q=80',
      accId: 'accommodation-001',
      rotation: 'rotate-14',
      zIndex: 10,
      offsetPercent: 34,
      bottomClass: 'bottom-[-100px] sm:bottom-[-135px] md:bottom-[-165px] lg:bottom-[-185px]',
      sizeClass: 'w-38 h-64 sm:w-52 sm:h-84 md:w-64 md:h-[400px] lg:w-72 lg:h-[450px]',
      tier: 'rise-2'
    }
  ];

  return (
    <section className="relative bg-[#142642] text-white pt-10 sm:pt-16 pb-0 overflow-hidden w-full select-none">
      
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-gradient-to-b from-[#4F8DF7]/15 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Main Headline (Exact 2-line layout matching screenshot) */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.18] text-balance">
          Mulailah perjalanan seru Anda<br className="hidden sm:inline" /> untuk menjelajahi dunia
        </h1>

        {/* Supporting text matching screenshot */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
          Mulailah perjalanan seru Anda untuk menjelajahi dunia.
        </p>

        {/* NO BUTTONS - matching screenshot */}

      </div>

      {/* Larger, full-span fanned cards with center card highest and flanks stepping down */}
      <div className="relative mt-12 sm:mt-16 md:mt-20 w-full h-[260px] sm:h-[340px] md:h-[420px] lg:h-[480px] overflow-hidden flex items-end justify-center">
        <div className="hero-cards relative w-full max-w-[1440px] h-full flex items-end justify-center px-2 sm:px-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              onClick={() => onNavigate('detail', card.accId)}
              className={`hero-card ${card.tier} ${isLoaded ? 'is-loaded' : ''} absolute ${card.bottomClass} cursor-pointer group`}
              style={{
                left: `calc(50% + ${card.offsetPercent}%)`,
                transform: 'translateX(-50%)',
                zIndex: card.zIndex,
                '--fx': `${-card.offsetPercent}cqw`,
              } as React.CSSProperties}
            >
              <div 
                className={`${card.sizeClass} rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-b-0 border-white/20 shadow-2xl relative bg-slate-900 transition-all duration-300 transform group-hover:border-[#4F8DF7] group-hover:-translate-y-4 ${card.rotation}`}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Measured dark gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Destination info text matching screenshot */}
                <div className="absolute bottom-20 sm:bottom-28 md:bottom-32 left-3 sm:left-5 right-3 sm:right-5 text-left">
                  <p className="text-xs sm:text-base md:text-lg font-bold text-white group-hover:text-[#4F8DF7] transition-colors truncate">
                    {card.title}
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/80 flex items-center gap-1 mt-0.5 truncate">
                    <MapPin className="w-3 h-3 text-white/90 shrink-0" />
                    <span className="truncate">{card.location}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};