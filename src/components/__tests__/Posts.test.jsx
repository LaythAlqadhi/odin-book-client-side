import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import PropTypes from 'prop-types';
import useFetch from '../../hooks/useFetch';
import Posts from '../Posts';

const mockCommentData = {
  id: 'mockId',
  author: {
    id: 'mockId',
    username: 'mockUsername',
    profile: {
      avatar: 'mockAvatar.jpg',
    },
  },
  likes: ['mockId', 'mockId2'],
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
  likes: ['mockId', 'mockId2'],
  content: 'mockContent',
  comments: [mockCommentData],
  createdAt: Date.now(),
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

function MockPosts({ userId, token }) {
  return (
    <Router>
      <Posts userId={userId} token={token} />
    </Router>
  );
}

MockPosts.propTypes = {
  userId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

describe('Posts component', () => {
  it('should render loading when the data still not resolved', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: null,
      loading: true,
      error: null,
    }));

    render(
      <MockPosts userId={mockPostData.author.username} token="mockToken" />,
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
      <MockPosts userId={mockPostData.author.username} token="mockToken" />,
    );

    const divElement = screen.getByText(/Something went wrong/i);

    expect(divElement).toBeInTheDocument();
  });

  it('should render data when it resolved', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: {
        posts: [mockPostData],
      },
      loading: false,
      error: false,
    }));

    render(
      <MockPosts userId={mockPostData.author.username} token="mockToken" />,
    );

    const usernameElement = screen.getByText(mockPostData.author.username);

    expect(usernameElement).toBeInTheDocument();
  });
});
