import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import SignUpPage from '../SignUpPage';

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ token: 'mockToken' }),
      status: 200,
    }),
  );
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('SignUp component', () => {
  it('renders SignUp component correctly', async () => {
    render(
      <Router>
        <SignUpPage />
      </Router>,
    );

    const firstName = screen.getByLabelText('First Name');
    const lastName = screen.getByLabelText('Last Name');
    const username = screen.getByLabelText('Username');
    const email = screen.getByLabelText('Email Address');
    const password = screen.getByLabelText('Password');
    const passwordConfirmation = screen.getByLabelText('Password Confirmation');
    const submit = screen.getByText('Sign Up');
    const continueWithGitHub = screen.getByText('Continue with GitHub');

    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(passwordConfirmation).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
    expect(continueWithGitHub).toBeInTheDocument();

    expect(fetch).not.toHaveBeenCalled();

    await act(async () => {
      await userEvent.type(firstName, 'mockFirstName');
      await userEvent.type(lastName, 'mockLastName');
      await userEvent.type(username, 'mockUsername');
      await userEvent.type(email, 'mockEmail');
      await userEvent.type(password, 'mockPassword');
      await userEvent.type(passwordConfirmation, 'mockPasswordConfirmation');
      await userEvent.click(submit);
    });
    
    expect(fetch).toHaveBeenCalledWith(
      'https://b32a7bae-6556-4da3-a848-f0e0b80bf4f0-00-36mr5e3zsor9c.janeway.replit.dev/v1/auth/signup',
      {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: 'mockFirstName',
          lastName: 'mockLastName',
          username: 'mockUsername',
          email: 'mockEmail',
          password: 'mockPassword',
          passwordConfirmation: 'mockPasswordConfirmation'
        }),
      },
    );
  });
});
