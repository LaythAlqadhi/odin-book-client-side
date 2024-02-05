import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import SignUpPage from '../SignUpPage';
import useFetch from '../../hooks/useFetch';

const navigate = vi.fn();

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

    render(<MockSignUpPage />);

    const divElement = screen.getByText(/Something went wrong/i);

    expect(divElement).toBeInTheDocument();
  });

  it('should navigate to sign in page when sign up button is clicked', () => {
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

    act(() => {
      fireEvent.change(firstName, { target: { value: 'mockFirstName' } });
      fireEvent.change(lastName, { target: { value: 'mockLastName' } });
      fireEvent.change(username, { target: { value: 'mockUsername' } });
      fireEvent.change(email, { target: { value: 'mockEmail' } });
      fireEvent.change(password, { target: { value: 'mockPassword' } });
      fireEvent.change(passwordConfirmation, {
        target: { value: 'mockPassword' },
      });
      fireEvent.click(signUpButton);
    });

    expect(navigate).toHaveBeenCalledWith('/auth/signin');
  });
});
