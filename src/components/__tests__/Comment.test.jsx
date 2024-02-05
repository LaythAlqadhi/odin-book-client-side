import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Comment from '../Comment';

const mockCommentData = {
  author: {
    username: 'mockUsername',
    profile: {
      avatar: 'mockAvatar.jpg',
    },
  },
  likes: 100,
  content: 'mockContent',
};

const MockComment = ({ comment }) => {
  return (
    <MemoryRouter>
      <Comment comment={comment} />
    </MemoryRouter>
  );
}

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

    const likesElement = screen.getByText(mockCommentData.likes);

    expect(likesElement).toBeInTheDocument();
  });
});
