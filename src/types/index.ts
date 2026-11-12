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
