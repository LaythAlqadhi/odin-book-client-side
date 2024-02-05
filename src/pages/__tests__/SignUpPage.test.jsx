import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import SignUpPage from '../SignUpPage';
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

function MockSignUpPage() {
  return (
    <Router>
      <SignUpPage />
    </Router>
  );
}


describe('SignUpPage component', () => {
  it('should render loading when the data still not resolved', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: null,
      loading: true,
      error: false,
    }));
    
    render(<MockSignUpPage />);

    const divElement = screen.getByText(/Loading/i);

    expect(divElement).toBeInTheDocument();
  });

  it('should render message "Something went wrong" when an error occurs', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: null,
      loading: false,
      error: true,
    }));
    
    render(<MockSignUpPage />);

    const divElement = screen.getByText(/Something went wrong/i);

    expect(divElement).toBeInTheDocument();
  });

  it('should render navigate to sign in page when sign up button is clicked', async () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: {
        user: {},
      },
      loading: false,
      error: false,
    }));

    render(<MockSignUpPage />);

    const firstName = screen.getByLabelText('First Name');
    const lastName = screen.getByLabelText('Last Name');
    const username = screen.getByLabelText('Username');
    const email = screen.getByLabelText('Email Address');
    const password = screen.getByLabelText('Password');
    const passwordConfirmation = screen.getByLabelText('Password Confirmation');
    const signUpButton = screen.getByRole('button', { name: /Sign Up/i });
    const continueWithGitHub = screen.getByRole('button', { name: /Continue with GitHub/i });

    await act(async () => {
      await userEvent.type(firstName, 'mockFirstName');
      await userEvent.type(lastName, 'mockLastName');
      await userEvent.type(username, 'mockUsername');
      await userEvent.type(email, 'mockEmail');
      await userEvent.type(password, 'mockPassword');
      await userEvent.type(passwordConfirmation, 'mockPasswordConfirmation');
      await userEvent.click(signUpButton);
    });

    expect(navigate).toHaveBeenCalledWith('/auth/signin');
  });
});
