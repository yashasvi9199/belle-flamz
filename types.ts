export interface Fragrance {
  id: string;
  name: string;
  notes: string[];
  intensity: number; // 1-10
  price: number;
  inStock: boolean;
  popularity: number; // For sorting (higher first, not shown in UI)
}

export interface GalleryImage {
  id: string;
  src: string;
  title: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  year: string;
}

export interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

export interface CandleDesignState {
  shape: 'pillar' | 'jar' | 'custom';
  fragranceId: string;
  color: string;
  customImage?: string; // Base64 or data URL for uploaded image
}

export enum SectionId {
  HERO = 'hero',
  GALLERY = 'gallery',
  INVENTORY = 'inventory',
  DESIGNER = 'designer',
  CONTACT = 'contact'
}