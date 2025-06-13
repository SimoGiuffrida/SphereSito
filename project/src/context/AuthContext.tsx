import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { authStateListener, loginUser, registerUser, logoutUser } from '../firebase/firebase';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Inizializzazione con valori predefiniti per evitare problemi di undefined
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: async () => {}, // Funzione vuota
  register: async () => {}, // Funzione vuota
  logout: async () => {}, // Funzione vuota
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Inizialmente a true per indicare che stiamo caricando

  useEffect(() => {
    // onAuthStateChanged restituisce una funzione di unsubscribe
    const unsubscribe = authStateListener((user) => {
      setCurrentUser(user);
      setLoading(false); // Una volta che lo stato è noto, imposta loading a false
    });

    // Funzione di cleanup: viene chiamata quando il componente AuthProvider viene smontato
    return unsubscribe;
  }, []); // Esegui solo al mount e unmount del componente

  const login = async (email: string, password: string) => {
    try {
      await loginUser(email, password);
      // Lo stato currentUser sarà aggiornato dal listener authStateListener
    } catch (error) {
      console.error('Errore durante il login:', error);
      throw error; // Rilancia l'errore per gestirlo nel componente Auth.tsx
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await registerUser(email, password);
      // Lo stato currentUser sarà aggiornato dal listener authStateListener
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      throw error; // Rilancia l'errore
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      // Lo stato currentUser sarà aggiornato dal listener authStateListener a null
    } catch (error) {
      console.error('Errore durante il logout:', error);
      throw error; // Rilancia l'errore
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout
  };

  // Renderizza i children solo dopo che lo stato di caricamento è terminato
  // O mostra un placeholder di caricamento
  return (
    <AuthContext.Provider value={value}>
      {
        children
      }
    </AuthContext.Provider>
  );
};