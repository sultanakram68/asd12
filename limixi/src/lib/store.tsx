'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '@/data/products';

// ─── Types ─────────────────────────────────────────────
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AppState {
  cart: CartItem[];
  wishlist: string[];
  isAuthenticated: boolean;
  user: { id: string; name: string; email: string; role: string; avatar: string } | null;
  mobileMenuOpen: boolean;
  searchQuery: string;
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
  | { type: 'SET_SEARCH'; query: string };

// ─── Initial State ─────────────────────────────────────
const initialState: AppState = {
  cart: [],
  wishlist: [],
  isAuthenticated: false,
  user: null,
  mobileMenuOpen: false,
  searchQuery: '',
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
