export interface Order {
  id: string;
  userId: string;
  items: { productId: string; productName: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: string;
  paymentMethod: string;
}

export const orders: Order[] = [
  {
    id: 'ORD-2026-001',
    userId: 'user-001',
    items: [
      { productId: 'prod-001', productName: 'iPhone 16 Pro Max', quantity: 1, price: 1199 },
      { productId: 'prod-006', productName: 'AirPods Pro 3', quantity: 1, price: 279 },
    ],
    total: 1478,
    status: 'delivered',
    createdAt: '2026-05-20',
    shippingAddress: '123 Main St, NYC',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'ORD-2026-002',
    userId: 'user-001',
    items: [
      { productId: 'prod-004', productName: 'Sony WH-1000XM6', quantity: 1, price: 399 },
    ],
    total: 399,
    status: 'shipped',
    createdAt: '2026-06-01',
    shippingAddress: '123 Main St, NYC',
    paymentMethod: 'PayPal',
  },
  {
    id: 'ORD-2026-003',
    userId: 'user-002',
    items: [
      { productId: 'prod-005', productName: 'MacBook Pro 16" M4 Max', quantity: 1, price: 3499 },
    ],
    total: 3499,
    status: 'processing',
    createdAt: '2026-06-10',
    shippingAddress: '456 Oak Ave, LA',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'ORD-2026-004',
    userId: 'user-001',
    items: [
      { productId: 'prod-003', productName: 'Apple Watch Ultra 3', quantity: 1, price: 799 },
      { productId: 'prod-013', productName: 'Ray-Ban Meta Smart Glasses', quantity: 1, price: 299 },
    ],
    total: 1098,
    status: 'pending',
    createdAt: '2026-06-12',
    shippingAddress: '123 Main St, NYC',
    paymentMethod: 'Crypto',
  },
];

export function getOrdersByUserId(userId: string): Order[] {
  return orders.filter(o => o.userId === userId);
}
