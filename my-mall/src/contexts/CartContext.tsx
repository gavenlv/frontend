import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { CartItem, CartState, CartAction } from '../types/cart';

interface CartContextType {
  state: CartState;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find((item: CartItem) => item.productId === action.payload.productId);
      
      if (existingItem) {
        const updatedItems = state.items.map((item: CartItem) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return calculateTotals({ ...state, items: updatedItems });
      } else {
        return calculateTotals({
          ...state,
          items: [...state.items, action.payload],
        });
      }
    }
    
    case 'REMOVE_FROM_CART': {
      const filteredItems = state.items.filter((item: CartItem) => item.productId !== action.payload);
      return calculateTotals({ ...state, items: filteredItems });
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        const filteredItems = state.items.filter((item: CartItem) => item.productId !== action.payload.productId);
        return calculateTotals({ ...state, items: filteredItems });
      }
      
      const updatedItems = state.items.map((item: CartItem) =>
        item.productId === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return calculateTotals({ ...state, items: updatedItems });
    }
    
    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };
    
    case 'LOAD_CART':
      return calculateTotals({ ...state, items: action.payload });
    
    default:
      return state;
  }
}

function calculateTotals(state: CartState): CartState {
  const itemCount = state.items.reduce((count: number, item: CartItem) => count + item.quantity, 0);
  const total = state.items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
  
  return {
    ...state,
    itemCount,
    total,
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // 从localStorage加载购物车数据
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartData });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // 保存购物车数据到localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (productId: string, quantity = 1) => {
    // 这里需要获取产品信息，暂时使用模拟数据
    const mockProduct: CartItem = {
      productId,
      name: `Product ${productId}`,
      price: 99.99,
      image: '/placeholder-product.jpg',
      quantity,
    };
    
    dispatch({ type: 'ADD_TO_CART', payload: mockProduct });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalItems = () => state.itemCount;

  const getTotalPrice = () => state.total;

  const value: CartContextType = {
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 