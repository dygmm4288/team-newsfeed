import { useEffect, useState } from 'react';

export default function useAsync({ handleError }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!error || !handleError) return;
    handleError(error);
  }, [error]);

  const runAsyncTask = async (
    taskName,

    { asyncAction, onSuccess, onError, onFinally }
  ) => {
    setIsLoading(true);
    setIsError(true);
    setError(null);
    try {
      const result = await asyncAction();
      if (onSuccess) await onSuccess(result);
    } catch (err) {
      console.error('Error in ' + taskName, err);
      setError(err);
      setIsError(false);
      onError(err);
    } finally {
      setIsLoading(false);
      if (onFinally) await onFinally();
    }
  };

  return [isLoading, runAsyncTask, isError];
}
