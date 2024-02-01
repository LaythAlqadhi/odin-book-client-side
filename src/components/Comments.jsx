import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

function ViewCommentsButton({ comments, areCommentsOpened }) {
  if (areCommentsOpened) return <span>Hide comments</span>;

  return <span>View all {comments.length} comments</span>;
}

ViewCommentsButton.propTypes = {
  comments: PropTypes.instanceOf(Object).isRequired,
  areCommentsOpened: PropTypes.bool.isRequired,
};

function Comments({ comments }) {
  const [areCommentsOpened, setAreCommentsOpened] = useState(false);

  return (
    <div data-testid="comments-container">
      {comments.length <= 0 ? (
        <span>No comments yet</span>
      ) : (
        /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
        <button
          type="button"
          onClick={() => setAreCommentsOpened(!areCommentsOpened)}
        >
          <ViewCommentsButton
            comments={comments}
            areCommentsOpened={areCommentsOpened}
          />
        </button>
      )}

      {areCommentsOpened && (
        <div>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.instanceOf(Object).isRequired,
};

export default Comments;
