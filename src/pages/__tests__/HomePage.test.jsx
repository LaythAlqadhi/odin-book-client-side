import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import HomePage from '../HomePage';

beforeAll(() => {
  vi.mock('../../components/Posts', () => ({
    __esModule: true,
    default: () => <div data-testid="mockPosts">Mocked Posts</div>,
  }));
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
