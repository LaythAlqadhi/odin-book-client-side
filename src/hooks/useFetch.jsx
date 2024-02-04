import { useState } from 'react';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = (url, token, method = 'GET', payload = null) => {
    const options = {
      method,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...(method !== 'GET' && payload && { body: JSON.stringify(payload) }),
    };

    setLoading(true);

    fetch(url, options)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return {
    fetchData,
    data,
    loading,
    error,
    setData,
    setLoading,
    setError,
  };
};

export default useFetch;
