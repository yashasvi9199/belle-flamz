import { Fragrance, ProjectItem } from './types';

export const FRAGRANCES: Fragrance[] = [
  { id: 'f1', name: 'Midnight Oud', notes: ['Oud', 'Rose', 'Amber'], intensity: 9, price: 45, inStock: true },
  { id: 'f2', name: 'Desert Sage', notes: ['Sage', 'Sea Salt', 'Driftwood'], intensity: 5, price: 35, inStock: true },
  { id: 'f3', name: 'Spiced Pumpkin', notes: ['Cinnamon', 'Nutmeg', 'Pumpkin'], intensity: 7, price: 38, inStock: false },
  { id: 'f4', name: 'Vanilla Bean', notes: ['Vanilla', 'Cream', 'Musk'], intensity: 4, price: 30, inStock: true },
  { id: 'f5', name: 'Smoked Leather', notes: ['Leather', 'Tobacco', 'Cedar'], intensity: 8, price: 50, inStock: true },
];

export const PROJECTS: ProjectItem[] = [
  { id: 'p1', title: 'The Obsidian Monolith', description: 'A limited edition pure black wax series.', imageUrl: 'https://picsum.photos/600/800', year: '2023' },
  { id: 'p2', title: 'Golden Hour', description: 'Translucent amber poured into recycled glass.', imageUrl: 'https://picsum.photos/600/600', year: '2024' },
  { id: 'p3', title: 'Ephemeral Bloom', description: 'Floral sculpts that change shape as they burn.', imageUrl: 'https://picsum.photos/800/600', year: '2024' },
];

export const COLORS = {
  MAGMA: '#FC5C02',
  BONE: '#E2CEAE',
  TAUPE: '#7C6B51',
  OBSIDIAN: '#312B1E',
};