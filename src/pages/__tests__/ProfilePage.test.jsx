import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi } from 'vitest';
import { AuthProvider } from '../../contexts/AuthContext';
import ProfilePage from '../ProfilePage';

beforeAll(() => {
  vi.mock('../../contexts/AuthContext', async () => ({
    ...(await vi.importActual('../../contexts/AuthContext')),
    useAuth: () => ({
      payload: {
        token: 'mockToken',
        user: {
          id: 'mockUserId',
          username: 'mockUsername',
          profile: {
            displayName: 'mockDisplayName',
            avatar: 'mockAvatar',
            bio: 'mockBio',
          },
        },
      },
      signIn: vi.fn(),
      signUp: vi.fn(),
    }),
  }));

  vi.mock('../../components/UserProfileHeader', () => ({
    __esModule: true,
    default: vi
      .fn()
      .mockImplementation(() => <div data-testid="mockUserProfileHeader" />),
  }));

  vi.mock('../../components/Posts', () => ({
    __esModule: true,
    default: vi.fn().mockImplementation(() => <div data-testid="mockPosts" />),
  }));
});

afterAll(() => {
  vi.clearAllMocks();
});

describe('ProfilePage', () => {
  it('renders ProfilePage component correctly', () => {
    render(
      <MemoryRouter initialEntries={['/profile/mockUserId']} initialIndex={0}>
        <AuthProvider>
          <Routes>
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('mockUserProfileHeader')).toBeInTheDocument();
    expect(screen.getByTestId('mockPosts')).toBeInTheDocument();
  });
});
