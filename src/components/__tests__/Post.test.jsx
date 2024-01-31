import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter as Router } from 'react-router-dom';
import Post from '../Post';

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

const mockPostData = {
  author: {
    username: 'mockUsername',
    profile: {
      avatar: 'mockAvatar.jpg'
    }
  },
  likes: 100,
  content: 'mockContent',
  comments: [mockCommentData],
  createdAt: Date.now(),
}

const MockPost = ({ post }) => {
  return (
    <Router>
      <Post post={post} />
    </Router>
  );
}

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

    const linkElement = screen.getByRole('link', { name: mockPostData.author.username });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement.href).toContain (`profile/${mockPostData.author.username}`);
  });

  it('should render like button correctly', () => {
    render(<MockPost post={mockPostData} />);

    const likeButtonElement = screen.getByRole('button', { name: 'Like' });

    expect(likeButtonElement).toBeInTheDocument();
  });

  it('should render comment button correctly', () => {
    render(<MockPost post={mockPostData} />);

    const commentButtonElement = screen.getByRole('button', { name: 'Comment' });

    expect(commentButtonElement).toBeInTheDocument();
  });

  it('should render share button correctly', () => {
    render(<MockPost post={mockPostData} />);

    const shareButtonElement = screen.getByRole('button', { name: 'Share' });

    expect(shareButtonElement).toBeInTheDocument();
  });

  it('should render the number of likes correctly', () => {
    render(<MockPost post={mockPostData} />);

    const likesElement = screen.getByLabelText(/The number of likes/i);

    expect(likesElement).toBeInTheDocument();
  });

  it('should render date of the post', () => {
    render(<MockPost post={mockPostData} />);

    const dateElement = screen.getByLabelText(/Date/i);
    
    expect(dateElement).toBeInTheDocument();
  });

  it('should render the comments when View all comments is clicked', async () => {
    render(<MockPost post={mockPostData} />);

    const buttonElement = screen.getByRole('button', { name: 'View all 1 comments' });

    await userEvent.click(buttonElement);

    const commentElements = screen.getAllByTestId(/comment-container/i);

    expect(commentElements.length).toBe(1);
  });
});
