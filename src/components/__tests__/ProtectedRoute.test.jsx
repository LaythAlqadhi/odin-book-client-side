import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi } from 'vitest';
import { AuthProvider } from '../../contexts/AuthContext';
import ProtectedRoute from '../ProtectedRoute';

beforeEach(() => {
  const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  };
  global.localStorage = mockLocalStorage;
});

afterEach(() => {
  vi.clearAllMocks();
});

function MockComponent() {
  return <div data-testid="mockComponent">mock component</div>;
}

describe('ProtectedRoute component', () => {
  it('prevents protected route if theres no token', () => {
    localStorage.getItem.mockReturnValue(null);

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route
              path="/private"
              element={
                <ProtectedRoute>
                  <MockComponent />
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthProvider>,
    );

    const mockComponent = screen.queryByTestId('mockComponent');
    expect(mockComponent).not.toBeInTheDocument();
  });

  it('renders protected route if theres a token', () => {
    const expirationTime = new Date().getTime() + 10 * 60 * 1000;
    const payloadWithExpiry = {
      value: {
        token: 'mockToken',
        user: {},
      },
      expiry: expirationTime,
    };

    localStorage.getItem.mockReturnValue(JSON.stringify(payloadWithExpiry));

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route
              path="/private"
              element={
                <ProtectedRoute>
                  <MockComponent />
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthProvider>,
    );

    const mockComponent = screen.queryByTestId('mockComponent');

    expect(mockComponent).toBeInTheDocument();
  });
});
