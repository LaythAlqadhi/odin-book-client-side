import React from 'react';
import PropTypes from 'prop-types';
import { API_URL } from '../constants';

function OwnerProfileButtons({ user }) {
  const handleShareClick = async () => {
    const data = {
      title: `Odinbook: ${user.username}`,
      url: `${API_URL}/post/${user.id}`,
    };

    if (navigator.canShare(data)) {
      await navigator.share(data);
    }
  };

  return (
    <div className="flex gap-4">
      <button className="button w-full min-w-fit" type="button">
        Edit profile
      </button>
      <button
        className="button w-full min-w-fit"
        type="button"
        onClick={handleShareClick}
      >
        Share profile
      </button>
    </div>
  );
}

OwnerProfileButtons.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
};

export default OwnerProfileButtons;
