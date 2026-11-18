import { Accommodation } from '../types';
import { ACC_IMAGES } from './houseImages';

export const ACCOMMODATIONS: Accommodation[] = [
  {
    id: 'accommodation-001',
    name: 'Rumah Tradisional Penglipuran',
    subtitle: 'Penginapan arsitektur bambu di desa adat terbersih dunia',
    location: 'Kubu, Bangli, Bali',
    city: 'Bangli',
    province: 'Bali',
    distance: '2 Km dari Gerbang Desa Adat',
    rating: 4.8,
    reviewCount: 94,
    price: 'FREE',
    category: 'Traditional House',
    description: 'Rasakan suasana desa adat Bali yang tertata asri dan tenang. Menginap di kompleks pekarangan tradisional Bali (Angkul-Angkul) dengan dinding bambu alami, kebun bunga kamboja, dan udara sejuk khas perbukitan Bangli. Tuan rumah adalah keluarga seniman ukir dan anyaman bambu lokal.',
    contributionTask: 'Membantu merawat kebun bunga pekarangan pagi hari, menyapu halaman tanah liat tradisional, dan mendampingi anak-anak desa belajar percakapan Bahasa Inggris dasar.',
    images: ACC_IMAGES['accommodation-001'],
    facilities: [
      'WiFi 50 Mbps',
      'Kamar Mandi Tradisional Bersih',
      'Air Hangat Alami',
      'Dapur Bersama & Alat Masak',
      'Peralatan Minum Teh Herbal',
      'Sepeda Keliling Desa',
      'Stop Kontak & Meja Kerja',
      'Tempat Jemuran Pakaian'
    ],
    specifications: {
      propertyType: 'Rumah Adat Tradisional Bali',
      rooms: 3,
      bathrooms: 2,
      bedSize: 'single 2, king bed 1',
      maxGuests: 4,
      checkIn: '14:00 WITA',
      checkOut: '11:00 WITA'
    },
    rules: [
      'Menghormati tata krama dan ketenangan desa adat',
      'Dilarang merokok di dalam bangunan bambu',
      'Berpakaian sopan saat berada di area suci/pura keluarga',
      'Mengutamakan hemat air dan ramah lingkungan'
    ],
    coordinates: {
      lat: -8.4526,
      lng: 115.3551
    },
    host: {
      name: 'I Wayan Sudarma',
      role: 'Pengrajin Bambu & Tetua Komunitas Penglipuran',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      joinedYear: '2023',
      responseRate: '100% responsif (< 1 jam)'
    },
    reviews: [
      {
        id: 'rev-001',
        author: 'Putri Maharani',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        date: '3 hari yang lalu',
        rating: 5.0,
        title: 'Pengalaman Otentik Tak Terlupakan',
        comment: 'Keluarga Bli Wayan menyambut kami seperti keluarga sendiri. Suasana desa sangat damai, udara segar bebas kendaraan. Tugas membantu menyiram bunga di pagi hari malah bikin pikiran tenang!',
        images: [ACC_IMAGES['accommodation-001'][1]]
      },
      {
        id: 'rev-002',
        author: 'Arif Wibowo',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        date: '1 minggu yang lalu',
        rating: 4.8,
        title: 'Sangat Bersih dan Penuh Kebaikan',
        comment: 'Kamar mandinya wangi dan bersih. Kami diajarkan cara menganyam bambu tipis khas Penglipuran. Sangat direkomendasikan bagi solo backpacker.',
      }
    ]
  },
  {
    id: 'accommodation-002',
    name: 'Rumah Adat Wae Rebo',
    subtitle: 'Tinggal di atas awan dalam rumah kerucut Mbaru Niang',
    location: 'Satar Lenda, Manggarai, NTT',
    city: 'Manggarai',
    province: 'Nusa Tenggara Timur',
    distance: '3.5 Km dari Pos Pendakian Denge',
    rating: 4.9,
    reviewCount: 82,
    price: 'FREE',
    category: 'Culture & Heritage',
    description: 'Rasakan suasana sakral pegunungan dan pelajari tradisi luhur masyarakat Manggarai di dalam rumah adat kerucut Mbaru Niang. Terletak di lembah terpencil yang dikelilingi perbukitan hijau berkabut tebal. Nikmati seduhan kopi arabika Flores murni hasil petik langsung warga.',
    contributionTask: 'Membantu proses pemilahan biji kopi jemur di pelataran desa, merapikan kayu bakar untuk tungku bersama, dan mendokumentasikan kegiatan budaya warga.',
    images: ACC_IMAGES['accommodation-002'],
    facilities: [
      'Tikar Tradisional Anyam Pandan',
      'Selimut Wol Tebal Hangat',
      'Toilet Komunal Bersih',
      'Air Pegunungan Segar',
      'Dapur Tungku Tradisional',
      'Kopi Flores Sepuasnya',
      'Solar Panel Charging Siang Hari'
    ],
    specifications: {
      propertyType: 'Mbaru Niang Kerucut Tradisional',
      rooms: 2,
      bathrooms: 2,
      bedSize: 'single 6 (alas matras anyam tebal)',
      maxGuests: 6,
      checkIn: '13:00 WITA',
      checkOut: '09:00 WITA'
    },
    rules: [
      'Wajib mengikuti ritual sambutan Waelu bersama tetua adat',
      'Membawa kembali semua sampah pribadi ke kaki bukit',
      'Matikan lampu minyak sebelum tidur',
      'Menghormati waktu istirahat warga pukul 21:00'
    ],
    coordinates: {
      lat: -8.7667,
      lng: 120.2833
    },
    host: {
      name: 'Bapak Fransiskus',
      role: 'Ketua Lembaga Adat Wae Rebo',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      joinedYear: '2022',
      responseRate: '98% responsif'
    },
    reviews: [
      {
        id: 'rev-003',
        author: 'Dian Prasasti',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        date: '5 hari yang lalu',
        rating: 5.0,
        title: 'Momen Spiritual yang Menyentuh',
        comment: 'Mendaki 3 jam terbayar lunas saat melihat Mbaru Niang di balik kabut sore. Warga sangat ramah dan kopi Floresnya terenak yang pernah saya coba.'
      }
    ]
  },
  {
    id: 'accommodation-003',
    name: 'Rumah Budaya Kete Kesu',
    subtitle: 'Homestay rumah Tongkonan kayu ukir khas Toraja Utara',
    location: 'Sanggalangi, Toraja Utara, Sulawesi Selatan',
    city: 'Toraja Utara',
    province: 'Sulawesi Selatan',
    distance: '1.2 Km dari Situs Tebing Kete Kesu',
    rating: 4.7,
    reviewCount: 67,
    price: 'FREE',
    category: 'Culture & Heritage',
    description: 'Jelajahi rumah adat Tongkonan dengan atap melengkung menyerupai perahu kuno dan pelajari warisan budaya masyarakat Toraja. Menginap di bagian anjungan kayu Banua Barung yang kokoh dengan ukiran motif Paqtedong (kepala kerbau) yang melambangkan kemakmuran.',
    contributionTask: 'Membantu menyapu pekarangan Alang (lumbung padi), membantu persiapan acara kesenian lokal, atau mengajarkan keahlian komputer dasar untuk remaja desa.',
    images: ACC_IMAGES['accommodation-003'],
    facilities: [
      'Kamar Tidur Kayu Jati Alami',
      'WiFi 30 Mbps',
      'Kamar Mandi Modern',
      'Dapur & Kopi Toraja Tubruk',
      'Balkon Pemandangan Sawah',
      'Perpustakaan Mini Budaya'
    ],
    specifications: {
      propertyType: 'Rumah Tongkonan Tradisional',
      rooms: 3,
      bathrooms: 2,
      bedSize: 'single 2, queen 1',
      maxGuests: 4,
      checkIn: '14:00 WITA',
      checkOut: '12:00 WITA'
    },
    rules: [
      'Menjaga ketenangan di sekitar area lumbung padi',
      'Dilarang membawa makanan non-halal ke dapur utama',
      'Lepas alas kaki sebelum memasuki lantai papan kayu'
    ],
    coordinates: {
      lat: -2.9967,
      lng: 119.9142
    },
    host: {
      name: 'Mama Yuliana Rante',
      role: 'Penenun Tradisional Tenun Ikat Toraja',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      joinedYear: '2023',
      responseRate: '100% responsif'
    },
    reviews: [
      {
        id: 'rev-004',
        author: 'Rifky Aditya',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
        date: '2 minggu yang lalu',
        rating: 4.8,
        title: 'Arsitektur Menakjubkan',
        comment: 'Tidur di dalam Tongkonan rasanya dingin alami tanpa perlu AC. Mama Yuliana sangat ramah dan menceritakan filosofi setiap ukiran dinding kayu.'
      }
    ]
  },
  {
    id: 'accommodation-004',
    name: 'Rumah Bahari Wakatobi',
    subtitle: 'Bungalow ramah lingkungan tepi pantai pasir putih dan terumbu karang',
    location: 'Wangi-Wangi, Wakatobi, Sulawesi Tenggara',
    city: 'Wakatobi',
    province: 'Sulawesi Tenggara',
    distance: '50 Meter dari Bibir Pantai Snorkeling',
    rating: 4.9,
    reviewCount: 110,
    price: 'FREE',
    category: 'Beachfront Bungalow',
    description: 'Bungalow kayu sederhana di tepi pantai dengan pemandangan laut biru toska sebening kristal. Nikmati angin laut sepoi-sepoi dari teras kayu, ayunan hammock di bawah pohon kelapa, dan terumbu karang kaya warna tepat di depan akomodasi.',
    contributionTask: 'Membantu patroli bersih pantai (beach clean-up) pagi hari selama 45 menit, membantu mencuci peralatan snorkeling komunitas, dan menyiram tanaman bunga bugenvil.',
    images: ACC_IMAGES['accommodation-004'],
    facilities: [
      'Hammock Tepi Pantai',
      'Peralatan Snorkeling Gratis',
      'Kamar Mandi Terbuka Semi-Outdoor',
      'Air Bersih & Dapur Umum',
      'WiFi Satelit',
      'Kelapa Muda Segar dari Kebun'
    ],
    specifications: {
      propertyType: 'Eco Beach Bungalow Kayu Kelapa',
      rooms: 2,
      bathrooms: 1,
      bedSize: 'single 2, king bed 1',
      maxGuests: 4,
      checkIn: '13:00 WITA',
      checkOut: '11:00 WITA'
    },
    rules: [
      'Gunakan tabir surya ramah terumbu karang (reef-safe)',
      'Dilarang menginjak karang hidup saat snorkeling',
      'Pisahkan sampah organik dan daur ulang'
    ],
    coordinates: {
      lat: -5.3328,
      lng: 123.5936
    },
    host: {
      name: 'La Ode Baharudin',
      role: 'Penyelam Konservasi & Nelayan Tradisional',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      joinedYear: '2022',
      responseRate: '100% responsif'
    },
    reviews: [
      {
        id: 'rev-005',
        author: 'Fajar Nugroho',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
        date: '4 hari yang lalu',
        rating: 5.0,
        title: 'Surga Bahari Nyata',
        comment: 'Cukup melangkah 10 langkah dari ranjang langsung bisa nyemplung ketemu penyu dan koral warna-warni. Bang Baharudin sosok yang sangat menginspirasi!',
        images: [ACC_IMAGES['accommodation-004'][1]]
      }
    ]
  },
  {
    id: 'accommodation-005',
    name: 'Rumah Kepulauan Pianemo',
    subtitle: 'Pondok kayu apung di gugusan pulau karang zamrud Raja Ampat',
    location: 'Pianemo, Raja Ampat, Papua Barat Daya',
    city: 'Raja Ampat',
    province: 'Papua Barat Daya',
    distance: '300 Meter dari Tangga Viewpoint Pianemo',
    rating: 5.0,
    reviewCount: 76,
    price: 'FREE',
    category: 'Eco Homestay',
    description: 'Rumah kayu di kawasan pulau tropis dengan panorama laut dan gugusan pulau karst ikonik Raja Ampat. Bangun setiap pagi disambut suara burung kakaktua putih dan lumba-lumba yang sesekali melintas di teluk tenang.',
    contributionTask: 'Membantu mengecat dermaga kayu ramah lingkungan, memasang plang edukasi konservasi satwa, dan membantu ibu homestay menyiapkan singkong goreng sore hari.',
    images: ACC_IMAGES['accommodation-005'],
    facilities: [
      'Dermaga Kayu Santai',
      'Kano / Kayak Tradisional',
      'Life Jacket & Masker Selam',
      'Listrik Tenaga Surya',
      'Makanan Rumahan Berbagi',
      'Kamar Mandi Bilas Air Tawar'
    ],
    specifications: {
      propertyType: 'Water Bungalow Panggung',
      rooms: 2,
      bathrooms: 1,
      bedSize: 'single 2, double bed 1',
      maxGuests: 3,
      checkIn: '12:00 WIT',
      checkOut: '10:00 WIT'
    },
    rules: [
      'Membatasi pemakaian air tawar sesuai kuota tampungan hujan',
      'Tidak membuang apapun ke dalam laut teluk',
      'Tidak mengusik burung cendrawasih di kanopi bukit'
    ],
    coordinates: {
      lat: -0.5638,
      lng: 130.2711
    },
    host: {
      name: 'Bapak Marthen Sauyai',
      role: 'Pemandu Konservasi Hutan Bakau & Tetua Adat',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      joinedYear: '2023',
      responseRate: '95% responsif'
    },
    reviews: [
      {
        id: 'rev-006',
        author: 'Jessica Hartono',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        date: '1 minggu yang lalu',
        rating: 5.0,
        title: 'Pengalaman Terindah Seumur Hidup',
        comment: 'Bisa tinggal gratis di jantung Raja Ampat adalah keajaiban bagi backpacker. Kami bantu mengecat jembatan dan belajar navigasi perahu tradisional.',
        images: [ACC_IMAGES['accommodation-005'][1]]
      }
    ]
  },
  {
    id: 'accommodation-006',
    name: 'Rumah Lereng Gunung Prau',
    subtitle: 'Kabin kayu hangat di atas hamparan perkebunan teh berkabut Dieng',
    location: 'Dieng, Wonosobo, Jawa Tengah',
    city: 'Wonosobo',
    province: 'Jawa Tengah',
    distance: '800 Meter dari Basecamp Prau Patakbanteng',
    rating: 4.8,
    reviewCount: 142,
    price: 'FREE',
    category: 'Mountain Cabin',
    description: 'Rumah penginapan bernuansa pegunungan sejuk dengan udara bersih dan panorama perbukitan bertingkat. Berada di ketinggian 2.100 mdpl dengan perapian kayu bakar, teh purwaceng hangat, dan pemandangan sunrise Gunung Sindoro yang menawan dari jendela kamar.',
    contributionTask: 'Membantu memetik sayuran kentang dan kubis di kebun organik pagi hari (1 jam), merapikan tungku perapian ruang tengah, dan merapikan buku-buku di pojok baca desa.',
    images: ACC_IMAGES['accommodation-006'],
    facilities: [
      'Perapian Ruang Tengah Kayu Bakar',
      'Water Heater Air Hangat',
      'Dapur Lengkap & Sayur Segar Kebun',
      'Selimut Bulu Hangat Berlapis',
      'WiFi 40 Mbps',
      'Pojok Kopi & Teh Sangrai'
    ],
    specifications: {
      propertyType: 'Kabin Kayu Pinus Alami',
      rooms: 3,
      bathrooms: 2,
      bedSize: 'single 2, king bed 2',
      maxGuests: 6,
      checkIn: '13:00 WIB',
      checkOut: '11:00 WIB'
    },
    rules: [
      'Gunakan jaket hangat karena suhu malam bisa mencapai 4-8°C',
      'Pastikan perapian padam sebelum beranjak tidur',
      'Jaga kebersihan area dapur bersama'
    ],
    coordinates: {
      lat: -7.2144,
      lng: 109.9208
    },
    host: {
      name: 'Pakde Slamet Riyadi',
      role: 'Petani Organik & Relawan SAR Gunung Prau',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      joinedYear: '2021',
      responseRate: '100% responsif'
    },
    reviews: [
      {
        id: 'rev-007',
        author: 'Bambang Sutejo',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        date: '6 hari yang lalu',
        rating: 4.9,
        title: 'Tempat Menginap Paling Hangat',
        comment: 'Suhu di luar Dieng super dingin, tapi di dalam kabin Pakde Slamet terasa hangat berkat perapian dan keramahan beliau. Sayur lodeh buatan Bu Slamet juga luar biasa nikmat.',
        images: [ACC_IMAGES['accommodation-006'][1]]
      }
    ]
  },
  {
    id: 'accommodation-007',
    name: 'Rumah Sejuk Alahan Panjang',
    subtitle: 'Guesthouse tepi danau dengan udara pegunungan Bukit Barisan',
    location: 'Alahan Panjang, Solok, Sumatera Barat',
    city: 'Solok',
    province: 'Sumatera Barat',
    distance: '1.5 Km dari Danau Kembar Diatas',
    rating: 4.8,
    reviewCount: 59,
    price: 'FREE',
    category: 'Mountain Cabin',
    description: 'Rasakan udara pegunungan yang sejuk dengan pemandangan danau dan perbukitan hijau kebun teh Alahan Panjang yang dijuluki Kota Dingin Tanpa Salju. Menginap di rumah panggung khas Minang modern yang dikelilingi kebun markisa manis.',
    contributionTask: 'Membantu menyiram kebun markisa dan stroberi, mengeringkan daun teh jemur, dan membantu membersihkan ruang tamu bersama.',
    images: ACC_IMAGES['accommodation-007'],
    facilities: [
      'Balkon Panorama Danau',
      'Dapur Minang Bersama',
      'Kamar Mandi Air Hangat',
      'WiFi Cepat',
      'Petik Stroberi & Markisa Sendiri',
      'Parkir Aman'
    ],
    specifications: {
      propertyType: 'Rumah Panggung Minang Modern',
      rooms: 3,
      bathrooms: 2,
      bedSize: 'single 2, queen 1',
      maxGuests: 5,
      checkIn: '14:00 WIB',
      checkOut: '12:00 WIB'
    },
    rules: [
      'Menghormati norma adat Minangkabau yang santun',
      'Tidak membuat kebisingan melewati pukul 22:00 WIB',
      'Menjaga tanaman buah dan kebun sayur'
    ],
    coordinates: {
      lat: -1.0667,
      lng: 100.7833
    },
    host: {
      name: 'Uda Hendra Tanjung',
      role: 'Pemandu Alam Danau Kembar',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      joinedYear: '2023',
      responseRate: '97% responsif'
    },
    reviews: [
      {
        id: 'rev-008',
        author: 'Rina Kusuma',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        date: '1 minggu yang lalu',
        rating: 4.8,
        title: 'Sejuk dan Pemandangannya Juara',
        comment: 'Balkon menghadap langsung ke danau dan kabut pagi. Uda Hendra sangat baik mengantarkan kami keliling kebun teh.'
      }
    ]
  },
  {
    id: 'accommodation-008',
    name: 'Rumah Pesisir Teluk Kiluan',
    subtitle: 'Pondok kayu sederhana di dekat teluk lumba-lumba liar',
    location: 'Kiluan Negeri, Tanggamus, Lampung',
    city: 'Tanggamus',
    province: 'Lampung',
    distance: '100 Meter dari Dermaga Perahu Lumba-Lumba',
    rating: 4.7,
    reviewCount: 48,
    price: 'FREE',
    category: 'Beachfront Bungalow',
    description: 'Rumah penginapan sederhana dekat pantai dengan suasana teluk yang tenang. Dikelilingi bukit hijau yang menjorok ke Samudra Hindia. Di pagi hari, Anda dapat menyaksikan kawanan lumba-lumba paruh panjang melompat bebas di perairan teluk.',
    contributionTask: 'Membantu membersihkan jaring perahu nelayan, menyapu serasah daun pantai, dan menemani anak-anak setempat membaca buku di rumah baca pesisir.',
    images: ACC_IMAGES['accommodation-008'],
    facilities: [
      'Akses Langsung Pantai Teluk',
      'Kamar Mandi Bersih',
      'Dapur Ikan Bakar',
      'Air Bersih Sumur Alami',
      'Bantal & Kasur Busa Empuk'
    ],
    specifications: {
      propertyType: 'Rumah Panggung Kayu Pesisir',
      rooms: 2,
      bathrooms: 1,
      bedSize: 'single 2, double 1',
      maxGuests: 4,
      checkIn: '13:00 WIB',
      checkOut: '11:00 WIB'
    },
    rules: [
      'Jangan membuang sampah plastik ke laut atau bibir pantai',
      'Gunakan jaket pelampung bila berenang di laut lepas',
      'Hormati jam ibadah warga pesisir'
    ],
    coordinates: {
      lat: -5.7933,
      lng: 105.1506
    },
    host: {
      name: 'Bang Ridwan',
      role: 'Koordinator Pelindung Lumba-lumba Kiluan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      joinedYear: '2022',
      responseRate: '99% responsif'
    },
    reviews: [
      {
        id: 'rev-009',
        author: 'Dika Ramadhan',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        date: '2 minggu yang lalu',
        rating: 4.7,
        title: 'Melihat Ratusan Lumba-Lumba!',
        comment: 'Pondok Bang Ridwan sangat homey dan sejuk. Menginap gratis dengan kontribusi menjaga pantai bersih adalah barter yang sangat bermakna.'
      }
    ]
  },
  {
    id: 'accommodation-009',
    name: 'Jempol Beach perumahan jepolan',
    subtitle: 'penginapan perumahan belakang pantai jempol',
    location: 'Jawa barat, pucuk ubi',
    city: 'Pangandaran',
    province: 'Jawa Barat',
    distance: '23 Km dari Pusat Wisata Pantai',
    rating: 4.0,
    reviewCount: 39,
    price: 'FREE',
    category: 'Beachfront Bungalow',
    description: 'Penginapan perumahan nyaman dan asri tepat di belakang kawasan pantai jempol. Memiliki pekarangan kebun buah dan suasana kekeluargaan yang hangat bagi para backpacker yang ingin rehat sejenak dari rutinitas perjalanan jauh.',
    contributionTask: 'Mengerjakan tugas dengan menyiram kebun belakang rumah setiap hari, dan menyapu ngepel rumah pagi dan sore',
    images: ACC_IMAGES['accommodation-009'],
    facilities: [
      'Kebun Belakang Asri & Luas',
      'Kamar Mandi Bersih & Ember Air Segar',
      'Dapur Lengkap dengan Alat Masak',
      'Ruang Tamu Bersama Luas',
      'Kipas Angin Angin Sejuk',
      'Parkir Sepeda / Motor Aman'
    ],
    specifications: {
      propertyType: 'Rumah',
      rooms: 4,
      bathrooms: 2,
      bedSize: 'single 2, king bed 2',
      maxGuests: 6,
      checkIn: '14:00 WIB',
      checkOut: '12:00 WIB'
    },
    rules: [
      'Menyiram kebun belakang setiap sore',
      'Menyapu dan mengepel lantai bersama pagi hari',
      'Menjaga kebersihan dapur setelah memasak',
      'Dilarang merokok di dalam kamar'
    ],
    coordinates: {
      lat: -7.6983,
      lng: 108.6578
    },
    host: {
      name: 'Ibu Rahayu',
      role: 'Tuan Rumah Komunitas Ramah Backpacker',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      joinedYear: '2023',
      responseRate: '100% responsif'
    },
    reviews: [
      {
        id: 'rev-010',
        author: 'Jujuhoonan',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        date: '1 hari yang lalu',
        rating: 4.0,
        title: 'Masih Fresh',
        comment: 'Tempatnya fresh banget, suasananya sejuk dan tenang, fasilitasnya pas dan lengkap. Bakal datang lagi kalau main ke daerah sini! Worth it banget!',
        images: [ACC_IMAGES['accommodation-009'][1]]
      },
      {
        id: 'rev-011',
        author: 'Kekeonhonan',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        date: '2 hari yang lalu',
        rating: 4.0,
        title: 'Kualitas Sangat Bagus',
        comment: 'Rumah dikemas dengan rapi dan kualitasnya bagus. Rasanya juga worth it banget! Puas banget sama keramahan ibu tuan rumah dan kebun belakangnya.',
        images: [ACC_IMAGES['accommodation-009'][1]]
      },
      {
        id: 'rev-012',
        author: 'Sasayeng',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        date: '2 hari yang lalu',
        rating: 4.0,
        title: 'Ini Enak Banget',
        comment: 'Suasana enak, teksturnya pas dan asri, udaranya segar bikin nagih. Recommended banget buat backpacker yang suka tempat santai!',
        images: [ACC_IMAGES['accommodation-009'][1]]
      }
    ]
  }
];