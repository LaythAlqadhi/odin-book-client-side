import React, { useState } from 'react';
import Comment from './Comment';

function ViewCommentsButton({ comments, isCommentsOpened }) {
  if (isCommentsOpened) return <span>Hide comments</span>;

  return <span>View all {comments.length} comments</span>;
}

function Comments({ comments }) {
  const [isCommentsOpened, setIsCommentsOpened] = useState(false);

  return (
    <div data-testid="comments-container">
      {comments.length <= 0 ? (
        <span>No comments yet</span>
      ) : (
        <button
          type="button"
          onClick={() => setIsCommentsOpened(!isCommentsOpened)}
        >
          <ViewCommentsButton
            comments={comments}
            isCommentsOpened={isCommentsOpened}
          />
        </button>
      )}

      {isCommentsOpened && (
        <div>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comments;
