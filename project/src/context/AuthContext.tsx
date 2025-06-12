import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { authStateListener, loginUser, registerUser, logoutUser } from '../firebase/firebase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = authStateListener((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await loginUser(email, password);
      navigate('/');
    } catch (error) {
      console.error('Errore durante il login:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await registerUser(email, password);
      navigate('/');
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      navigate('/');
    } catch (error) {
      console.error('Errore durante il logout:', error);
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};