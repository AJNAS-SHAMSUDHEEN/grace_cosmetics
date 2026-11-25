export interface Product {
  id: string;
  name: string;
  subTitle: string;
  category: 'Skincare' | 'Cleansers' | 'Serums' | 'Moisturizers' | 'Sunscreen' | 'Face Masks' | 'Beauty Essentials';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  volume: string;
  tag?: 'Best Seller' | 'New' | 'Award Winner' | 'Limited Edition' | 'Cellular Exclusive';
  image: string;
  gallery: string[];
  description: string;
  shortDescription: string;
  keyBenefits: string[];
  ingredientsList: string[];
  activeCompounds: {
    name: string;
    percentage: string;
    description: string;
  }[];
  usageDirections: string;
  skinType: string[];
  texture: string;
  finishColor?: string;
  is3dAvailable?: boolean;
  inStock?: boolean;
  stockCount?: number;
}

export interface Collection {
  id: string;
  name: string;
  tagline: string;
  description: string;
  itemCount: number;
  image: string;
  accentColor: string;
}

export interface Ingredient {
  id: string;
  name: string;
  chemicalName: string;
  molecularFormula: string;
  category: string;
  description: string;
  origin: string;
  cellularAction: string;
  clinicalResults: string;
  image: string;
  color: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVolume?: string;
}

export interface FilterState {
  category: string;
  searchQuery: string;
  priceRange: [number, number];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  skinType: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export type UserRole = 'customer' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  phone?: string;
  addresses: Address[];
  createdAt: string;
}

export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cod' | 'card_test';
export type PaymentStatus = 'paid' | 'pending' | 'failed';

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  couponCode?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minOrder: number;
  description: string;
  isActive: boolean;
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
