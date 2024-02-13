import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import useFetch from '../hooks/useFetch';
import { API_URL } from '../constants';
import VisitorProfileButtons from '../components/VisitorProfileButtons';

function SearchPage() {
  const { payload } = useAuth();
  const { fetchData, data } = useFetch();

  const handleInputChange = (e) => {
    fetchData(`${API_URL}/users/search?q=${e.target.value}`, payload?.token);
  };

  return (
    <div className="flex w-screen max-w-screen-sm flex-col items-center justify-center gap-4 p-4 text-center">
      <form className="w-full">
        <label className="sr-only" htmlFor="search">
          Search
        </label>
        <input
          className="top-12 w-full rounded-md border bg-white px-3 py-2 text-base placeholder-slate-400"
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          onChange={handleInputChange}
          required
        />
      </form>
      <div className="flex w-full max-w-screen-sm flex-col gap-2">
        {data &&
          data?.users &&
          data.users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-center gap-2"
            >
              <Link className="w-24" to={`/profile/${user.id}`}>
                <img
                  className="w-12 rounded-full"
                  src={user.profile.avatar}
                  alt="Avatar"
                />
              </Link>
              <Link
                className="flex w-full flex-col items-start"
                to={`/profile/${user.id}`}
              >
                <span>{user.username}</span>
                <span className="text-gray-400">
                  {user.profile.displayName}
                </span>
              </Link>
              <div className="w-48">
                {payload.user.id !== user.id && (
                  <VisitorProfileButtons
                    token={payload?.token}
                    me={payload?.user}
                    user={user}
                    single
                  />
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchPage;
