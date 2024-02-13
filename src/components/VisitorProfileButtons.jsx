import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import { API_URL } from '../constants';

function VisitorProfileButtons({ token, me, user, single }) {
  const [isFollowing, setIsFollowing] = useState(
    user.followers.includes(me.id),
  );
  const [isRequested, setIsRequested] = useState(
    user.followingRequests.includes(me.id),
  );

  const { fetchData: fetchRequestFollow } = useFetch();
  const { fetchData: fetchRemoveFollow } = useFetch();
  const { fetchData: fetchRemoveRequest } = useFetch();

  const handleRequestFollow = () => {
    fetchRequestFollow(
      `${API_URL}/users/${user.id}/follow-request`,
      token,
      'POST',
    );
    setIsRequested(true);
  };

  const handleUnfollow = () => {
    fetchRemoveFollow(
      `${API_URL}/users/${user.id}/following/${me.id}`,
      token,
      'DELETE',
    );
    setIsFollowing(false);
  };

  const handleRemoveRequest = () => {
    fetchRemoveRequest(
      `${API_URL}/users/${user.id}/follow-request`,
      token,
      'DELETE',
    );
    setIsRequested(false);
  };

  return (
    <div className="flex gap-4">
      {isFollowing && (
        <button
          className="button w-full min-w-fit"
          type="button"
          onClick={handleUnfollow}
        >
          Following
        </button>
      )}
      {!isFollowing && isRequested && (
        <button
          className="button w-full min-w-fit"
          type="button"
          onClick={handleRemoveRequest}
        >
          Requested
        </button>
      )}
      {!isFollowing && !isRequested && (
        <button
          className="button w-full min-w-fit !bg-sky-500 !text-white hover:!bg-sky-600"
          type="button"
          onClick={handleRequestFollow}
        >
          Follow
        </button>
      )}
      {!single && (
        <button className="button w-full min-w-fit" type="button">
          Message
        </button>
      )}
    </div>
  );
}

VisitorProfileButtons.defaultProps = {
  single: false,
};

VisitorProfileButtons.propTypes = {
  token: PropTypes.string.isRequired,
  me: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  single: PropTypes.bool,
};

export default VisitorProfileButtons;
