export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'customer' | 'seller' | 'admin';
  verified: boolean;
  joinedAt: string;
  phone?: string;
  address?: string;
}

export const users: User[] = [
  { id: 'user-001', name: 'Alex Morgan', email: 'alex@limixi.com', avatar: '👤', role: 'customer', verified: true, joinedAt: '2025-08-15', phone: '+1 555-0101', address: '123 Main St, NYC' },
  { id: 'user-002', name: 'Sarah Chen', email: 'sarah@limixi.com', avatar: '👩', role: 'customer', verified: true, joinedAt: '2025-09-22', phone: '+1 555-0102', address: '456 Oak Ave, LA' },
  { id: 'user-003', name: 'Admin LIMIXI', email: 'admin@limixi.com', avatar: '🛡️', role: 'admin', verified: true, joinedAt: '2025-01-01' },
  { id: 'seller-001', name: 'TechVault Pro', email: 'tech@vault.com', avatar: '🏪', role: 'seller', verified: true, joinedAt: '2025-03-10' },
  { id: 'seller-002', name: 'Galaxy Store', email: 'galaxy@store.com', avatar: '🌌', role: 'seller', verified: true, joinedAt: '2025-04-15' },
  { id: 'seller-003', name: 'AudioPhile Hub', email: 'audio@phile.com', avatar: '🎵', role: 'seller', verified: true, joinedAt: '2025-05-20' },
  { id: 'seller-004', name: 'LuxTech', email: 'lux@tech.com', avatar: '✨', role: 'seller', verified: true, joinedAt: '2025-06-01' },
  { id: 'seller-005', name: 'Pixel Perfect', email: 'pixel@perfect.com', avatar: '📷', role: 'seller', verified: true, joinedAt: '2025-07-12' },
  { id: 'seller-006', name: 'Nothing Official', email: 'info@nothing.tech', avatar: '⚡', role: 'seller', verified: true, joinedAt: '2025-08-05' },
];

export const demoUser: User = users[0];
export const demoAdmin: User = users[2];
export const sellers = users.filter(u => u.role === 'seller');
