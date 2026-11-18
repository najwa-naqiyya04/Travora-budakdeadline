import React from 'react';
import { ShieldCheck, Users } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Heading with Blue Pill Accent Bar */}
        <div data-reveal="up" className="text-center mb-10 sm:mb-12">
          <h2 className="text-[#000] text-center font-sans text-[32px] sm:text-[40px] font-bold leading-[44px] sm:leading-[56px] tracking-tight">
            Benefit Untuk Mu!
          </h2>
          <div className="w-14 h-1.5 bg-[#2F80ED] rounded-full mx-auto mt-3" />
        </div>

        {/* 3 Landscape / Wider Columns Grid */}
        <div data-stagger="0.16" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          
          {/* Column 1: GRATIS (Sky & meadow background, landscape proportion, white card bottom-left) */}
          <div className="relative rounded-[26px] sm:rounded-[28px] overflow-hidden min-h-[290px] sm:min-h-[310px] lg:h-[320px] p-4 sm:p-5 flex flex-col justify-end group shadow-sm hover:shadow-md transition-all duration-300">
            <img
              src="/assets/images/benefit-1.jpg"
              alt="Langit Biru dan Awan Putih"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* White floating container matching reference image */}
            <div className="relative z-10 bg-white rounded-2xl p-4 sm:p-5 shadow-sm max-w-[92%] sm:max-w-[90%]">
              <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                GRATIS
              </h3>
              <p className="text-xs sm:text-[13px] text-neutral-800 mt-1.5 leading-snug font-normal">
                Kami menyediakan secara gratis untuk kamu semua.
              </p>
            </div>
          </div>

          {/* Column 2: Terpercaya 100% (Light Grey Card with Avatars in the Middle) */}
          <div className="bg-[#EEF0F2] rounded-[26px] sm:rounded-[28px] p-6 sm:p-7 flex flex-col justify-between min-h-[290px] sm:min-h-[310px] lg:h-[320px] shadow-sm hover:shadow-md transition-all duration-300">
            {/* Top part: Terpercaya & 100% */}
            <div>
              <p className="text-sm font-semibold text-black tracking-tight">
                Terpercaya
              </p>
              <h3 className="text-4xl sm:text-5xl font-extrabold text-black mt-0.5 tracking-tight leading-none">
                100%
              </h3>
            </div>

            {/* Middle part: 4 Overlapping Circular Profile Avatars */}
            <div className="my-auto py-2">
              <div className="flex items-center -space-x-2.5">
                <img
                  src="/assets/images/benefit-avatar-1.jpg"
                  alt="Reviewer 1"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white object-cover shadow-sm"
                />
                <img
                  src="/assets/images/benefit-avatar-2.jpg"
                  alt="Reviewer 2"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white object-cover shadow-sm"
                />
                <img
                  src="/assets/images/benefit-avatar-3.jpg"
                  alt="Reviewer 3"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white object-cover shadow-sm"
                />
                <img
                  src="/assets/images/benefit-avatar-4.jpg"
                  alt="Reviewer 4"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white object-cover shadow-sm"
                />
              </div>
            </div>

            {/* Bottom part: Testimonial quote matching exact text */}
            <div>
              <p className="text-xs sm:text-[13px] text-neutral-800 leading-snug font-normal">
                “Tempat yang sangat nyaman di tempati dengan pelayanan yang sangat baik dan bersih. Saya sangat merekomendasikan!”
              </p>
            </div>
          </div>

          {/* Column 3: Stacked Blue and Black Cards with Vertical Divider and Icons */}
          <div className="flex flex-col gap-4 justify-between min-h-[290px] sm:min-h-[310px] lg:h-[320px]">
            
            {/* Top Card: BERSIH DAN ASRI (Vibrant Blue Card with ShieldCheck icon) */}
            <div className="bg-[#2F80ED] text-white rounded-[22px] sm:rounded-[24px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex-1 flex items-center gap-4 sm:gap-5">
              <div className="w-12 sm:w-14 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-9 h-9 sm:w-10 sm:h-10 text-white stroke-[1.75]" />
              </div>

              {/* Vertical Divider */}
              <div className="w-[1px] h-12 bg-white/30 shrink-0" />

              {/* Text content */}
              <div className="min-w-0 flex-1">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-wide uppercase">
                  BERSIH DAN ASRI
                </h3>
                <p className="text-[11px] sm:text-xs text-white/90 leading-snug mt-1 font-light">
                  Tanah kami sangat terawat dan menjadi tempat yang bersih serta asri untuk kamu dan keluarga.
                </p>
              </div>
            </div>

            {/* Bottom Card: 200+ (Pure Black Card with Users icon) */}
            <div className="bg-[#0D0F12] text-white rounded-[22px] sm:rounded-[24px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex-1 flex items-center gap-4 sm:gap-5">
              <div className="w-12 sm:w-14 flex items-center justify-center shrink-0">
                <Users className="w-9 h-9 sm:w-10 sm:h-10 text-white stroke-[1.75]" />
              </div>

              {/* Vertical Divider */}
              <div className="w-[1px] h-12 bg-white/20 shrink-0" />

              {/* Text content */}
              <div className="min-w-0 flex-1">
                <h3 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-none">
                  200+
                </h3>
                <p className="text-[11px] sm:text-xs text-neutral-300 leading-snug mt-1.5 font-light">
                  Banyak komunitas yang telah bergabung bersama kami.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};