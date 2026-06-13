export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  productCount: number;
  color: string;
}

export const categories: Category[] = [
  {
    id: 'cat-001',
    name: 'Smartphones',
    slug: 'phones',
    icon: '📱',
    description: 'Flagship phones from top brands',
    productCount: 5,
    color: '#FF6A00',
  },
  {
    id: 'cat-002',
    name: 'Smartwatches',
    slug: 'watches',
    icon: '⌚',
    description: 'Premium wearable technology',
    productCount: 4,
    color: '#00D4FF',
  },
  {
    id: 'cat-003',
    name: 'Audio',
    slug: 'audio',
    icon: '🎧',
    description: 'Headphones, earbuds & speakers',
    productCount: 5,
    color: '#8A5CFF',
  },
  {
    id: 'cat-004',
    name: 'Laptops & Tablets',
    slug: 'accessories',
    icon: '💻',
    description: 'Powerful computing devices',
    productCount: 6,
    color: '#FF2E93',
  },
];
