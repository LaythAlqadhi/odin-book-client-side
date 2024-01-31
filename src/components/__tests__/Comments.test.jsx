import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Comments from '../Comments';

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

describe('Comments component', () => {
  it('should render the container', () => {
    render(
      <Comments
        comments={[
          mockCommentData,
          mockCommentData,
          mockCommentData
        ]}
      />
    );

    const containerElement = screen.getByTestId(/comments-container/i);

    expect(containerElement).toBeInTheDocument();
  });

  it('should render "No comments yet" when no comments available', () => {
    render(
      <Comments
        comments={[]}
      />
    );

    const spanElement = screen.getByText(/No comments yet/i);

    expect(spanElement).toBeInTheDocument();
  });

  it('should render a button when comments are available', () => {
    render(
      <Comments
        comments={[
          mockCommentData,
          mockCommentData,
          mockCommentData
        ]}
      />
    );

    const buttonElement = screen.getByRole('button', { name: 'View all 3 comments' });

    expect(buttonElement).toBeInTheDocument();
  });

  it('should render a button with a text like "View all 3 comments" when button is not clicked', () => {
    render(
      <Comments
        comments={[
          mockCommentData,
          mockCommentData,
          mockCommentData
        ]}
      />
    );

    const buttonElement = screen.getByRole('button', { name: 'View all 3 comments' });

    expect(buttonElement).toBeInTheDocument();
  });

  it('should render a button with a text "Hide comments" when button is clicked', async () => {
    render(
      <Comments
        comments={[
          mockCommentData,
          mockCommentData,
          mockCommentData
        ]}
      />
    );

    const buttonElement = screen.getByRole('button', { name: 'View all 3 comments' });
    
    await userEvent.click(buttonElement);

    expect(buttonElement.textContent).toBe('Hide comments')
  });

  it('should render comments when view all clicked', async () => {
    render(
      <Comments
        comments={[
          mockCommentData,
          mockCommentData,
          mockCommentData
        ]}
      />
    );

    const buttonElement = screen.getByRole('button', { name: 'View all 3 comments' });

    await userEvent.click(buttonElement);

    const commentElements = screen.getAllByTestId(/comment-container/i);
    
    expect(commentElements.length).toBe(3);
  });
});
