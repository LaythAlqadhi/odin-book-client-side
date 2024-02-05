import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import SignInPage from '../SignInPage';
import useFetch from '../../hooks/useFetch';

const signIn = vi.fn();

beforeAll(() => {
  vi.mock('../../hooks/useFetch');
  vi.mock('../../contexts/AuthContext', async () => ({
    ...(await vi.importActual('../../contexts/AuthContext')),
    useAuth: () => ({
      payload: null,
      signIn: signIn,
      signUp: vi.fn(),
    }),
  }));
});

afterAll(() => {
  vi.clearAllMocks();
});

function MockSignInPage() {
  return (
    <Router>
      <SignInPage />
    </Router>
  );
}


describe('SignInPage component', () => {
  it('should render loading when the data still not resolved', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: null,
      loading: true,
      error: false,
    }));

    render(<MockSignInPage />);

    const divElement = screen.getByTestId(/loading/i);

    expect(divElement).toBeInTheDocument();
  });

  it('should render message "Something went wrong" when an error occurs', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: null,
      loading: false,
      error: true,
    }));

    render(<MockSignInPage />);

    const divElement = screen.getByText(/Something went wrong/i);

    expect(divElement).toBeInTheDocument();
  });

  it('should execute signIn function when user signed in successfully', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: {
        payload: {
          token: 'mockToken',
        },
      },
      loading: false,
      error: false,
    }));

    render(<MockSignInPage />);

    expect(signIn).toHaveBeenCalledWith({ token: 'mockToken' });
  });
});
