import { useState } from 'react';

export default function useAsync() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const executeAsyncLogic = (asyncLogic) => {
    setError(null);
    setIsLoading(true);
    asyncLogic()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return [isLoading, data, executeAsyncLogic, error];
}
