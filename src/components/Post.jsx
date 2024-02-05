import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Comments from './Comments';

function Post({ post }) {
  return (
    <div data-testid="post-container">
      <div>
        <Link to={`/profile/${post.author.id}`}>
          <img src={post.author.profile.avatar} alt="Avatar" />
        </Link>
        <Link to={`/profile/${post.author.id}`}>{post.author.username}</Link>
      </div>
      {post.content.media && (
        <img src={post.content.media} alt="" />
      )}
      <div>
        <button type="button" aria-label="Like">
          Like
        </button>
        <button type="button" aria-label="Comment">
          Comment
        </button>
        <button type="button" aria-label="Share">
          Share
        </button>
      </div>
      <div aria-label="The number of likes">{post.likes}</div>
      {post.content.text && (
      <div>
        <p>
          {post.author.username} {post.content.text}
        </p>
      </div>
      )}
      <div>
        <span aria-label="Date">{post.createdAt}</span>
      </div>
      <Comments comments={post.comments} />
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.instanceOf(Object).isRequired,
};

export default Post;
