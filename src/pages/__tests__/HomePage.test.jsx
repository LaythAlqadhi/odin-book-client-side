import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import HomePage from '../HomePage';
import Posts from '../../components/Posts';

beforeAll(() => {
  vi.mock('../../components/Posts', () => {
    return {
      __esModule: true,
      default: () => {
        return (
          <div data-testid="mockPosts">Mocked Posts</div>
        );
      },
    };
  });
});

afterAll(() => {
  vi.clearAllMocks();
});

describe('HomePage component', () => {
  it('should render mock posts component', async () => {
    render(<HomePage />);
    
    const mockPosts = screen.getByTestId('mockPosts');

    expect(mockPosts).toBeInTheDocument();
  });
});
