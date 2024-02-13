import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import UserProfileHeader from '../components/UserProfileHeader';
import Posts from '../components/Posts';

function ProfilePage() {
  const { userId } = useParams();
  const { payload } = useAuth();

  return (
    <div>
      <div>
        <UserProfileHeader
          userId={userId}
          token={payload.token}
          me={payload.user}
        />
      </div>
      <div className="flex justify-center">
        <Posts userId={userId} token={payload.token} />
      </div>
    </div>
  );
}

export default ProfilePage;
