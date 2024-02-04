import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

const API_URL =
  'https://b32a7bae-6556-4da3-a848-f0e0b80bf4f0-00-36mr5e3zsor9c.janeway.replit.dev/v1';

function VisitorProfileButtons({ token, me, user }) {
  const [isFollowing, setIsFollowing] = useState(
    user.followers.includes(me.username),
  );
  const [isRequested, setIsRequested] = useState(
    user.followingRequests.includes(me.username),
  );

  const { fetchData: fetchRequestFollow } = useFetch();
  const { fetchData: fetchRemoveFollow } = useFetch();
  const { fetchData: fetchRemoveRequest } = useFetch();

  const handleRequestFollow = () => {
    fetchRequestFollow(
      `${API_URL}/user/${user.username}/follow-request`,
      token,
      'POST',
    );
    setIsRequested(true);
  };

  const handleUnfollow = () => {
    fetchRemoveFollow(
      `${API_URL}/user/${user.username}/following/${me.username}`,
      token,
      'DELETE',
    );
    setIsFollowing(false);
  };

  const handleRemoveRequest = () => {
    fetchRemoveRequest(
      `${API_URL}/user/${user.username}/follow-request`,
      token,
      'DELETE',
    );
    setIsRequested(false);
  };

  return (
    <div>
      {isFollowing && (
        <button type="button" onClick={handleUnfollow}>
          Following
        </button>
      )}
      {!isFollowing && isRequested && (
        <button type="button" onClick={handleRemoveRequest}>
          Requested
        </button>
      )}
      {!isFollowing && !isRequested && (
        <button type="button" onClick={handleRequestFollow}>
          Follow
        </button>
      )}
      <button type="button">Message</button>
    </div>
  );
}

VisitorProfileButtons.propTypes = {
  token: PropTypes.string.isRequired,
  me: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
};

export default VisitorProfileButtons;
