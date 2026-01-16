import { TravelPackage, CarRental, PriceHistoryPoint, Booking } from './types';

export const MOCK_PACKAGES: TravelPackage[] = [
  {
    id: '1',
    destination: 'Maceió, Alagoas',
    image: 'https://picsum.photos/seed/maceio/800/600',
    duration: '5 dias / 4 noites',
    departureLocation: 'Saindo de São Paulo',
    basePrice: 1850,
    discountPercentage: 10,
    installments: 12,
    socialProof: { viewers: 24, remaining: 3 },
    tags: ['Praia', 'Nordeste', 'Família']
  },
  {
    id: '2',
    destination: 'Paris, França',
    image: 'https://picsum.photos/seed/paris/800/600',
    duration: '7 dias / 6 noites',
    departureLocation: 'Saindo de Rio de Janeiro',
    basePrice: 5200,
    discountPercentage: 5,
    installments: 10,
    socialProof: { viewers: 42, remaining: 1 },
    tags: ['Europa', 'Romântico', 'História']
  },
  {
    id: '3',
    destination: 'Gramado, RS',
    image: 'https://picsum.photos/seed/gramado/800/600',
    duration: '4 dias / 3 noites',
    departureLocation: 'Saindo de Curitiba',
    basePrice: 980,
    discountPercentage: 0,
    installments: 10,
    socialProof: { viewers: 12, remaining: 8 },
    tags: ['Serra', 'Romântico', 'Inverno']
  },
  {
    id: '4',
    destination: 'Orlando, EUA',
    image: 'https://picsum.photos/seed/orlando/800/600',
    duration: '10 dias / 9 noites',
    departureLocation: 'Saindo de São Paulo',
    basePrice: 6500,
    installments: 12,
    socialProof: { viewers: 89, remaining: 5 },
    tags: ['Internacional', 'Parques', 'Família']
  }
];

export const MOCK_CARS: CarRental[] = [
  {
    id: 'c1',
    model: 'Fiat Mobi',
    category: 'Econômico',
    image: 'https://picsum.photos/seed/car1/400/250',
    capacity: 5,
    luggage: 2,
    dailyRate: 89.90,
    transmission: 'Manual'
  },
  {
    id: 'c2',
    model: 'Jeep Compass',
    category: 'SUV',
    image: 'https://picsum.photos/seed/car2/400/250',
    capacity: 5,
    luggage: 4,
    dailyRate: 249.90,
    transmission: 'Automático'
  }
];

export const PRICE_HISTORY_MOCK: PriceHistoryPoint[] = [
  { day: 'Seg', price: 1200, bestDeal: false },
  { day: 'Ter', price: 980, bestDeal: true },
  { day: 'Qua', price: 1100, bestDeal: false },
  { day: 'Qui', price: 1350, bestDeal: false },
  { day: 'Sex', price: 1500, bestDeal: false },
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'BK-001',
    customerName: 'João Silva',
    customerEmail: 'joao@email.com',
    packageId: '1',
    packageName: 'Maceió, Alagoas',
    date: '2023-10-25',
    amount: 1850,
    status: 'confirmed',
    paymentMethod: 'Pix'
  },
  {
    id: 'BK-002',
    customerName: 'Maria Oliveira',
    customerEmail: 'maria@email.com',
    packageId: '2',
    packageName: 'Paris, França',
    date: '2023-10-26',
    amount: 5200,
    status: 'pending',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'BK-003',
    customerName: 'Carlos Souza',
    customerEmail: 'carlos@email.com',
    packageId: '3',
    packageName: 'Gramado, RS',
    date: '2023-10-24',
    amount: 980,
    status: 'confirmed',
    paymentMethod: 'Boleto'
  },
  {
    id: 'BK-004',
    customerName: 'Ana Costa',
    customerEmail: 'ana@email.com',
    packageId: '1',
    packageName: 'Maceió, Alagoas',
    date: '2023-10-27',
    amount: 1850,
    status: 'cancelled',
    paymentMethod: 'Credit Card'
  }
];