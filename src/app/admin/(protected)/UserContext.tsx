"use client";

import { createContext, useContext } from 'react';

export type AuthUser = {
  userId: string;
  email: string;
  name: string;
  role: string;
};

const UserContext = createContext<AuthUser | null>(null);

export function UserProvider({ 
  children, 
  user 
}: { 
  children: React.ReactNode; 
  user: AuthUser;
}) {
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const user = useContext(UserContext);
  if (!user) {
    throw new Error('useUser must be used within UserProvider');
  }
  return user;
}
