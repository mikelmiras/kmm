"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define types for the user state
interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Create the context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  // State for holding user data
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    // Check localStorage or other storage mechanism for the user data
    fetch("/api/auth/me").then(data => data.json()).then(data => {
      if (data.error) return
      setUser(data)
    })
    // Optionally, you can also fetch from an API here if needed
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for accessing the user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
