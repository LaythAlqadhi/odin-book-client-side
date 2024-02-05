import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import PropTypes from 'prop-types';
import useFetch from '../../hooks/useFetch';
import UserProfileHeader from '../UserProfileHeader';

const mockCommentData = {
  id: 'mockId',
  author: {
    id: 'mockId',
    username: 'mockUsername',
    profile: {
      avatar: 'mockAvatar.jpg',
    },
  },
  likes: 100,
  content: 'mockContent',
};

const mockPostData = {
  id: 'mockId',
  author: {
    id: 'mockId',
    username: 'mockUsername',
    profile: {
      avatar: 'mockAvatar.jpg',
    },
  },
  likes: 100,
  content: 'mockContent',
  comments: [mockCommentData],
  createdAt: Date.now(),
};

const mockUserData = {
  id: 'mockId',
  username: 'mockUsername',
  profile: {
    displayName: 'mockDisplayName',
    avatar: 'mockAvatar.jpg',
    bio: 'mockBio',
  },
  followers: [],
  following: [],
  followingRequests: [],
  posts: [mockPostData],
};

beforeAll(() => {
  vi.mock('../../hooks/useFetch');
});

afterAll(() => {
  vi.clearAllMocks();
});

function MockUserProfileHeader({ userId, token, me }) {
  return (
    <Router inititalEntries={[`/profile/${mockUserData.id}`]} initialIndex={0}>
      <UserProfileHeader userId={userId} token={token} me={me} />
    </Router>
  );
}

MockUserProfileHeader.propTypes = {
  userId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  me: PropTypes.instanceOf(Object).isRequired,
};

describe('UserProfileHeader component', () => {
  it('should render loading when the data still not resolved', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: null,
      loading: true,
      error: null,
    }));

    render(
      <MockUserProfileHeader
        userId={mockUserData.id}
        token="mockToken"
        me={mockUserData}
      />,
    );

    const divElement = screen.getByText(/Loading/i);

    expect(divElement).toBeInTheDocument();
  });

  it('should render message "Something went wrong" when an error occurs', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: null,
      loading: false,
      error: true,
    }));

    render(
      <MockUserProfileHeader
        userId={mockUserData.id}
        token="mockToken"
        me={mockUserData}
      />,
    );

    const divElement = screen.getByText(/Something went wrong/i);

    expect(divElement).toBeInTheDocument();
  });

  it('should render data when it resolved', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: {
        user: mockUserData,
      },
      loading: false,
      error: false,
    }));

    render(
      <MockUserProfileHeader
        userId={mockUserData.id}
        token="mockToken"
        me={mockUserData}
      />,
    );

    const displayNameElement = screen.getByText(/mockDisplayName/i);

    expect(displayNameElement).toBeInTheDocument();
  });

  it('should render an avatar correctly', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: {
        user: mockUserData,
      },
      loading: false,
      error: false,
    }));

    render(
      <MockUserProfileHeader
        userId={mockUserData.id}
        token="mockToken"
        me={mockUserData}
      />,
    );

    const avatarElement = screen.getByAltText(/Avatar/i);

    expect(avatarElement).toBeInTheDocument();
    expect(avatarElement.src).toContain(mockUserData.profile.avatar);
  });

  it('should render the number of posts', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: {
        user: mockUserData,
      },
      loading: false,
      error: false,
    }));

    render(
      <MockUserProfileHeader
        userId={mockUserData.id}
        token="mockToken"
        me={mockUserData}
      />,
    );

    const postsElement = screen.getByRole('button', { name: /1 Posts/i });

    expect(postsElement).toBeInTheDocument();
    expect(postsElement.textContent).toContain(mockUserData.posts.length);
  });

  it('should render the number of posts', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: {
        user: mockUserData,
      },
      loading: false,
      error: false,
    }));

    render(
      <MockUserProfileHeader
        userId={mockUserData.id}
        token="mockToken"
        me={mockUserData}
      />,
    );

    const followersElement = screen.getByRole('button', {
      name: /0 Followers/i,
    });

    expect(followersElement).toBeInTheDocument();
    expect(followersElement.textContent).toContain(
      mockUserData.followers.length,
    );
  });

  it('should render the number of following', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: {
        user: mockUserData,
      },
      loading: false,
      error: false,
    }));

    render(
      <MockUserProfileHeader
        userId={mockUserData.id}
        token="mockToken"
        me={mockUserData}
      />,
    );

    const followingElement = screen.getByRole('button', {
      name: /0 Following/i,
    });

    expect(followingElement).toBeInTheDocument();
    expect(followingElement.textContent).toContain(
      mockUserData.following.length,
    );
  });

  it('should render the user profile info', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: {
        user: mockUserData,
      },
      loading: false,
      error: false,
    }));

    render(
      <MockUserProfileHeader
        userId={mockUserData.id}
        token="mockToken"
        me={mockUserData}
      />,
    );

    const nameElement = screen.getByLabelText('Name');
    const usernameElement = screen.getByLabelText('Username');
    const bioElement = screen.getByLabelText('Bio');

    expect(nameElement).toBeInTheDocument();
    expect(usernameElement).toBeInTheDocument();
    expect(bioElement).toBeInTheDocument();
  });

  it('should not render bio element when user data dont provide a bio', () => {
    mockUserData.profile.bio = null;

    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: {
        user: mockUserData,
      },
      loading: false,
      error: false,
    }));

    render(
      <MockUserProfileHeader
        userId={mockUserData.id}
        token="mockToken"
        me={mockUserData}
      />,
    );

    const bioElement = screen.queryByLabelText('Bio');

    expect(bioElement).not.toBeInTheDocument();

    mockUserData.profile.bio = 'mockBio';
  });

  it('should render "Edit profile" and "Share profile" buttons when the profile is own to the current user', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: {
        user: mockUserData,
      },
      loading: false,
      error: false,
    }));

    render(
      <MockUserProfileHeader
        userId={mockUserData.id}
        token="mockToken"
        me={mockUserData}
      />,
    );

    const editProfileElement = screen.getByRole('button', {
      name: 'Edit profile',
    });
    const shareProfileElement = screen.getByRole('button', {
      name: 'Share profile',
    });

    expect(editProfileElement).toBeInTheDocument();
    expect(shareProfileElement).toBeInTheDocument();
  });

  it('should render "Follow" and "Message" buttons when the profile is not own to the current user', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: {
        user: mockUserData,
      },
      loading: false,
      error: false,
    }));

    render(
      <MockUserProfileHeader
        userId="mockId2"
        token="mockToken"
        me={mockUserData}
      />,
    );

    const followElement = screen.getByRole('button', { name: 'Follow' });
    const messageElement = screen.getByRole('button', { name: 'Message' });

    expect(followElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
  });
});
