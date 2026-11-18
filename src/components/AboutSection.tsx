import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onExplore: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onExplore }) => {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          
          {/* Left Text Column: Left-aligned, wide, with generous spacing away from images */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-7">
            
            {/* Title: "Tentang Kami" (left-aligned) */}
            <h2 data-reveal="left" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#142642] tracking-tight text-left">
              Tentang Kami
            </h2>
            
            {/* Description: Formatted in bold, left-aligned, comfortable width */}
            <p data-reveal="left" style={{ '--rd': '.12s' } as React.CSSProperties} className="text-base sm:text-lg text-neutral-800 leading-relaxed font-bold max-w-xl lg:max-w-2xl text-left">
              Kami membantu backpacker menjelajahi tempat baru dengan biaya akomodasi lebih terjangkau, 
              mendapatkan pengalaman lokal, dan membangun koneksi melalui pertukaran kontribusi dengan 
              warga setempat.
            </p>

            {/* Button: Full width matching the length of the wider description, left-aligned */}
            <div data-reveal="left" style={{ '--rd': '.24s' } as React.CSSProperties} className="pt-1 w-full max-w-xl lg:max-w-2xl">
              <button
                onClick={onExplore}
                className="w-full py-4 rounded-full bg-[#4F8DF7] hover:bg-[#3d7be0] active:bg-[#2b69d6] text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Pelajari Selengkapnya</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* Right Imagery: Center image is bigger & taller, flanking images are shorter and equal in size */}
          <div className="lg:col-span-6">
            <div className="flex items-center justify-center gap-3 sm:gap-5 w-full">
              
              {/* Left Image: Shorter arched capsule */}
              <div data-reveal="up" style={{ '--rd': '.35s' } as React.CSSProperties} className="w-1/3 h-[270px] sm:h-[350px] lg:h-[410px] group overflow-hidden rounded-[32px] sm:rounded-[52px] shadow-lg relative bg-slate-100 flex-shrink-0">
                <img
                  src="/assets/images/about-1.jpg"
                  alt="Destinasi Wisata Indonesia"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Center Image: Bigger and longer/taller than the flanks */}
              <div data-reveal="up" className="w-1/3 h-[350px] sm:h-[460px] lg:h-[530px] group overflow-hidden rounded-[32px] sm:rounded-[52px] shadow-2xl relative bg-slate-100 flex-shrink-0 ring-4 ring-neutral-100/80">
                <img
                  src="/assets/images/about-2.jpg"
                  alt="Pintu Masuk Tradisional"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Right Image: Shorter than center, exact same size as the left image */}
              <div data-reveal="up" style={{ '--rd': '.35s' } as React.CSSProperties} className="w-1/3 h-[270px] sm:h-[350px] lg:h-[410px] group overflow-hidden rounded-[32px] sm:rounded-[52px] shadow-lg relative bg-slate-100 flex-shrink-0">
                <img
                  src="/assets/images/about-3.jpg"
                  alt="Rumah Singgah Backpacker"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};