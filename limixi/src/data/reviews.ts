export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  avatar: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
}

export const reviews: Review[] = [
  { id: 'rev-001', productId: 'prod-001', userId: 'user-001', userName: 'Alex Morgan', avatar: '👤', rating: 5, comment: 'Absolutely stunning phone. The camera quality is unreal and the titanium build feels incredibly premium.', createdAt: '2026-03-15', helpful: 42 },
  { id: 'rev-002', productId: 'prod-001', userId: 'user-002', userName: 'Sarah Chen', avatar: '👩', rating: 5, comment: 'Best phone I have ever owned. The battery lasts all day even with heavy usage.', createdAt: '2026-04-02', helpful: 28 },
  { id: 'rev-003', productId: 'prod-001', userId: 'user-003', userName: 'James Lee', avatar: '👨', rating: 4, comment: 'Great phone but the price is quite steep. Camera and performance are top-notch.', createdAt: '2026-04-18', helpful: 15 },
  { id: 'rev-004', productId: 'prod-004', userId: 'user-001', userName: 'Alex Morgan', avatar: '👤', rating: 5, comment: 'The noise cancellation is next level. Makes my commute so much more peaceful.', createdAt: '2026-05-10', helpful: 35 },
  { id: 'rev-005', productId: 'prod-004', userId: 'user-002', userName: 'Sarah Chen', avatar: '👩', rating: 4, comment: 'Sound quality is amazing. Slightly heavy for long sessions but overall excellent.', createdAt: '2026-05-22', helpful: 19 },
  { id: 'rev-006', productId: 'prod-005', userId: 'user-001', userName: 'Alex Morgan', avatar: '👤', rating: 5, comment: 'This machine is a beast. Compiles code in seconds. The display is breathtaking.', createdAt: '2026-03-20', helpful: 67 },
  { id: 'rev-007', productId: 'prod-002', userId: 'user-002', userName: 'Sarah Chen', avatar: '👩', rating: 5, comment: 'Galaxy AI features are game-changing. The 200MP camera captures incredible detail.', createdAt: '2026-04-05', helpful: 45 },
  { id: 'rev-008', productId: 'prod-003', userId: 'user-001', userName: 'Alex Morgan', avatar: '👤', rating: 4, comment: 'Perfect adventure companion. Battery life easily lasts my weekend hiking trips.', createdAt: '2026-05-01', helpful: 23 },
  { id: 'rev-009', productId: 'prod-012', userId: 'user-002', userName: 'Sarah Chen', avatar: '👩', rating: 5, comment: 'An absolute masterpiece. The craftsmanship and attention to detail is extraordinary.', createdAt: '2026-04-28', helpful: 56 },
  { id: 'rev-010', productId: 'prod-019', userId: 'user-001', userName: 'Alex Morgan', avatar: '👤', rating: 5, comment: 'Worth every penny. The lambskin leather and titanium drivers deliver an unparalleled audio experience.', createdAt: '2026-03-25', helpful: 38 },
];

export function getReviewsByProductId(productId: string): Review[] {
  return reviews.filter(r => r.productId === productId);
}
