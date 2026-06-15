'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, products as initialProducts } from '@/data/products';
import { orders as initialOrders, Order } from '@/data/orders';

// ─── Types ─────────────────────────────────────────────
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PendingSeller {
  name: string;
  email: string;
  date: string;
  products: string;
}

export interface AppState {
  cart: CartItem[];
  wishlist: string[];
  isAuthenticated: boolean;
  user: { id: string; name: string; email: string; role: string; avatar: string } | null;
  mobileMenuOpen: boolean;
  searchQuery: string;
  products: Product[];
  pendingProducts: Product[];
  pendingSellers: PendingSeller[];
  orders: Order[];
}

type Action =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_WISHLIST'; productId: string }
  | { type: 'LOGIN'; user: AppState['user'] }
  | { type: 'LOGOUT' }
  | { type: 'SET_MOBILE_MENU'; open: boolean }
  | { type: 'SET_SEARCH'; query: string }
  | { type: 'ADD_PENDING_PRODUCT'; product: Product }
  | { type: 'APPROVE_PRODUCT'; productId: string }
  | { type: 'REJECT_PRODUCT'; productId: string }
  | { type: 'APPROVE_SELLER'; email: string }
  | { type: 'REJECT_SELLER'; email: string }
  | { type: 'ADD_ORDER'; order: Order };

// ─── Initial State ─────────────────────────────────────
const initialPendingProducts: Product[] = [
  {
    id: 'pending-001',
    name: 'Xiaomi 15 Ultra',
    price: 899,
    description: 'Next-generation Xiaomi smartphone featuring Leica optics and Snapdragon 8 Elite.',
    shortDescription: 'Xiaomi flagship with Leica camera and Snapdragon 8 Elite',
    category: 'phones',
    rating: 0,
    reviewCount: 0,
    seller: { id: 'seller-007', name: 'TechZone Global', avatar: '🏪', verified: false },
    images: [],
    emoji: '📱',
    specs: { 'Display': '6.73" AMOLED', 'Chip': 'Snapdragon 8 Elite', 'Camera': '50MP Quad' },
    inStock: true,
    featured: false,
    trending: false,
    tags: ['xiaomi', 'flagship'],
    createdAt: '2026-06-10',
  },
  {
    id: 'pending-002',
    name: 'Marshall Major V',
    price: 149,
    description: 'Marshall iconic on-ear headphones with 100+ hours of wireless playtime and customized sound.',
    shortDescription: 'Iconic on-ear headphones with 100+ hours battery',
    category: 'audio',
    rating: 0,
    reviewCount: 0,
    seller: { id: 'seller-008', name: 'SmartGear Co.', avatar: '🏪', verified: false },
    images: [],
    emoji: '🎧',
    specs: { 'Battery': '100+ hours', 'Bluetooth': 'LE Audio' },
    inStock: true,
    featured: false,
    trending: false,
    tags: ['marshall', 'headphones'],
    createdAt: '2026-06-11',
  },
  {
    id: 'pending-003',
    name: 'Amazfit T-Rex 3',
    price: 279,
    description: 'Amazfit rugged outdoor GPS smartwatch with military-grade toughness and 27-day battery life.',
    shortDescription: 'Rugged outdoor smartwatch with 27-day battery',
    category: 'watches',
    rating: 0,
    reviewCount: 0,
    seller: { id: 'seller-009', name: 'EliteTech Store', avatar: '🏪', verified: false },
    images: [],
    emoji: '⌚',
    specs: { 'Case': 'Polymer', 'Battery': '27 days' },
    inStock: true,
    featured: false,
    trending: false,
    tags: ['amazfit', 'smartwatch'],
    createdAt: '2026-06-12',
  }
];

const initialPendingSellers: PendingSeller[] = [
  { name: 'TechZone Global', email: 'info@techzone.com', date: 'Jun 10', products: '12 listed' },
  { name: 'SmartGear Co.', email: 'apply@smartgear.io', date: 'Jun 11', products: '8 planned' },
  { name: 'EliteTech Store', email: 'hello@elitetech.com', date: 'Jun 12', products: '20+ planned' },
];

const initialState: AppState = {
  cart: [],
  wishlist: [],
  isAuthenticated: false,
  user: null,
  mobileMenuOpen: false,
  searchQuery: '',
  products: initialProducts,
  pendingProducts: initialPendingProducts,
  pendingSellers: initialPendingSellers,
  orders: initialOrders,
};

// ─── Reducer ───────────────────────────────────────────
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const exists = state.cart.find(item => item.product.id === action.product.id);
      if (exists) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, { product: action.product, quantity: 1 }] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.product.id !== action.productId) };
    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return { ...state, cart: state.cart.filter(item => item.product.id !== action.productId) };
      }
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.productId ? { ...item, quantity: action.quantity } : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'TOGGLE_WISHLIST': {
      const inWishlist = state.wishlist.includes(action.productId);
      return {
        ...state,
        wishlist: inWishlist
          ? state.wishlist.filter(id => id !== action.productId)
          : [...state.wishlist, action.productId],
      };
    }
    case 'LOGIN':
      return { ...state, isAuthenticated: true, user: action.user };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null };
    case 'SET_MOBILE_MENU':
      return { ...state, mobileMenuOpen: action.open };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.query };
    case 'ADD_PENDING_PRODUCT':
      return { ...state, pendingProducts: [...state.pendingProducts, action.product] };
    case 'APPROVE_PRODUCT': {
      const prod = state.pendingProducts.find(p => p.id === action.productId);
      if (!prod) return state;
      const approvedProd = { ...prod, id: `prod-${Date.now()}` };
      return {
        ...state,
        pendingProducts: state.pendingProducts.filter(p => p.id !== action.productId),
        products: [...state.products, approvedProd]
      };
    }
    case 'REJECT_PRODUCT':
      return {
        ...state,
        pendingProducts: state.pendingProducts.filter(p => p.id !== action.productId)
      };
    case 'APPROVE_SELLER':
      return {
        ...state,
        pendingSellers: state.pendingSellers.filter(s => s.email !== action.email)
      };
    case 'REJECT_SELLER':
      return {
        ...state,
        pendingSellers: state.pendingSellers.filter(s => s.email !== action.email)
      };
    case 'ADD_ORDER':
      return { ...state, orders: [...state.orders, action.order] };
    default:
      return state;
  }
}

// ─── Context ───────────────────────────────────────────
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

// ─── Provider ──────────────────────────────────────────
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// ─── Hook ──────────────────────────────────────────────
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}

// ─── Selectors ─────────────────────────────────────────
export function useCart() {
  const { state, dispatch } = useApp();
  const cartTotal = state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items: state.cart,
    total: cartTotal,
    count: cartCount,
    addToCart: (product: Product) => dispatch({ type: 'ADD_TO_CART', product }),
    removeFromCart: (productId: string) => dispatch({ type: 'REMOVE_FROM_CART', productId }),
    updateQuantity: (productId: string, quantity: number) =>
      dispatch({ type: 'UPDATE_QUANTITY', productId, quantity }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
  };
}

export function useWishlist() {
  const { state, dispatch } = useApp();
  return {
    items: state.wishlist,
    isInWishlist: (productId: string) => state.wishlist.includes(productId),
    toggleWishlist: (productId: string) => dispatch({ type: 'TOGGLE_WISHLIST', productId }),
  };
}

export function useAuth() {
  const { state, dispatch } = useApp();
  return {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    login: (user: AppState['user']) => dispatch({ type: 'LOGIN', user }),
    logout: () => dispatch({ type: 'LOGOUT' }),
  };
}
