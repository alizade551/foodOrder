import { useCallback, useEffect, useState } from 'react';

type HttpConfig = {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
};

type HttpResponse<T> = {
  data: T | undefined;
  error: string | null;
  isLoading: boolean;
  sendRequest: (data?: string) => Promise<void>;
  clearData: () => void;
};

async function sendHttpRequest<T>(url: string, config?: HttpConfig): Promise<T> {
  const response = await fetch(url, config);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message || 'Something went wrong, failed to send request');
  }
  return resData;
}

function useHttp<T>(url: string, config?: HttpConfig, initialData?: T): HttpResponse<T> {
  const [data, setData] = useState<T | undefined>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const clearData = () => setData(initialData);

  const sendRequest = useCallback(
    async function sendRequest(requestData?: string) {
      setIsLoading(true);
      try {
        const updatedConfig = requestData ? { ...config, body: requestData } : config;
        const resData = await sendHttpRequest<T>(url, updatedConfig);
        setData(resData);
        setError(null);
      } catch (error) {
        setError((error as Error).message || 'Something went wrong');
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === 'GET' || !config?.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    error,
    isLoading,
    sendRequest,
    clearData,
  };
}

export default useHttp;
