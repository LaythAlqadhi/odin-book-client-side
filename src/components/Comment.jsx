import React from 'react';
import PropTypes from 'prop-types';

function Comment({ comment }) {
  return (
    <div data-testid="comment-container">
      <img src={comment.author.profile.avatar} alt="Avatar" />
      <div>
        <span>{comment.author.username}</span>
        <p>{comment.content}</p>
      </div>
      <div>
        <span>Like</span>
        <span>{comment.likes}</span>
      </div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.instanceOf(Object).isRequired,
};

export default Comment;
