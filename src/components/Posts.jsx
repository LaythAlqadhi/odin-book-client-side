import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import Post from './Post';
import { API_URL } from '../constants';

function Posts({ token, userId }) {
  const { fetchData, data, loading, error } = useFetch();

  useEffect(() => {
    if (userId) {
      fetchData(`${API_URL}/users/${userId}/posts`, token);
    } else {
      fetchData(`${API_URL}/posts`, token);
    }
  }, [API_URL, userId, token]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong.</div>;

  if (data?.posts) {
    return (
      <div>
        {data.posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    );
  }
}

Posts.defaultProps = {
  userId: null,
};

Posts.propTypes = {
  token: PropTypes.string.isRequired,
  userId: PropTypes.string,
};

export default Posts;
