import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Comment from '../Comment';

const mockCommentData = {
  author: {
    username: 'mockUsername',
    profile: {
      avatar: 'mockAvatar.jpg',
    },
  },
  likes: ['', ''],
  content: 'mockContent',
};

beforeAll(() => {
  vi.mock('../../hooks/useFetch', () => ({
    default: vi.fn(() => ({
      fetchData: vi.fn(),
      data: null,
      loading: true,
      error: null,
    })),
  }));

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

function MockComment({ comment }) {
  return (
    <MemoryRouter>
      <Comment comment={comment} />
    </MemoryRouter>
  );
}

MockComment.propTypes = {
  comment: PropTypes.instanceOf(Object).isRequired,
};

describe('Comment component', () => {
  it('should render the container correctly', () => {
    render(<MockComment comment={mockCommentData} />);

    const divElement = screen.getByTestId(/comment-container/i);

    expect(divElement).toBeInTheDocument();
  });

  it('should render an avatar correctly', () => {
    render(<MockComment comment={mockCommentData} />);

    const imgElement = screen.getByAltText(/Avatar/i);

    expect(imgElement).toBeInTheDocument();
    expect(imgElement.src).toContain(mockCommentData.author.profile.avatar);
  });

  it('should render the username correctly', () => {
    render(<MockComment comment={mockCommentData} />);

    const usernameElement = screen.getByText(mockCommentData.author.username);

    expect(usernameElement).toBeInTheDocument();
  });

  it('should render the content text correctly', () => {
    render(<MockComment comment={mockCommentData} />);

    const contentElement = screen.getByText(mockCommentData.content);

    expect(contentElement).toBeInTheDocument();
  });

  it('should render the likes correctly', () => {
    render(<MockComment comment={mockCommentData} />);

    const likesElement = screen.getByText(mockCommentData.likes.length);

    expect(likesElement).toBeInTheDocument();
  });
});
