"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

// Mock user database
const MOCK_USERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password456',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    // Check if we're running in the browser
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('authUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsReady(true);
    }
  }, []);

  // Save user to localStorage when logged in
  useEffect(() => {
    if (typeof window !== 'undefined' && isReady && user) {
      localStorage.setItem('authUser', JSON.stringify(user));
    } else if (typeof window !== 'undefined' && isReady) {
      localStorage.removeItem('authUser');
    }
  }, [user, isReady]);

  const login = (email, password) => {
    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      return { success: true, user: foundUser };
    } else {
      return { success: false, message: 'Invalid credentials' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isReady }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy usage - with fallback default value for SSR
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  // Return default values if context is undefined (during SSR)
  if (context === undefined) {
    return {
      user: null,
      login: () => ({ success: false, message: 'Auth not initialized' }),
      logout: () => {},
      isAuthenticated: false,
      isReady: false
    };
  }
  
  return context;
};