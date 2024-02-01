import React, { useEffect } from 'react';
import useFetch from '../hooks/useFetch';

const API_URL =
  'https://b32a7bae-6556-4da3-a848-f0e0b80bf4f0-00-36mr5e3zsor9c.janeway.replit.dev/v1';

function OwnerProfileButtons() {
  return (
    <div>
      <button type="button">Edit profile</button>
      <button type="button">Share profile</button>
    </div>
  );
}

function VisitorProfileButtons() {
  return (
    <div>
      <button type="button">Follow</button>
      <button type="button">Message</button>
    </div>
  );
}

function UserProfileHeader({ userId, token, user }) {
  const { fetchData, data, loading, error } = useFetch();

  useEffect(() => {
    fetchData(`${API_URL}/user/${userId}`, token);
  }, [API_URL, userId, token]);

  const isOwner =
    user && userId &&
    user.id === userId ||
    user.username === userId;

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong.</div>;

  if (data && data.user) {
    return (
      <div>
        <div>
          <div>
            <img src={data.user.profile.avatar} alt="Avatar" />
            <span>+</span>
          </div>
          <div>
            <button type="button">
              <span>{data.user.posts.length}</span>
              <span>Posts</span>
            </button>
            <button type="button">
              <span>{data.user.followers.length}</span>
              <span>Followers</span>
            </button>
            <button type="button">
              <span>{data.user.following.length}</span>
              <span>Following</span>
            </button>
          </div>
        </div>
        <div>
          <span aria-label="Name">{data.user.profile.displayName}</span>
          <span aria-label="Username">{data.user.username}</span>
          {data.user.profile.bio && <span aria-label="Bio">{data.user.profile.bio}</span>}
        </div>
        {isOwner ? <OwnerProfileButtons /> : <VisitorProfileButtons />}
      </div>
    );
  }
}

export default UserProfileHeader;
