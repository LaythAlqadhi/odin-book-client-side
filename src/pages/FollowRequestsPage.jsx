import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import useFetch from '../hooks/useFetch';
import { API_URL } from '../constants';

function FollowRequestsPage() {
  const { payload } = useAuth();
  const { fetchData: fetchFollowRequests, data, loading, error } = useFetch();
  const { fetchData: fetchFollowRespond } = useFetch();

  useEffect(() => {
    fetchFollowRequests(
      `${API_URL}/users/${payload?.user.id}/follow-requests`,
      payload?.token,
    );
  }, [API_URL, payload]);

  const handleFollowRespond = (status) => {
    fetchFollowRespond(
      `${API_URL}/users/${payload.user.username}/follow-respond/${status}`,
      payload?.token,
      'POST',
    );
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  return (
    <div
      data-testid="follow-requests-container"
      className="flex flex-col gap-4 p-4"
    >
      {data &&
        data?.user &&
        data.user.followingRequests.map((user) => (
          <div key={user.id} className="flex max-w-screen-sm gap-4">
            <Link to={`/profile/${user.id}`}>
              <img
                className="w-12 rounded-full"
                src={user.profile.avatar}
                alt="Avatar"
              />
            </Link>
            <Link className="flex flex-col" to={`/profile/${user.id}`}>
              <span>{user.username}</span>
              <span className="text-gray-400">requested to follow you.</span>
            </Link>
            <div className="flex items-center justify-center gap-4">
              <button
                className="button !bg-sky-500 !text-white hover:!bg-sky-600"
                type="button"
                onClick={() => handleFollowRespond('confirmed')}
              >
                Confirm
              </button>
              <button
                className="button"
                type="button"
                onClick={() => handleFollowRespond('deleted')}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default FollowRequestsPage;
