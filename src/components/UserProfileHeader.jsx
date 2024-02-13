import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { mdiPlusCircle } from '@mdi/js';
import useFetch from '../hooks/useFetch';
import OwnerProfileButtons from './OwnerProfileButtons';
import VisitorProfileButtons from './VisitorProfileButtons';
import Icon from './Icon';
import { API_URL } from '../constants';

function UserProfileHeader({ userId, token, me }) {
  const { fetchData, data, loading, error } = useFetch();

  useEffect(() => {
    fetchData(`${API_URL}/users/${userId}`, token);
  }, [API_URL, userId, token]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong.</div>;

  if (data && data.user) {
    const { user } = data;
    const isOwner = me && userId && me.id === userId;

    return (
      <div className="grid-rows-[repeat(3,_1fr] grid grid-cols-3 gap-4 p-4">
        <div className="col-start-1 row-start-1 sm:row-end-4">
          <div className="relative w-fit">
            <img
              className="w-32 rounded-full sm:w-40 lg:w-48 xl:w-56 2xl:w-64"
              src={user.profile.avatar}
              alt="Avatar"
            />
            {isOwner && (
              <button
                className="absolute bottom-0 right-0 rounded-full bg-white"
                type="button"
                aria-label="Update your avatar"
              >
                <Icon
                  className="icon h-8 w-8 fill-sky-500 hover:fill-sky-600 sm:h-10 sm:w-10 lg:h-12 lg:w-12 xl:h-12 xl:w-12"
                  path={mdiPlusCircle}
                />
              </button>
            )}
          </div>
        </div>
        <div className="col-span-2 row-start-1 flex items-center justify-center gap-4 sm:col-span-1">
          <button className="flex flex-col items-center" type="button">
            <span className="text-2xl font-semibold">{user.posts.length}</span>
            <span className="text-lg">Posts</span>
          </button>
          <button className="flex flex-col items-center" type="button">
            <span className="text-2xl font-semibold">
              {user.followers.length}
            </span>
            <span className="text-lg">Followers</span>
          </button>
          <button className="flex flex-col items-center" type="button">
            <span className="text-2xl font-semibold">
              {user.following.length}
            </span>
            <span className="text-lg">Following</span>
          </button>
        </div>
        <div className="col-span-3 row-start-2 sm:col-span-1">
          <div className="flex flex-col p-2">
            <span className="text-lg font-semibold" aria-label="Name">
              {user.profile.displayName}
            </span>
            <span aria-label="Username">@{user.username}</span>
            {user.profile.bio && (
              <span className="text-base" aria-label="Bio">
                {user.profile.bio}
              </span>
            )}
          </div>
        </div>
        <div className="col-span-3 row-start-3 sm:col-span-1">
          {isOwner ? (
            <OwnerProfileButtons user={user} />
          ) : (
            <VisitorProfileButtons token={token} me={me} user={user} />
          )}
        </div>
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
