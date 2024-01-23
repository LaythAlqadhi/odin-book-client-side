import { useState } from 'react';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = (url, token, method = 'GET', data) => {
    const options = {
      method,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      ...(method !== 'GET' && data && { body: JSON.stringify(data) }),
    };

    setLoading(true);

    fetch(url, options)
      .then(response => response.json())
      .then(result => setData(result))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  };

  return { fetchData, data, loading, error };
};

export default useFetch;
