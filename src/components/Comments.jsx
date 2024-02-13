import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import { useAuth } from '../contexts/AuthContext';
import { API_URL } from '../constants';
import Comment from './Comment';

function Comments({ commentsRef, areCommentsOpened, postId }) {
  const { payload } = useAuth();
  const {
    fetchData: fetchNewComment,
    data: newCommentData,
    loading: newCommentLoading,
  } = useFetch();
  const {
    fetchData: fetchComments,
    data: commentsData,
    loading: commentLoading,
    setData: setCommetsData,
  } = useFetch();
  const [input, setInput] = useState('');

  useEffect(() => {
    if (postId && areCommentsOpened) {
      fetchComments(`${API_URL}/posts/${postId}/comments`, payload?.token);
    }
  }, [postId, areCommentsOpened]);

  useEffect(() => {
    if (newCommentData?.comment) {
      setCommetsData((prevComments) => ({
        comments: [newCommentData.comment, ...(prevComments?.comments || [])],
      }));

      /* eslint-disable-next-line no-param-reassign */
      commentsRef.current.textContent = `${
        (commentsData?.comments.length || 0) + 1
      } comments`;
    }
  }, [newCommentData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchNewComment(
      `${API_URL}/posts/${postId}/comments`,
      payload?.token,
      'POST',
      { text: input },
    );
    setInput('');
  };

  if (areCommentsOpened) {
    return (
      <div data-testid="comments-container">
        {commentLoading || newCommentLoading ? (
          <div>Loading...</div>
        ) : (
          commentsData?.comments && (
            <div>
              {commentsData.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          )
        )}
        <form onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="comment">
            Write a comment
          </label>
          <input
            className="mt-4 w-full border p-2 text-lg"
            type="text"
            name="comment"
            id="comment"
            placeholder="Write a comment..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
    );
  }
}

Comments.propTypes = {
  commentsRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  areCommentsOpened: PropTypes.bool.isRequired,
  postId: PropTypes.string.isRequired,
};

export default Comments;
