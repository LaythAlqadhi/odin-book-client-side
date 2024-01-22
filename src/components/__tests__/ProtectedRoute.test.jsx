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

const MockComponent = () => <div data-testid="mockComponent">mock component</div>;

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
      </AuthProvider>
    );

    const mockComponent = screen.queryByTestId('mockComponent');
    expect(mockComponent).not.toBeInTheDocument();
  });

  it('renders protected route if theres a token', () => {
    localStorage.getItem.mockReturnValue('mockToken');
    
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
      </AuthProvider>
    );

    const mockComponent = screen.queryByTestId('mockComponent');

    expect(mockComponent).toBeInTheDocument();
  });
});
