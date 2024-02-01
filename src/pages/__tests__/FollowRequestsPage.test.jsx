import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import useFetch from '../../hooks/useFetch';
import FollowRequestsPage from '../FollowRequestsPage';

const mockCommentData = {
  id: 'mockId',
  author: {
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
  posts: [mockPostData],
};

beforeAll(() => {
  vi.mock('../../hooks/useFetch');

  vi.mock('../../contexts/AuthContext', async (importOriginal) => ({
    ...(await importOriginal()),
    useAuth: () => ({
      payload: {
        token: 'mockToken',
        user: {
          id: 'mockId',
          username: 'mockUsername',
          profile: {
            displayName: 'mockDisplayName',
            avatar: 'mockAvatar',
            bio: 'mockBio',
          },
        },
      },
    }),
    signIn: vi.fn(),
    signUp: vi.fn(),
  }));
});

afterAll(() => {
  vi.clearAllMocks();
});

function MockFollowRequestsPage() {
  return (
    <MemoryRouter>
      <FollowRequestsPage />
    </MemoryRouter>
  );
}

describe('FollowRequestsPage component', () => {
  it('should render loading when the data still not resolved', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: null,
      loading: true,
      error: null,
    }));

    render(<MockFollowRequestsPage />);

    const divElement = screen.getByText(/Loading/i);

    expect(divElement).toBeInTheDocument();
  });

  it('should render message "Something went wrong" when an error occurs', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: null,
      loading: false,
      error: {},
    }));

    render(<MockFollowRequestsPage />);

    const divElement = screen.getByText(/Something went wrong/i);

    expect(divElement).toBeInTheDocument();
  });

  it('should render data when it resolved', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: {
        users: [mockUserData],
      },
      loading: false,
      error: null,
    }));

    render(<MockFollowRequestsPage />);

    const divElement = screen.getByTestId(/follow-requests-container/i);

    expect(divElement).toBeInTheDocument();
  });

  it('should render a link element correctly', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: {
        users: [mockUserData],
      },
      loading: false,
      error: null,
    }));

    render(<MockFollowRequestsPage />);

    const linkElement = screen.getByRole('link');

    expect(linkElement).toBeInTheDocument();
    expect(linkElement.href).toContain(`profile/${mockUserData.id}`);
  });

  it('should render an avatar correctly', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: {
        users: [mockUserData],
      },
      loading: false,
      error: null,
    }));

    render(<MockFollowRequestsPage />);

    const avatarElement = screen.getByAltText('Avatar');

    expect(avatarElement).toBeInTheDocument();
  });

  it('should render a username correctly', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: {
        users: [mockUserData],
      },
      loading: false,
      error: null,
    }));

    render(<MockFollowRequestsPage />);

    const usernameElement = screen.getByText(mockUserData.username);
    const describeElement = screen.getByText(/requested to follow you/i);

    expect(usernameElement).toBeInTheDocument();
    expect(describeElement).toBeInTheDocument();
  });

  it('should render "Confirm" and "Delete" buttons correctly', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: {
        users: [mockUserData],
      },
      loading: false,
      error: null,
    }));

    render(<MockFollowRequestsPage />);

    const confirmButtomElement = screen.getByRole('button', {
      name: /Confirm/i,
    });
    const deleteButtomElement = screen.getByRole('button', { name: /Delete/i });

    expect(confirmButtomElement).toBeInTheDocument();
    expect(deleteButtomElement).toBeInTheDocument();
  });

  it('should render multipe follow requests correctly', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: {
        users: [mockUserData, mockUserData, mockUserData],
      },
      loading: false,
      error: null,
    }));

    render(<MockFollowRequestsPage />);

    const linkElements = screen.getAllByRole('link');

    expect(linkElements.length).toBe(3);
  });
});
