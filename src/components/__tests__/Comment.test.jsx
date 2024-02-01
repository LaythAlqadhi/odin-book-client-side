import React from 'react';
import { render, screen } from '@testing-library/react';
import Comment from '../Comment';

const mockCommentData = {
  author: {
    username: 'mockUsername',
    profile: {
      avatar: 'mockAvatar.jpg'
    }
  },
  likes: 100,
  content: 'mockContent',
}

describe('Comment component', () => {
  it('should render the container correctly', () => {
    render(<Comment comment={mockCommentData} />);

    const divElement = screen.getByTestId(/comment-container/i);

    expect(divElement).toBeInTheDocument();
  });

  it('should render an avatar correctly', () => {
    render(<Comment comment={mockCommentData} />);

    const imgElement = screen.getByAltText(/Avatar/i);

    expect(imgElement).toBeInTheDocument();
    expect(imgElement.src).toContain(mockCommentData.author.profile.avatar);
  });

  it('should render the username correctly', () => {
    render(<Comment comment={mockCommentData} />);

    const usernameElement = screen.getByText(mockCommentData.author.username);

    expect(usernameElement).toBeInTheDocument();
  });

  it('should render the content text correctly', () => {
    render(<Comment comment={mockCommentData} />);

    const contentElement = screen.getByText(mockCommentData.content);

    expect(contentElement).toBeInTheDocument();
  });

  it('should render the likes correctly', () => {
    render(<Comment comment={mockCommentData} />);

    const likesElement = screen.getByText(mockCommentData.likes);

    expect(likesElement).toBeInTheDocument();
  });
});
