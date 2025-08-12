'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Tipos para el carrito
export interface CartItem {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  seller?: string;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Tipos para las acciones del reducer
type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'RESTORE_CART'; payload: CartItem[] };

// Estado inicial
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Función para calcular totales
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return { totalItems, totalPrice };
};

// Reducer para manejar el estado del carrito
function cartReducer(state: CartState, action: CartAction): CartState {
  let newItems: CartItem[];
  
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIndex >= 0) {
        // Si el producto ya existe, incrementar cantidad
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si es un producto nuevo, agregarlo con cantidad 1
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      
      const addTotals = calculateTotals(newItems);
      return {
        items: newItems,
        totalItems: addTotals.totalItems,
        totalPrice: addTotals.totalPrice,
      };

    case 'REMOVE_ITEM':
      newItems = state.items.filter(item => item.id !== action.payload);
      const removeTotals = calculateTotals(newItems);
      return {
        items: newItems,
        totalItems: removeTotals.totalItems,
        totalPrice: removeTotals.totalPrice,
      };

    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        // Si la cantidad es 0 o menor, remover el item
        newItems = state.items.filter(item => item.id !== action.payload.id);
      } else {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      }
      
      const updateTotals = calculateTotals(newItems);
      return {
        items: newItems,
        totalItems: updateTotals.totalItems,
        totalPrice: updateTotals.totalPrice,
      };

    case 'CLEAR_CART':
      return initialState;

    case 'RESTORE_CART':
      const restoreTotals = calculateTotals(action.payload);
      return {
        items: action.payload,
        totalItems: restoreTotals.totalItems,
        totalPrice: restoreTotals.totalPrice,
      };

    default:
      return state;
  }
}

// Interfaz para el contexto
interface CartContextType extends CartState {
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
  getItemQuantity: (id: number) => number;
}

// Crear el contexto
const CartContext = createContext<CartContextType | null>(null);

// Hook personalizado para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider');
  }
  return context;
};

// Componente Provider
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Restaurar carrito desde localStorage al cargar
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('shopping_cart');
      if (storedCart) {
        const cartItems: CartItem[] = JSON.parse(storedCart);
        dispatch({ type: 'RESTORE_CART', payload: cartItems });
      }
    } catch (error) {
      console.error('Error al restaurar carrito:', error);
      localStorage.removeItem('shopping_cart');
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie el estado
  useEffect(() => {
    if (state.items.length > 0) {
      localStorage.setItem('shopping_cart', JSON.stringify(state.items));
    } else {
      localStorage.removeItem('shopping_cart');
    }
  }, [state.items]);

  // Funciones del carrito
  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isInCart = (id: number) => {
    return state.items.some(item => item.id === id);
  };

  const getItemQuantity = (id: number) => {
    const item = state.items.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  const value: CartContextType = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};