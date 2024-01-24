import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import HomePage from '../HomePage';
import useFetch from '../../hooks/useFetch';

beforeAll(() => {
  vi.mock('../../hooks/useFetch');
});

afterAll(() => {
  vi.clearAllMocks();
});

describe('HomePage', () => {
  it('renders loading state', async () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: null,
      loading: true,
      error: null,
    }));

    render(<HomePage />);

    await waitFor(() => screen.getByText('Loading...'));

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', async () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: null,
      loading: false,
      error: 'Error message',
    }));

    render(<HomePage />);

    await waitFor(() => screen.getByText('Something went wrong.'));

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('renders posts', async () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: {
        posts: [
          {
            id: 1,
            author: {
              profile: {
                avatar: 'author-avatar.jpg',
                displayName: 'Author Name',
              },
              username: 'author_username',
            },
            content: 'Post content',
            likes: 5,
            comments: [
              {
                _id: 'comment_id',
                author: {
                  profile: {
                    avatar: 'commenter-avatar.jpg',
                  },
                  username: 'commenter_username',
                },
                content: 'Comment content',
              },
            ],
          },
        ],
      },
      loading: false,
      error: null,
    }));

    render(<HomePage />);

    await waitFor(() => screen.getByText('Author Name'));

    expect(screen.getByText('Author Name')).toBeInTheDocument();
    expect(screen.getByText('Post content')).toBeInTheDocument();
    expect(screen.getByText('Likes: 5')).toBeInTheDocument();
    expect(screen.getByText('Comments: 1')).toBeInTheDocument();
    expect(screen.getByText('commenter_username')).toBeInTheDocument();
    expect(screen.getByText('Comment content')).toBeInTheDocument();
  });
});
