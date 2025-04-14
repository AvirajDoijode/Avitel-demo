import { create } from 'zustand';

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  signIn: async (email, password) => {
    // Mock authentication
    set({ 
      user: { 
        id: '1', 
        email 
      } 
    });
  },
  signUp: async (email, password) => {
    // Mock sign up
    set({ 
      user: { 
        id: '1', 
        email 
      } 
    });
  },
  signOut: () => {
    set({ user: null });
  },
}));