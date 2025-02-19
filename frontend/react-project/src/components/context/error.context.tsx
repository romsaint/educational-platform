import { createContext, ReactNode, useContext, useState } from "react";

interface ErrorContextType {
  error: string | null;
  setError: (error: string | null) => void;
}

export const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function ErrorContextProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<string | null>(null);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
}

// Хук для использования контекста
export const useError = () => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error("useError must be used within an ErrorContextProvider");
  }
  return context;
};