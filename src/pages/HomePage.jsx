import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Posts from '../components/Posts';

function HomePage() {
  const { payload } = useAuth();
  
  return (
    <div>
      <Posts token={payload?.token} />
    </div>
  );
}

export default HomePage;
