import { createContext, useCallback, useState } from 'react';

type ProgressContextType = {
  progress: ProgressType;
  showCart: () => void;
  hideCart: () => void;
  showCheckout: () => void;
  hideCheckOut: () => void;
};

export const ProgressContext = createContext<ProgressContextType>({
  progress: null,
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckOut: () => {},
});

type ProgressContextProviderProps = {
  children: React.ReactNode;
};
type ProgressType = 'CART' | 'CHECKOUT' | null;
export function ProgressContextProvider({ children }: ProgressContextProviderProps) {
  const [progress, setProgress] = useState<ProgressType>(null);
  const showCart = () => {
    setProgress('CART');
  };
  const hideCart = useCallback(() => {
    setProgress(null);
  }, []);

  const showCheckout = useCallback(() => {
    setProgress('CHECKOUT');
  }, []);

  const hideCheckOut = useCallback(() => {
    setProgress(null);
  }, []);

  const progressContextValue = {
    progress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckOut,
  };

  return <ProgressContext.Provider value={progressContextValue}>{children}</ProgressContext.Provider>;
}
