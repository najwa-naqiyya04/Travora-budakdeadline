import React from 'react';

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#FAFCFF] border-b border-[#EAEAEA]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Heading */}
        <div data-reveal="up" className="text-center mb-16 sm:mb-20">
          <h2 className="text-[#000] text-center font-sans text-[32px] sm:text-[40px] font-bold leading-[44px] sm:leading-[56px] tracking-tight">
            Bagaimana Cara Pakainya?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-500 font-light">
            Tiga langkah mudah memulai menginap gratis saat traveling
          </p>
        </div>

        {/* 3 Step Sequence with Large Green Numbers matching exact Figma specifications */}
        <div className="space-y-16 sm:space-y-24 lg:space-y-32">
          
          {/* Step 01: Number 01 on Left (#3E845F, 219.112px, 800), Text on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div data-reveal="zoom" className="lg:col-span-5 flex items-center justify-start lg:justify-center">
              <span 
                style={{ 
                  color: '#3E845F',
                  fontSize: 'clamp(96px, 16vw, 219.112px)',
                  fontWeight: 800,
                  lineHeight: 'normal'
                }}
                className="font-sans tracking-tighter select-none"
              >
                01
              </span>
            </div>
            <div data-reveal="up" style={{ '--rd': '.18s' } as React.CSSProperties} className="lg:col-span-7 space-y-2 sm:space-y-3 text-left">
              <h3 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#000] font-sans leading-tight lg:leading-[56px]">
                Buat Akun
              </h3>
              <p className="text-base sm:text-xl lg:text-[40px] font-normal text-[#000] font-sans leading-relaxed lg:leading-[56px]">
                Jika anda belum mempunyai akun silahkan untuk membuatnya terlebih dahulu
              </p>
            </div>
          </div>

          {/* Step 02: Text on Left, Number 02 on Right (#11673A, 219.112px, 800) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div data-reveal="up" style={{ '--rd': '.18s' } as React.CSSProperties} className="lg:col-span-7 order-2 lg:order-1 space-y-2 sm:space-y-3 text-left">
              <h3 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#000] font-sans leading-tight lg:leading-[56px]">
                Pilih Destinasimu
              </h3>
              <p className="text-base sm:text-xl lg:text-[40px] font-normal text-[#000] font-sans leading-relaxed lg:leading-[56px]">
                Pilih Destinasimu dan tekan button apply lalu isi data mu
              </p>
            </div>
            <div data-reveal="zoom" className="lg:col-span-5 order-1 lg:order-2 flex items-center justify-start lg:justify-center">
              <span 
                style={{ 
                  color: '#11673A',
                  fontSize: 'clamp(96px, 16vw, 219.112px)',
                  fontWeight: 800,
                  lineHeight: 'normal'
                }}
                className="font-sans tracking-tighter select-none"
              >
                02
              </span>
            </div>
          </div>

          {/* Step 03: Number 03 on Left (#0E532F, 219.112px, 800), Text on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div data-reveal="zoom" className="lg:col-span-5 flex items-center justify-start lg:justify-center">
              <span 
                style={{ 
                  color: '#0E532F',
                  fontSize: 'clamp(96px, 16vw, 219.112px)',
                  fontWeight: 800,
                  lineHeight: 'normal'
                }}
                className="font-sans tracking-tighter select-none"
              >
                03
              </span>
            </div>
            <div data-reveal="up" style={{ '--rd': '.18s' } as React.CSSProperties} className="lg:col-span-7 space-y-2 sm:space-y-3 text-left">
              <h3 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#000] font-sans leading-tight lg:leading-[56px]">
                Pesanan mu akan di proses
              </h3>
              <p className="text-base sm:text-xl lg:text-[40px] font-normal text-[#000] font-sans leading-relaxed lg:leading-[56px]">
                pesanan mu akan di proses oleh sistem silahkan cek notifikasi
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};