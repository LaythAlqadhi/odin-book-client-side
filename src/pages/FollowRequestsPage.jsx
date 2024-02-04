import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import useFetch from '../hooks/useFetch';

const API_URL =
  'https://b32a7bae-6556-4da3-a848-f0e0b80bf4f0-00-36mr5e3zsor9c.janeway.replit.dev/v1';

function FollowRequestsPage() {
  const { payload } = useAuth();
  const { fetchData: fetchFollowRequests, data, loading, error } = useFetch();
  const { fetchData: fetchFollowRespond } = useFetch();

  useEffect(() => {
    fetchFollowRequests(
      `${API_URL}/user/${payload.user.username}/following-requests`,
      payload?.token,
    );
  }, [API_URL, payload]);

  const handleFollowRespond = (status) => {
    fetchFollowRespond(
      `${API_URL}/user/${payload.user.username}/follow-respond/${status}`,
      payload?.token,
      'POST',
    );
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  return (
    <div data-testid="follow-requests-container">
      {data &&
        data.users.map((user) => (
          <Link key={user.id} to={`profile/${user.id}`}>
            <img src={user.profile.avatar} alt="Avatar" />
            <div>
              <span>{user.username}</span>
              <span>requested to follow you.</span>
            </div>
            <div>
              <button
                type="button"
                onClick={() => handleFollowRespond('confirmed')}
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => handleFollowRespond('deleted')}
              >
                Delete
              </button>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default FollowRequestsPage;
