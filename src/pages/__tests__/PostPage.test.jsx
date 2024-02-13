import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi } from 'vitest';
import { useAuth } from '../../contexts/AuthContext';
import useFetch from '../../hooks/useFetch';
import PostPage from '../PostPage';
import { API_URL } from '../../constants';

const mockCommentData = {
  id: 'mockId',
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
  id: 'mockId',
  author: {
    id: 'mockId',
    username: 'mockUsername',
    profile: {
      avatar: 'mockAvatar.jpg',
    },
  },
  likes: ['', ''],
  content: {
    text: 'mockText',
    media: 'mockMedia.png',
  },
  comments: [mockCommentData],
  createdAt: Date.now(),
};

beforeEach(() => {
  vi.mock('../../contexts/AuthContext');
  vi.mock('../../hooks/useFetch');

  useAuth.mockReturnValue({
    payload: {
      token: 'mockToken',
      user: mockPostData.author,
    },
  });

  useFetch.mockReturnValue({
    fetchData: vi.fn(),
    data: {
      post: mockPostData,
    },
    loading: false,
    error: null,
  });
});

afterAll(() => {
  vi.clearAllMocks();
});

describe('PostPage', () => {
  it('should fetch post data on mount', () => {
    render(
      <MemoryRouter
        initialEntries={[`/post/${mockPostData.id}`]}
        initialIndex={0}
      >
        <Routes>
          <Route path="/post/:postId" element={<PostPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(useFetch().fetchData).toHaveBeenCalledWith(
      `${API_URL}/posts/${mockPostData.id}`,
      'mockToken',
    );
  });

  it('should render post data if available', () => {
    render(
      <MemoryRouter>
        <PostPage />
      </MemoryRouter>,
    );

    const postText = screen.getByText(mockPostData.content.text);

    expect(postText).toBeInTheDocument();
  });
});
