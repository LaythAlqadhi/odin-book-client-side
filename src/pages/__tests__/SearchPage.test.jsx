import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import useFetch from '../../hooks/useFetch';
import { useAuth } from '../../contexts/AuthContext';
import SearchPage from '../SearchPage';

beforeEach(() => {
  vi.mock('../../contexts/AuthContext');
  vi.mock('../../hooks/useFetch');

  useAuth.mockReturnValue({
    payload: {
      token: 'mockToken',
      user: { id: 'mockUserId' },
    },
  });

  useFetch.mockReturnValue({
    fetchData: vi.fn(),
    data: {
      users: [
        {
          id: 'mockId',
          username: 'mockUser',
          profile: {
            displayName: 'mockDisplayName',
            avatar: 'mockAvatar',
          },
          followers: [],
          following: [],
          followingRequests: [],
        },
      ],
    },
  });
});

afterAll(() => {
  vi.clearAllMocks();
});

describe('SearchPage', () => {
  it('should render search input', () => {
    render(<SearchPage />, { wrapper: MemoryRouter });

    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();
  });

  it('should render user data', () => {
    render(<SearchPage />, { wrapper: MemoryRouter });

    const userElement = screen.getByText('mockUser');
    expect(userElement).toBeInTheDocument();
  });
});
