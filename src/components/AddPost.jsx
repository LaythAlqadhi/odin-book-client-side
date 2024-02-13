import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { mdilImage } from '@mdi/light-js';
import useFetch from '../hooks/useFetch';
import { useAuth } from '../contexts/AuthContext';
import Icon from './Icon';
import { API_URL } from '../constants';

function AddPost({ isAddPostOpened, setIsAddPostOpened }) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ text: '', media: '' });
  const { payload } = useAuth();
  const { fetchData, data, loading, error } = useFetch();

  useEffect(() => {
    const disableScrollEvent = () => {
      document.body.className = 'overflow-hidden';
    };
    const enableScrollEvent = () => {
      document.body.className = 'overflow-visible';
    };

    if (isAddPostOpened) {
      disableScrollEvent();
    }

    return () => enableScrollEvent();
  }, [isAddPostOpened]);

  const handleCreatePost = (e) => {
    e.preventDefault();

    if (inputs.text === '' && inputs.media === '') {
      e.target.text.setCustomValidity('Required at least one field.');
      return;
    }
    if (inputs.text.length > 2500) {
      e.target.text.setCustomValidity('Text must be at most 2500 characters.');
      return;
    }

    const formData = new FormData(e.target);

    fetchData(`${API_URL}/posts`, payload?.token, 'POST', formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  if (error) return <div>Something went wrong.</div>;

  if (loading) return <div>Loading...</div>;

  if (data?.post) {
    Promise.resolve().then(() => {
      setIsAddPostOpened(!isAddPostOpened);
      navigate(`/post/${data.post.id}`);
    });
  }

  return (
    <div className="l-1/2 fixed top-1/2 z-10 w-full max-w-screen-sm -translate-y-1/2 rounded-md border bg-white p-4 shadow">
      <form onSubmit={handleCreatePost}>
        <label className="sr-only" htmlFor="text">
          Text
        </label>
        <textarea
          className="h-72 w-full text-lg focus:border-transparent focus:ring-transparent"
          name="text"
          id="text"
          placeholder="Write a post..."
          value={inputs.text}
          onChange={handleInputChange}
        />
        <div className="flex items-center justify-between gap-4">
          <label className="cursor-pointer" htmlFor="media">
            <Icon path={mdilImage} aria-label="Upload media" />
          </label>
          <input
            className="sr-only"
            type="file"
            name="media"
            id="media"
            onChange={handleInputChange}
            accept="image/png, image/jpeg, image/gif"
          />
          <button
            className="button ml-auto"
            type="button"
            onClick={() => setIsAddPostOpened(!isAddPostOpened)}
          >
            Cancel
          </button>
          <button
            className="button !bg-sky-500 !text-white hover:!bg-sky-600"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

AddPost.propTypes = {
  isAddPostOpened: PropTypes.bool.isRequired,
  setIsAddPostOpened: PropTypes.func.isRequired,
};

export default AddPost;
