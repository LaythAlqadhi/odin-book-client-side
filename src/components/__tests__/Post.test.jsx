import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import PropTypes from 'prop-types';
import Post from '../Post';

beforeAll(() => {
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

const mockCommentData = {
  author: {
    id: 'mockId',
    username: 'mockUsername',
    profile: {
      avatar: 'mockAvatar.jpg',
    },
  },
  likes: ['', ''],
  content: 'mockContent',
};

const mockPostData = {
  author: {
    id: 'mockId',
    username: 'mockUsername',
    profile: {
      avatar: 'mockAvatar.jpg',
    },
  },
  likes: ['', ''],
  content: 'mockContent',
  comments: [mockCommentData],
  createdAt: Date.now(),
};

function MockPost({ post }) {
  return (
    <Router>
      <Post post={post} />
    </Router>
  );
}

MockPost.propTypes = {
  post: PropTypes.instanceOf(Object).isRequired,
};

describe('Post component', () => {
  it('should render the container correctly', () => {
    render(<MockPost post={mockPostData} />);

    const divElement = screen.getByTestId(/post-container/i);

    expect(divElement).toBeInTheDocument();
  });

  it('should render the avatar correctly', () => {
    render(<MockPost post={mockPostData} />);

    const avatarElement = screen.getByAltText(/Avatar/i);

    const avatarImgSrc = mockPostData.author.profile.avatar;

    expect(avatarElement).toBeInTheDocument();
    expect(avatarElement.src).toContain(avatarImgSrc);
  });

  it('should render the username correctly', () => {
    render(<MockPost post={mockPostData} />);

    const linkElement = screen.getByRole('link', {
      name: mockPostData.author.username,
    });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement.href).toContain(`profile/${mockPostData.author.id}`);
  });

  it('should render like button correctly', () => {
    render(<MockPost post={mockPostData} />);

    const likeButtonElement = screen.getByRole('button', { name: 'Like' });

    expect(likeButtonElement).toBeInTheDocument();
  });

  it('should render comment button correctly', () => {
    render(<MockPost post={mockPostData} />);

    const commentButtonElement = screen.getByRole('button', {
      name: 'Comment',
    });

    expect(commentButtonElement).toBeInTheDocument();
  });

  it('should render share button correctly', () => {
    render(<MockPost post={mockPostData} />);

    const shareButtonElement = screen.getByRole('button', { name: 'Share' });

    expect(shareButtonElement).toBeInTheDocument();
  });

  it('should render date of the post', () => {
    render(<MockPost post={mockPostData} />);

    const dateElement = screen.getByLabelText(/Date/i);

    expect(dateElement).toBeInTheDocument();
  });
});
