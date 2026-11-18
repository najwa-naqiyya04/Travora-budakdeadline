export interface Accommodation {
  id: string;
  name: string;
  subtitle: string;
  location: string;
  city: string;
  province: string;
  distance: string;
  rating: number;
  reviewCount: number;
  price: 'FREE';
  category: 'Traditional House' | 'Culture & Heritage' | 'Beachfront Bungalow' | 'Mountain Cabin' | 'Eco Homestay';
  description: string;
  contributionTask: string;
  images: string[];
  facilities: string[];
  specifications: {
    propertyType: string;
    rooms: number;
    bathrooms: number;
    bedSize: string;
    maxGuests: number;
    checkIn: string;
    checkOut: string;
  };
  rules: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  host: {
    name: string;
    role: string;
    avatar: string;
    joinedYear: string;
    responseRate: string;
  };
  reviews: Review[];
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  date: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
}

export interface ApplicationSubmission {
  id: string;
  accommodationId: string;
  accommodationName: string;
  accommodationLocation: string;
  guestName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  contributionSkill: string;
  message: string;
  status: 'Menunggu Konfirmasi' | 'Disetujui' | 'Sedang Ditinjau' | 'Selesai';
  submittedAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'application' | 'info' | 'reward';
}
