export interface TravelPackage {
  id: string;
  destination: string;
  image: string;
  duration: string; // e.g., "5 dias / 4 noites"
  departureLocation: string;
  basePrice: number;
  discountPercentage?: number;
  installments: number;
  socialProof?: {
    viewers: number;
    remaining: number;
  };
  tags: string[];
}

export interface CarRental {
  id: string;
  model: string;
  category: string;
  image: string;
  capacity: number;
  luggage: number;
  dailyRate: number;
  transmission: 'Manual' | 'Automático';
}

export interface SearchState {
  origin: string;
  destination: string;
  dateStart: string;
  dateEnd: string;
  passengers: number;
}

export interface PriceHistoryPoint {
  day: string;
  price: number;
  bestDeal: boolean;
}

export type BookingStatus = 'confirmed' | 'pending' | 'cancelled';

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  packageId: string;
  packageName: string;
  date: string;
  amount: number;
  status: BookingStatus;
  paymentMethod: 'Credit Card' | 'Pix' | 'Boleto';
}

export interface DashboardStats {
  totalRevenue: number;
  totalBookings: number;
  activeUsers: number;
  conversionRate: number;
}