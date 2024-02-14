import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mdilHeart, mdilComment, mdilRedoVariant } from '@mdi/light-js';
import useFetch from '../hooks/useFetch';
import { useAuth } from '../contexts/AuthContext';
import formatDate from '../utils/formatDate';
import Comments from './Comments';
import Icon from './Icon';
import { API_URL } from '../constants';

function Post({ post }) {
  const likesRef = useRef(null);
  const commentsRef = useRef(null);
  const { payload } = useAuth();
  const [isLiked, setIsLiked] = useState(post.likes.includes(payload.user.id));
  const { fetchData } = useFetch();
  const [areCommentsOpened, setAreCommentsOpened] = useState(false);

  useEffect(() => {
    if (isLiked) {
      likesRef.current.textContent = `${post.likes.length + 1} likes`;
    } else {
      likesRef.current.textContent = `${post.likes.length} likes`;
    }
  }, [isLiked]);

  const handleLikeClick = () => {
    fetchData(`${API_URL}/posts/${post.id}/like`, payload?.token, 'POST');
    setIsLiked(!isLiked);
  };

  const handleShareClick = async (postData) => {
    const info = {
      title: `Odinbook: Post from ${postData.author.username}`,
      url: `${API_URL}/post/${postData.id}`,
    };

    if (navigator.canShare(info)) {
      await navigator.share(info);
    }
  };

  return (
    <div
      data-testid="post-container"
      className="max-w-screen-sm w-screen rounded-md border"
    >
      <div className="flex items-center gap-2 p-4">
        <Link to={`/profile/${post.author.id}`}>
          <img
            className="w-12 rounded-full"
            src={post.author.profile.avatar}
            alt="Avatar"
            loading="lazy"
          />
        </Link>
        <Link
          className="text-lg font-semibold"
          to={`/profile/${post.author.id}`}
        >
          {post.author.username}
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {post.content.text && (
          <p className="px-4 text-lg">{post.content.text}</p>
        )}
        {post.content.media && (
          <img src={post.content.media} alt="" loading="lazy" />
        )}
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-4">
          <button type="button" aria-label="Like" onClick={handleLikeClick}>
            <Icon
              className={`icon ${isLiked ? 'fill-pink-600' : ''}`}
              path={mdilHeart}
            />
          </button>
          <button
            type="button"
            aria-label="Comment"
            onClick={() => setAreCommentsOpened(!areCommentsOpened)}
          >
            <Icon className="icon" path={mdilComment} />
          </button>
          <button
            type="button"
            aria-label="Share"
            onClick={() => handleShareClick(post)}
          >
            <Icon className="icon" path={mdilRedoVariant} />
          </button>
        </div>
        <div className="flex gap-2 text-lg font-semibold">
          <span aria-label="Likes" ref={likesRef}>
            {post.likes.length} likes
          </span>
          <span aria-label="Comments" ref={commentsRef}>
            {post.comments.length} comments
          </span>
        </div>
        <div>
          <span aria-label="Date">{formatDate(post.createdAt)}</span>
        </div>
        <Comments
          commentsRef={commentsRef}
          areCommentsOpened={areCommentsOpened}
          postId={post.id}
        />
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.instanceOf(Object).isRequired,
};

export default Post;
