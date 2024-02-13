import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useAuth } from '../contexts/AuthContext';
import Post from '../components/Post';
import { API_URL } from '../constants';

function PostPage() {
  const { postId } = useParams();
  const { payload } = useAuth();
  const { fetchData, data, loading, error } = useFetch();

  useEffect(() => {
    fetchData(`${API_URL}/posts/${postId}`, payload?.token);
  }, [API_URL, postId, payload]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong.</div>;

  if (data?.post) {
    return (
      <div className="w-screen max-w-screen-sm">
        <Post post={data.post} />
      </div>
    );
  }
}

export default PostPage;
