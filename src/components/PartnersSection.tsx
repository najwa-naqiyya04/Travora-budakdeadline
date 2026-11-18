import React from 'react';

export const PartnersSection: React.FC = () => {
  const partnerLogos = [
    // 1. Traveloka Logo (Official Blue Bird Mascot + Bold Typography)
    {
      name: 'Traveloka',
      render: () => (
        <div className="flex items-center gap-2.5 select-none">
          <svg className="h-8 sm:h-9 w-auto" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Traveloka Bird Mascot */}
            <g transform="translate(0, 2)">
              <circle cx="18" cy="18" r="18" fill="#0194F3" />
              <path 
                d="M10 23C13 14 22 10 28 8C23 15 19 20 20 27C17 25 14 24 10 23Z" 
                fill="white" 
              />
              <path 
                d="M23 15C25 11 28 9 30 8C27 12 25 16 26 21C24 19 23 18 23 15Z" 
                fill="#80CAFF" 
              />
            </g>
            {/* traveloka wordmark */}
            <text 
              x="44" 
              y="26" 
              fill="#0194F3" 
              fontFamily="'Plus Jakarta Sans', sans-serif" 
              fontWeight="800" 
              fontSize="21" 
              letterSpacing="-0.5px"
            >
              traveloka
            </text>
          </svg>
        </div>
      )
    },

    // 2. Behance Logo (Official Adobe Behance Typography with Blue Accent)
    {
      name: 'Behance',
      render: () => (
        <div className="flex items-center gap-2 select-none">
          <svg className="h-7 sm:h-8 w-auto" viewBox="0 0 145 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Behance Wordmark */}
            <text 
              x="0" 
              y="27" 
              fill="#1769FF" 
              fontFamily="'Plus Jakarta Sans', sans-serif" 
              fontWeight="800" 
              fontSize="28" 
              letterSpacing="-0.8px"
            >
              Bēhance
            </text>
            {/* Macron bar over the e */}
            <rect x="36" y="5" width="22" height="3.5" rx="1.5" fill="#1769FF" />
          </svg>
        </div>
      )
    },

    // 3. Agoda Logo (Official 5 Colorful Dots + Clean Typography)
    {
      name: 'Agoda',
      render: () => (
        <div className="flex items-center gap-2 select-none">
          <svg className="h-8 sm:h-9 w-auto" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 5 Iconic Agoda Dots */}
            <circle cx="10" cy="8" r="4.5" fill="#E12D39" />
            <circle cx="23" cy="6" r="4.5" fill="#FFB703" />
            <circle cx="36" cy="6" r="4.5" fill="#20C963" />
            <circle cx="49" cy="8" r="4.5" fill="#1C85FF" />
            <circle cx="62" cy="11" r="4.5" fill="#9C27B0" />
            
            {/* agoda text */}
            <text 
              x="2" 
              y="32" 
              fill="#222222" 
              fontFamily="'Plus Jakarta Sans', sans-serif" 
              fontWeight="800" 
              fontSize="23" 
              letterSpacing="-0.5px"
            >
              agoda
            </text>
            <circle cx="71" cy="29" r="2.5" fill="#E12D39" />
          </svg>
        </div>
      )
    },

    // 4. Tiket.com Logo (Official Blue Text with Iconic Yellow Dot)
    {
      name: 'tiket.com',
      render: () => (
        <div className="flex items-center gap-2 select-none">
          <svg className="h-8 sm:h-9 w-auto" viewBox="0 0 155 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Yellow Circle Badge with t */}
            <circle cx="16" cy="19" r="15" fill="#FED100" />
            <text 
              x="11" 
              y="26" 
              fill="#0064D2" 
              fontFamily="'Plus Jakarta Sans', sans-serif" 
              fontWeight="900" 
              fontSize="20"
            >
              t
            </text>

            {/* tiket.com Wordmark */}
            <text 
              x="38" 
              y="26" 
              fill="#0064D2" 
              fontFamily="'Plus Jakarta Sans', sans-serif" 
              fontWeight="800" 
              fontSize="22" 
              letterSpacing="-0.5px"
            >
              tiket
            </text>
            {/* Yellow Dot */}
            <circle cx="98" cy="22" r="3.5" fill="#FED100" />
            <text 
              x="105" 
              y="26" 
              fill="#0064D2" 
              fontFamily="'Plus Jakarta Sans', sans-serif" 
              fontWeight="800" 
              fontSize="22" 
              letterSpacing="-0.5px"
            >
              com
            </text>
          </svg>
        </div>
      )
    }
  ];

  // Repeat sequence 4 times to ensure seamless infinite loop across all viewport sizes
  const repeatedTrack = [
    ...partnerLogos,
    ...partnerLogos,
    ...partnerLogos,
    ...partnerLogos
  ];

  return (
    <section data-reveal="fade" className="py-9 sm:py-12 border-b border-[#EAEAEA] bg-white overflow-hidden relative">
      {/* Subtle fade masks on left and right for smooth continuous flow */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Infinite Seamless Leftward Marquee */}
      <div className="flex w-full overflow-hidden select-none">
        <div className="animate-marquee flex items-center gap-16 sm:gap-24 lg:gap-28 shrink-0">
          {repeatedTrack.map((partner, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center shrink-0 opacity-85 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              title={partner.name}
            >
              {partner.render()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};