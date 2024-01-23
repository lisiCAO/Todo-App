'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
interface AuthContextType {
  userName: string | null;
  isLoggedIn: boolean;
  logOut: () => void;
  login: (credentials: { email: string; password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext);
export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);

  // Check if user is logged in
  useEffect(() => {
    const checkLogin = async () => {
      const response = await fetch('http://localhost:3000/api/me', { credentials: 'include' });
      const data = await response.json();
      if (data.user) {
        const { email } = data.user;
        setUserName(email);
        setisLoggedIn(true);
      }
    };
    checkLogin();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });      
      const data = await response.json();
      setUserName(data.email);
      setisLoggedIn(true);
      router.push('/todos');
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  // Dummy log in/out functionality
  const logOut = async () => {
    await fetch('http://localhost:3000/api/logout', { method: 'POST', credentials: 'include' });
    setUserName(null);
    setisLoggedIn(false);
    router.push('/todos');
  };

  const value = {
    userName,
    isLoggedIn,
    login,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
