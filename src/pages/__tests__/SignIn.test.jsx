import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import SignIn from '../SignIn';

beforeAll(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ token: 'mockToken' }),
      status: 200,
    }),
  );
});

afterAll(() => {
  vi.clearAllMocks();
});

describe('SignIn component', () => {
  it('renders SignIn component correctly', async () => {
    render(
      <Router>
        <SignIn />
      </Router>,
    );

    const username = screen.getByLabelText('Username');
    const password = screen.getByLabelText('Password');
    const button = screen.getByText('Sign In');

    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    expect(fetch).not.toHaveBeenCalled();

    await act(async () => {
      await userEvent.type(username, 'mockUsername');
      await userEvent.type(password, 'mockPassword');
      await userEvent.click(button);
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://b32a7bae-6556-4da3-a848-f0e0b80bf4f0-00-36mr5e3zsor9c.janeway.replit.dev/api/auth/signin',
      {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'mockUsername',
          password: 'mockPassword',
        }),
      },
    );
  });
});
