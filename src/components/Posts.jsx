import React, { useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import Post from './Post';

const API_URL =
  'https://b32a7bae-6556-4da3-a848-f0e0b80bf4f0-00-36mr5e3zsor9c.janeway.replit.dev/v1';

function Posts({ userId, token }) {
  const { fetchData, data, loading, error } = useFetch();

  useEffect(() => {
    fetchData(`${API_URL}/posts/${userId}`, token);
  }, [API_URL, userId, token]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong.</div>;

  if (data && data.posts) {
    return data.posts.map((post) => <Post key={post.id} post={post} />);
  }
}

export default Posts;
