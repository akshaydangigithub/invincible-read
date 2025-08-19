"use client";
import { createContext, useContext, ReactNode } from "react";
import { useLenis } from "@/hooks/useLenis";

interface LenisContextType {
  // Add any context values you need
}

const LenisContext = createContext<LenisContextType | undefined>(undefined);

interface LenisProviderProps {
  children: ReactNode;
}

export const LenisProvider = ({ children }: LenisProviderProps) => {
  useLenis();

  return (
    <LenisContext.Provider value={{}}>
      {children}
    </LenisContext.Provider>
  );
};

export const useLenisContext = (): LenisContextType => {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error("useLenisContext must be used within LenisProvider");
  }
  return context;
};