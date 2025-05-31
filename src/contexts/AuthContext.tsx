"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authController } from '../controllers/AuthController';
import { apiService } from '../services/ApiService';

interface AuthContextProps {
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const validToken = authController.getValidToken();

    if (validToken) {
      apiService.setToken(validToken);
      setIsAuthenticated(true);
      setToken(validToken);
    } else {
      setIsAuthenticated(false);
      setToken(null);
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const accessToken = await authController.login(email, password);
    if (accessToken) {
      apiService.setToken(accessToken); 
      setIsAuthenticated(true);
      setToken(accessToken);
      return true;
    }
    return false;
  };

  const logout = () => {
    authController.logout();
    apiService.clearToken() 
    setIsAuthenticated(false);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
