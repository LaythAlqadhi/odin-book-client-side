import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import useFetch from '../hooks/useFetch';

const API_URL = 'https://b32a7bae-6556-4da3-a848-f0e0b80bf4f0-00-36mr5e3zsor9c.janeway.replit.dev/v1/posts'

function HomePage() {
  const { payload } = useAuth();
  const { fetchData, data, loading, error } = useFetch();

  useEffect(() => {
    fetchData(API_URL, payload?.token);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong.</div>;
  }

  if (!data || !data.posts || data.posts.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <div>
      {data.posts.map(post => (
        <div key={post.id}>
          <div>
            <img src={post.author.profile.avatar} alt="Author Avatar" />
            <div>
              <p>{post.author.username}</p>
              <p>{post.author.profile.displayName}</p>
            </div>
          </div>
          <div>
            <p>{post.content}</p>
          </div>
          <div>
            <p>Likes: {post.likes}</p>
            <p>Comments: {post.comments.length}</p>
          </div>
          <div>
            {post.comments.map(comment => (
              <div key={comment['_id']}>
                <img src={comment.author.profile.avatar} alt="Commenter Avatar" />
                <div>
                  <p>{comment.author.username}</p>
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
