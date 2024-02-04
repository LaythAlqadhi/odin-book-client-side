import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import useFetch from '../hooks/useFetch';
import Posts from '../components/Posts';

const API_URL =
  'https://b32a7bae-6556-4da3-a848-f0e0b80bf4f0-00-36mr5e3zsor9c.janeway.replit.dev/v1/posts';

function HomePage() {
  const { payload } = useAuth();
  
  return (
    <div>
      <Posts token={payload?.token} />
    </div>
  );
}

export default HomePage;
