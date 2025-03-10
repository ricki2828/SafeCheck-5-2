import { useState, useCallback } from 'react';

interface ErrorState {
  message: string;
  code?: string;
  technical?: string;
}

export function useErrorHandler() {
  const [error, setError] = useState<ErrorState | null>(null);

  const handleError = useCallback((err: unknown) => {
    console.error('Error caught:', err);

    if (err instanceof Error) {
      setError({
        message: err.message,
        technical: err.stack,
      });
    } else if (typeof err === 'string') {
      setError({
        message: err,
      });
    } else {
      setError({
        message: 'An unexpected error occurred',
        technical: JSON.stringify(err),
      });
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError,
  };
} 