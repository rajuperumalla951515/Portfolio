/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const TransitionContext = createContext({
  isTransitioningToDecode: false,
  isTransitioningToPortfolio: false,
  startTransitionToDecode: () => {},
  startTransitionToPortfolio: () => {},
});

export const TransitionProvider = ({ children }) => {
  const [isTransitioningToDecode, setIsTransitioningToDecode] = useState(false);
  const [isTransitioningToPortfolio, setIsTransitioningToPortfolio] = useState(false);

  // Reset transition states whenever browser navigation (back/forward) occurs
  useEffect(() => {
    const handlePopState = () => {
      setIsTransitioningToDecode(false);
      setIsTransitioningToPortfolio(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const startTransitionToDecode = useCallback((onComplete) => {
    setIsTransitioningToDecode(true);
    const timer = setTimeout(() => {
      if (typeof onComplete === 'function') {
        onComplete();
      }
      setTimeout(() => {
        setIsTransitioningToDecode(false);
      }, 80);
    }, 380);

    return () => clearTimeout(timer);
  }, []);

  const startTransitionToPortfolio = useCallback((onComplete) => {
    setIsTransitioningToPortfolio(true);
    const timer = setTimeout(() => {
      if (typeof onComplete === 'function') {
        onComplete();
      }
      setTimeout(() => {
        setIsTransitioningToPortfolio(false);
      }, 80);
    }, 320);

    return () => clearTimeout(timer);
  }, []);

  return (
    <TransitionContext.Provider
      value={{
        isTransitioningToDecode,
        isTransitioningToPortfolio,
        startTransitionToDecode,
        startTransitionToPortfolio,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransitionContext = () => useContext(TransitionContext);
export default TransitionContext;
