import React, { useEffect, useRef } from 'react';
import { Logo } from './Logo';
import { Phone, Mail, Instagram, Twitter } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
}

// Organic Liquid Wave Canvas Component (No SVG, silky smooth 60fps undulation)
const WaveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const startTime = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000; // in seconds

      ctx.clearRect(0, 0, width, height);
      if (width === 0 || height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Band thickness matching reference image
      const bandThickness = 48;

      // Speed of smooth wave travel towards the right (in pixels per second)
      const travelSpeed = 40;
      const travelOffset = elapsed * travelSpeed;

      // Wave calculation: Combines travelling sine harmonics with natural landscape hills
      const getTopY = (x: number) => {
        // Base anchor height around 44% of container height
        const baseY = height * 0.44;

        // Traveling liquid waves moving smoothly to the right
        const wave1 = Math.sin((x - travelOffset) * 0.0036) * 28;
        const wave2 = Math.cos((x - travelOffset * 1.25) * 0.0068) * 14;
        const wave3 = Math.sin((x - travelOffset * 0.7) * 0.0022) * 18;

        // Gentle breathing swell so the water feels alive and not stiff
        const swell = Math.sin(elapsed * 1.5 + x * 0.0012) * 7;

        // Normalized position for landscape contours (peaks and valley matching UI reference)
        const nx = x / Math.max(width, 1);
        const hill1 = Math.exp(-Math.pow((nx - 0.36) / 0.16, 2)) * -66; // High crest at ~36%
        const valley = Math.exp(-Math.pow((nx - 0.62) / 0.14, 2)) * 62;  // Deep valley at ~62%
        const hill2 = Math.exp(-Math.pow((nx - 0.86) / 0.15, 2)) * -46; // Second crest at ~86%
        const profile = hill1 + valley + hill2;

        return baseY + profile + wave1 + wave2 + wave3 + swell;
      };

      const step = 3;

      // 1. Draw Deep Navy Base (#11223C) underneath the colored band
      ctx.beginPath();
      ctx.moveTo(0, getTopY(0) + bandThickness);
      for (let x = 0; x <= width; x += step) {
        ctx.lineTo(x, getTopY(x) + bandThickness);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = '#11223C';
      ctx.fill();

      // 2. Draw Unified, Blended Gradient Ribbon ("warna lebih nyatu dan rapih")
      // Seamlessly blends Blue (#4F90F6) -> Green (#3E845F) -> Sky Blue (#69A1F7) -> Green (#3E845F)
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0.0, '#4F90F6');
      gradient.addColorStop(0.20, '#4F90F6');
      gradient.addColorStop(0.38, '#3E845F');
      gradient.addColorStop(0.62, '#69A1F7');
      gradient.addColorStop(0.84, '#3E845F');
      gradient.addColorStop(1.0, '#3E845F');

      ctx.beginPath();
      ctx.moveTo(0, getTopY(0));
      for (let x = 0; x <= width; x += step) {
        ctx.lineTo(x, getTopY(x));
      }
      for (let x = width; x >= 0; x -= step) {
        ctx.lineTo(x, getTopY(x) + bandThickness);
      }
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none block"
      style={{ display: 'block' }}
    />
  );
};

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative bg-[#EFF5FF] pt-16 sm:pt-20 overflow-hidden border-t border-[#EAEAEA]">
      {/* 4 Column Top Content Container */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10 pb-16 sm:pb-24">
        <div data-stagger="0.14" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Column 1: Logo & Text Under Logo */}
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            {/* Logo image matching reference */}
            <div
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 cursor-pointer group"
              title="TRAVORA"
            >
              <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
                <Logo className="w-12 h-12" />
              </div>
            </div>

            {/* Text under logo with exact specs */}
            <p
              style={{
                color: '#11223C',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '20px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '24px',
                width: '247px',
              }}
            >
              TRAVORA
              <br />
              ingin memberikan layanan penginapa gratis untuk berlibur dengan jasa yang bisa di tawarkan
            </p>
          </div>

          {/* Column 2: Contat */}
          <div className="lg:col-span-3 flex flex-col items-start gap-4">
            <h4
              style={{
                color: '#11223C',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '24px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '18px',
              }}
            >
              Contat
            </h4>
            <ul className="flex flex-col gap-3">
              <li
                className="flex items-center gap-2.5"
                style={{
                  color: '#11223C',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '24px',
                }}
              >
                <Phone className="w-5 h-5 text-[#11223C] shrink-0" />
                <span>+62xxxxxxxx</span>
              </li>
              <li
                className="flex items-center gap-2.5"
                style={{
                  color: '#11223C',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '24px',
                }}
              >
                <Mail className="w-5 h-5 text-[#11223C] shrink-0" />
                <a
                  href="mailto:marliforever@gmail.com"
                  className="hover:underline transition-all"
                  style={{ color: '#11223C' }}
                >
                  marliforever@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Link */}
          <div className="lg:col-span-2 flex flex-col items-start gap-4">
            <h4
              style={{
                color: '#11223C',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '24px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '18px',
              }}
            >
              Quick Link
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:underline text-left cursor-pointer transition-all"
                  style={{
                    color: '#11223C',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '24px',
                  }}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:underline text-left cursor-pointer transition-all"
                  style={{
                    color: '#11223C',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '24px',
                  }}
                >
                  About
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contat')}
                  className="hover:underline text-left cursor-pointer transition-all"
                  style={{
                    color: '#11223C',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '24px',
                  }}
                >
                  Contant
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Servicces */}
          <div className="lg:col-span-3 flex flex-col items-start gap-4">
            <h4
              style={{
                color: '#11223C',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '24px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '18px',
              }}
            >
              Servicces
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('fitur')}
                  className="hover:underline text-left cursor-pointer transition-all"
                  style={{
                    color: '#11223C',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '24px',
                  }}
                >
                  tempat wisata
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('promo')}
                  className="hover:underline text-left cursor-pointer transition-all"
                  style={{
                    color: '#11223C',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '24px',
                  }}
                >
                  Rekomendasi
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('fitur')}
                  className="hover:underline text-left cursor-pointer transition-all"
                  style={{
                    color: '#11223C',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '24px',
                  }}
                >
                  tempat penginapan
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('faq')}
                  className="hover:underline text-left cursor-pointer transition-all"
                  style={{
                    color: '#11223C',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '24px',
                  }}
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('promo')}
                  className="hover:underline text-left cursor-pointer transition-all"
                  style={{
                    color: '#11223C',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '24px',
                  }}
                >
                  CTA
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Dynamic Liquid Wave Animation Container (No SVG, Smooth Canvas) */}
      <div className="relative w-full h-[290px] sm:h-[310px] overflow-hidden select-none">
        
        {/* Animated Canvas Wave */}
        <WaveCanvas />

        {/* Follow Us & Social Media Icons - Positioned exactly as shown in final UI reference */}
        <div className="relative z-20 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 h-full flex flex-col justify-end pb-8 sm:pb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            
            {/* Follow Us & 3 Squircle Buttons */}
            <div className="flex flex-col items-start gap-4">
              <span
                style={{
                  color: '#FEF6F9',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '24px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: '18px',
                }}
              >
                Follow Us
              </span>

              {/* 3 Squircle buttons directly on the dark navy area (matching image_6bc42d08.png) */}
              <div className="flex items-center gap-3.5">
                {/* Twitter bird button */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                  className="w-12 h-12 rounded-[14px] bg-[#66687B]/45 hover:bg-[#4F90F6] text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md hover:scale-105"
                >
                  <Twitter className="w-5 h-5 fill-current" />
                </a>

                {/* Instagram button */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-12 h-12 rounded-[14px] bg-[#66687B]/45 hover:bg-[#4F90F6] text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md hover:scale-105"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                {/* X logo button */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X"
                  className="w-12 h-12 rounded-[14px] bg-[#66687B]/45 hover:bg-[#4F90F6] text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md hover:scale-105"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Copyright Note */}
            <p className="text-xs sm:text-sm text-[#FEF6F9]/70 font-light" style={{ fontFamily: 'Poppins, sans-serif' }}>
              © {new Date().getFullYear()} TRAVORA. Gotong royong untuk pariwisata Nusantara.
            </p>

          </div>
        </div>

      </div>
    </footer>
  );
};