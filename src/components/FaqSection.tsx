import React, { useState } from 'react';
import { ChevronDown, HelpCircle, CheckCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Apa itu TRAVORA?',
      a: 'TRAVORA adalah platform komunitas yang menghubungkan backpacker dan traveler dengan tuan rumah lokal di Indonesia yang menyediakan tempat tinggal secara gratis. Sebagai gantinya, traveler dapat memberikan kontribusi ringan seperti gotong royong merawat kebun pekarangan, bertukar keterampilan, atau mengabadikan keindahan homestay.'
    },
    {
      q: 'Apakah semua penginapan benar-benar gratis?',
      a: 'Ya, 100% gratis tanpa biaya sewa kamar sepersen pun. Tuan rumah adalah keluarga dan komunitas lokal yang senang menyambut tamu dan berbagi kekayaan budaya Nusantara. Yang dibutuhkan hanyalah sikap santun, kepedulian lingkungan, dan kerelaan membantu tugas ringan yang disepakati.'
    },
    {
      q: 'Bagaimana cara mengajukan permohonan menginap?',
      a: 'Pilih destinasi yang ingin Anda kunjungi di halaman Jelajahi atau Beranda, klik tombol "Apply", isi tanggal check-in & check-out, jumlah tamu, keahlian sukarela yang bisa Anda tawarkan, dan pesan perkenalan singkat kepada tuan rumah. Tuan rumah akan meninjau dan Anda akan menerima notifikasi status.'
    },
    {
      q: 'Apakah saya bisa memilih lokasi penginapan?',
      a: 'Tentu saja. Anda dapat mencari dan memilih penginapan berdasarkan kota, provinsi, tipe akomodasi (desa adat, tepi pantai, lereng gunung), atau jarak ke objek wisata populer seperti Danau Toba, Raja Ampat, Dieng, Wakatobi, atau Penglipuran Bali.'
    },
    {
      q: 'Bagaimana cara mengetahui permohonan saya diterima?',
      a: 'Status pengajuan Anda dapat dicek langsung melalui ikon Notifikasi lonceng di bagian navigasi atas atau menu "Pengajuan Saya" pada menu profil. Anda juga akan menerima rincian kontak WhatsApp tuan rumah begitu permohonan disetujui.'
    },
    {
      q: 'Apakah tersedia fasilitas kamar mandi dan tempat tidur?',
      a: 'Ya! Semua penginapan yang terdaftar telah diverifikasi oleh tim TRAVORA dan menyediakan tempat tidur yang bersih, kamar mandi yang layak, serta fasilitas dasar seperti air bersih dan ruang bersama.'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden" id="faq">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Heading */}
        <div data-reveal="up" className="text-center mb-8">
          <p className="text-xs sm:text-sm font-bold tracking-widest text-[#4F8DF7] uppercase">
            Pusat Bantuan & FAQ
          </p>
          <h2 className="text-[#000] text-center font-sans text-[32px] sm:text-[40px] font-bold leading-[44px] sm:leading-[56px] tracking-tight mt-1">
            Ada Yang Ingin Kau Tanyakan?
          </h2>
        </div>

        {/* Playful Floating Question Bubbles Composition (Inspired by Reference Image 1) */}
        <div data-reveal="zoom" className="relative py-10 my-4 text-center">
          
          {/* Bubble 1: Top left angled */}
          <div className="inline-block transform -rotate-12 bg-[#EAF2FF] text-[#4F8DF7] px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm mb-4 mx-2">
            Pertanyaan yang sering dipikirkan?
          </div>

          {/* Bubble 2: Top right angled */}
          <div className="inline-block transform rotate-6 bg-[#EAF2FF] text-[#4F8DF7] px-5 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-sm mb-4 mx-2">
            Beneran gratis tanpa biaya?
          </div>

          {/* Center Main Statement */}
          <div className="my-6">
            <h3 className="text-3xl sm:text-5xl font-extrabold text-[#142642] tracking-tight">
              You asked
            </h3>
            <h3 className="text-3xl sm:text-5xl font-extrabold text-[#4F8DF7] tracking-tight">
              We answered
            </h3>
          </div>

          {/* Bubble 3: Green Answer tag */}
          <div className="inline-block transform -rotate-3 bg-[#38865D] text-white px-5 py-1.5 rounded-full text-xs font-bold shadow-sm mx-2">
            Jawaban Resmi
          </div>

          {/* Bubble 4: Right blue pill */}
          <div className="inline-block transform rotate-12 bg-[#4F8DF7] text-white px-5 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-sm mx-2">
            Aman dan terverifikasi?
          </div>
        </div>

        {/* Accordion List */}
        <div data-stagger="0.08" className="mt-12 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="border border-[#EAEAEA] rounded-2xl overflow-hidden transition-all duration-200 bg-white"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-[#142642] hover:text-[#4F8DF7] transition-colors"
                >
                  <span className="text-sm sm:text-base flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#4F8DF7] shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'transform rotate-180 text-[#4F8DF7]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 bg-neutral-50/50">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};