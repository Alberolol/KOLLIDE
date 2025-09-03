"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface NavigationContextType {
  isHamburgerMenuOpen: boolean;
  setIsHamburgerMenuOpen: (isOpen: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  return (
    <NavigationContext.Provider value={{ isHamburgerMenuOpen, setIsHamburgerMenuOpen }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
