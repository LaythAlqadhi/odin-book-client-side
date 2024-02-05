import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Comment({ comment }) {
  return (
    <div data-testid="comment-container">
      <Link to={`/profile/${comment.author.id}`}>
        <img src={comment.author.profile.avatar} alt="Avatar" />
      </Link>
      <div>
        <Link to={`/profile/${comment.author.id}`}>
          {comment.author.username}
        </Link>
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
