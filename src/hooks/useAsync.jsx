import { useState } from 'react';

export default function useAsync() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeAsyncLogic = async (taskName, asyncApi, options) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await asyncApi();
      if (options?.asyncTask) await options.asyncTask(result);
    } catch (err) {
      setError(err);
      console.error(`An Error occurred while ${taskName}`);
      console.error(err);
    } finally {
      setIsLoading(false);
      if (options?.finallyTask) await options.finallyTask();
    }
  };

  return [isLoading, executeAsyncLogic, error];
}
