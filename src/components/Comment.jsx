import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { mdilHeart } from '@mdi/light-js';
import useFetch from '../hooks/useFetch';
import { useAuth } from '../contexts/AuthContext';
import formatDate from '../utils/formatDate';
import Icon from './Icon';
import { API_URL } from '../constants';

function Comment({ comment }) {
  const likesRef = useRef(null);
  const { payload } = useAuth();
  const [isLiked, setIsLiked] = useState(
    comment.likes.includes(payload.user.id),
  );
  const { fetchData } = useFetch();

  useEffect(() => {
    if (isLiked) {
      likesRef.current.textContent = comment.likes.length + 1;
    } else {
      likesRef.current.textContent = comment.likes.length;
    }
  }, [isLiked]);

  const handleLikeClick = () => {
    fetchData(`${API_URL}/comments/${comment.id}/like`, payload?.token, 'POST');
    setIsLiked(!isLiked);
  };

  return (
    <div
      data-testid="comment-container"
      className="mt-4 grid grid-cols-6 place-items-center items-start"
    >
      <Link to={`/profile/${comment.author.id}`}>
        <img
          className="w-12 rounded-full"
          src={comment.author.profile.avatar}
          alt="Avatar"
          loading="lazy"
        />
      </Link>
      <div className="col-span-4 w-full">
        <div className="flex gap-2">
          <Link to={`/profile/${comment.author.id}`}>
            {comment.author.username}
          </Link>
          <span className="text-gray-400" aria-label="Date">
            {formatDate(comment.createdAt, true)}
          </span>
        </div>
        <p>{comment.content}</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <button type="button" aria-label="Like" onClick={handleLikeClick}>
          <Icon
            className={`icon ${isLiked ? 'fill-pink-600' : ''}`}
            path={mdilHeart}
          />
        </button>
        <span ref={likesRef}>{comment.likes.length}</span>
      </div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.instanceOf(Object).isRequired,
};

export default Comment;
