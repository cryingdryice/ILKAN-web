// src/context/LoadingContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

type LoadingContextType = {
  loading: boolean;
  setLoading: (v: boolean) => void;
};

const Ctx = createContext<LoadingContextType | null>(null);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  return (
    <Ctx.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <div className="loading-overlay" />}
    </Ctx.Provider>
  );
}

export function useLoading() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLoading must be used within LoadingProvider");
  return ctx;
}
