import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import Comments from '../Comments';

const mockUseFetch = {
  fetchData: vi.fn(),
  data: null,
  loading: true,
  error: null,
};

beforeAll(() => {
  vi.mock('../../hooks/useFetch', () => ({
    default: vi.fn(() => mockUseFetch),
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

const mockCommentData = {
  id: 'mockId',
  author: {
    id: 'mockId',
    username: 'mockUsername',
    profile: {
      displayName: 'mockDisplayName',
      avatar: 'mockAvatar.jpg',
    },
  },
  likes: ['', ''],
  content: 'mockContent',
};

const mockPostData = {
  id: 'mockId',
  author: {
    id: 'mockId',
    username: 'mockUsername',
    profile: {
      displayName: 'mockDisplayName',
      avatar: 'mockAvatar.jpg',
    },
  },
  comments: [mockCommentData],
  likes: ['', ''],
  content: {
    media: 'mockMedia.jpg',
    text: 'mockText',
  },
};

function MockComments({ commentsRef, areCommentsOpened, postId }) {
  return (
    <Router>
      <Comments
        commentsRef={commentsRef}
        areCommentsOpened={areCommentsOpened}
        postId={postId}
      />
    </Router>
  );
}

MockComments.propTypes = {
  commentsRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  areCommentsOpened: PropTypes.bool.isRequired,
  postId: PropTypes.string.isRequired,
};

describe('Comments component', () => {
  it('should render the container', () => {
    render(
      <MockComments
        commentsRef={vi.fn()}
        areCommentsOpened
        postId={mockPostData.id}
      />,
    );

    const containerElement = screen.getByTestId(/comments-container/i);

    expect(containerElement).toBeInTheDocument();
  });

  it('should render comment input correctly', () => {
    render(
      <MockComments
        commentsRef={vi.fn()}
        areCommentsOpened
        postId={mockPostData.id}
      />,
    );

    const inputElement = screen.getByLabelText(/Write a comment/i);

    expect(inputElement).toBeInTheDocument();
  });

  it('should render "Loading..." when loading state is true', async () => {
    render(
      <MockComments
        commentsRef={vi.fn()}
        areCommentsOpened
        postId={mockPostData.id}
      />,
    );

    const loadingElement = screen.getByText(/Loading/i);

    expect(loadingElement).toBeInTheDocument();
  });

  it('should render comments correctly', async () => {
    mockUseFetch.loading = false;
    mockUseFetch.data = {
      comments: [mockCommentData],
    };

    render(
      <MockComments
        commentsRef={vi.fn()}
        areCommentsOpened
        postId={mockPostData.id}
      />,
    );

    const commentElement = screen.getByText(mockCommentData.content);

    expect(commentElement).toBeInTheDocument();
  });
});
