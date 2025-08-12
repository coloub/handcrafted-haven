'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Tipos para el usuario y estado de autenticación
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedDate: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Tipos para las acciones del reducer
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_ERROR' }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_ERROR' }
  | { type: 'RESTORE_SESSION'; payload: User };

// Estado inicial
const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
};

// Reducer para manejar el estado de autenticación
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return {
        ...state,
        isLoading: true,
      };
    
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuthenticated: true,
      };
    
    case 'LOGIN_ERROR':
    case 'REGISTER_ERROR':
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    
    case 'RESTORE_SESSION':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuthenticated: true,
      };
    
    default:
      return state;
  }
}

// Interfaz para el contexto
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | null>(null);

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

// Componente Provider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restaurar sesión al cargar la aplicación
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        const user: User = JSON.parse(storedUser);
        dispatch({ type: 'RESTORE_SESSION', payload: user });
      } catch (error) {
        console.error('Error al restaurar sesión:', error);
        localStorage.removeItem('auth_user');
      }
    }
  }, []);

  // Función para login (simulado)
  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validación básica (en producción esto sería una llamada real a la API)
      const storedUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const user = storedUsers.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        const authenticatedUser: User = {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          joinedDate: user.joinedDate,
        };
        
        localStorage.setItem('auth_user', JSON.stringify(authenticatedUser));
        dispatch({ type: 'LOGIN_SUCCESS', payload: authenticatedUser });
        return true;
      } else {
        dispatch({ type: 'LOGIN_ERROR' });
        return false;
      }
    } catch (error) {
      console.error('Error en login:', error);
      dispatch({ type: 'LOGIN_ERROR' });
      return false;
    }
  };

  // Función para registro (simulado)
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'REGISTER_START' });
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verificar si el email ya existe
      const storedUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const emailExists = storedUsers.some((u: any) => u.email === email);
      
      if (emailExists) {
        dispatch({ type: 'REGISTER_ERROR' });
        return false;
      }
      
      // Crear nuevo usuario
      const newUser: User & { password: string } = {
        id: `user_${Date.now()}`,
        name,
        email,
        password, // En producción esto estaría hasheado
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80`,
        joinedDate: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long' 
        }),
      };
      
      // Guardar en "base de datos" simulada
      storedUsers.push(newUser);
      localStorage.setItem('registered_users', JSON.stringify(storedUsers));
      
      // Autenticar automáticamente después del registro
      const authenticatedUser: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        joinedDate: newUser.joinedDate,
      };
      
      localStorage.setItem('auth_user', JSON.stringify(authenticatedUser));
      dispatch({ type: 'REGISTER_SUCCESS', payload: authenticatedUser });
      return true;
    } catch (error) {
      console.error('Error en registro:', error);
      dispatch({ type: 'REGISTER_ERROR' });
      return false;
    }
  };

  // Función para logout
  const logout = () => {
    localStorage.removeItem('auth_user');
    dispatch({ type: 'LOGOUT' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};