import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import OwnerProfileButtons from './OwnerProfileButtons';
import VisitorProfileButtons from './VisitorProfileButtons';

const API_URL =
  'https://b32a7bae-6556-4da3-a848-f0e0b80bf4f0-00-36mr5e3zsor9c.janeway.replit.dev/v1';

function UserProfileHeader({ userId, token, me }) {
  const { fetchData, data, loading, error } = useFetch();

  useEffect(() => {
    fetchData(`${API_URL}/user/${userId}`, token);
  }, [API_URL, userId, token]);

  const isOwner = (me && userId && me.id === userId) || (me.username === userId);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong.</div>;

  if (data && data.user) {
    const { user } = data;

    return (
      <div>
        <div>
          <div>
            <img src={user.profile.avatar} alt="Avatar" />
            <span>+</span>
          </div>
          <div>
            <button type="button">
              <span>{user.posts.length}</span>
              <span>Posts</span>
            </button>
            <button type="button">
              <span>{user.followers.length}</span>
              <span>Followers</span>
            </button>
            <button type="button">
              <span>{user.following.length}</span>
              <span>Following</span>
            </button>
          </div>
        </div>
        <div>
          <span aria-label="Name">{user.profile.displayName}</span>
          <span aria-label="Username">{user.username}</span>
          {user.profile.bio && <span aria-label="Bio">{user.profile.bio}</span>}
        </div>
        {isOwner ? (
          <OwnerProfileButtons />
        ) : (
          <VisitorProfileButtons token={token} me={me} user={user} />
        )}
      </div>
    );
  }
}

UserProfileHeader.propTypes = {
  userId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  me: PropTypes.instanceOf(Object).isRequired,
};

export default UserProfileHeader;
