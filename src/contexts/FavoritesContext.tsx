'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Tipos para los favoritos
export interface FavoriteItem {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  seller?: string;
  dateAdded: string;
}

interface FavoritesState {
  items: FavoriteItem[];
  totalItems: number;
}

// Tipos para las acciones del reducer
type FavoritesAction =
  | { type: 'ADD_FAVORITE'; payload: Omit<FavoriteItem, 'dateAdded'> }
  | { type: 'REMOVE_FAVORITE'; payload: number }
  | { type: 'CLEAR_FAVORITES' }
  | { type: 'RESTORE_FAVORITES'; payload: FavoriteItem[] };

// Estado inicial
const initialState: FavoritesState = {
  items: [],
  totalItems: 0,
};

// Reducer para manejar el estado de favoritos
function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case 'ADD_FAVORITE':
      // Verificar si el item ya existe en favoritos
      if (state.items.some(item => item.id === action.payload.id)) {
        return state; // No agregar duplicados
      }
      
      const newFavoriteItem: FavoriteItem = {
        ...action.payload,
        dateAdded: new Date().toISOString(),
      };
      
      const newItems = [...state.items, newFavoriteItem];
      return {
        items: newItems,
        totalItems: newItems.length,
      };

    case 'REMOVE_FAVORITE':
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return {
        items: filteredItems,
        totalItems: filteredItems.length,
      };

    case 'CLEAR_FAVORITES':
      return initialState;

    case 'RESTORE_FAVORITES':
      return {
        items: action.payload,
        totalItems: action.payload.length,
      };

    default:
      return state;
  }
}

// Interfaz para el contexto
interface FavoritesContextType extends FavoritesState {
  addFavorite: (item: Omit<FavoriteItem, 'dateAdded'>) => void;
  removeFavorite: (id: number) => void;
  clearFavorites: () => void;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (item: Omit<FavoriteItem, 'dateAdded'>) => void;
}

// Crear el contexto
const FavoritesContext = createContext<FavoritesContextType | null>(null);

// Hook personalizado para usar el contexto
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe ser usado dentro de FavoritesProvider');
  }
  return context;
};

// Componente Provider
interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  // Restaurar favoritos desde localStorage al cargar
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('user_favorites');
      if (storedFavorites) {
        const favoriteItems: FavoriteItem[] = JSON.parse(storedFavorites);
        dispatch({ type: 'RESTORE_FAVORITES', payload: favoriteItems });
      }
    } catch (error) {
      console.error('Error al restaurar favoritos:', error);
      localStorage.removeItem('user_favorites');
    }
  }, []);

  // Guardar favoritos en localStorage cuando cambie el estado
  useEffect(() => {
    if (state.items.length > 0) {
      localStorage.setItem('user_favorites', JSON.stringify(state.items));
    } else {
      localStorage.removeItem('user_favorites');
    }
  }, [state.items]);

  // Funciones de favoritos
  const addFavorite = (item: Omit<FavoriteItem, 'dateAdded'>) => {
    dispatch({ type: 'ADD_FAVORITE', payload: item });
  };

  const removeFavorite = (id: number) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: id });
  };

  const clearFavorites = () => {
    dispatch({ type: 'CLEAR_FAVORITES' });
  };

  const isFavorite = (id: number) => {
    return state.items.some(item => item.id === id);
  };

  const toggleFavorite = (item: Omit<FavoriteItem, 'dateAdded'>) => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
  };

  const value: FavoritesContextType = {
    ...state,
    addFavorite,
    removeFavorite,
    clearFavorites,
    isFavorite,
    toggleFavorite,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};