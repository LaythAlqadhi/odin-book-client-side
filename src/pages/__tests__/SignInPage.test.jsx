import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import SignInPage from '../SignInPage';
import useFetch from '../../hooks/useFetch';

const navigate = vi.fn()

beforeAll(() => {
  vi.mock('../../hooks/useFetch');
  vi.mock('react-router-dom', async () => ({
    ...(await vi.importActual('react-router-dom')),
    useNavigate: () => navigate,
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

  it('should render navigate to home page when sign in button is clicked', async () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: {
        user: {},
      },
      loading: false,
      error: false,
    }));

    render(<MockSignInPage />);

    const username = screen.getByLabelText('Username');
    const password = screen.getByLabelText('Password');
    const signInButton = screen.getByRole('button', { name: /Sign In/i });
    const continueWithGitHub = screen.getByRole('button', { name: /Continue with GitHub/i });

    await act(async () => {
      await userEvent.type(username, 'mockUsername');
      await userEvent.type(password, 'mockPassword');
      await userEvent.click(signInButton);
    });

    expect(navigate).toHaveBeenCalledWith('/');
  });
});
