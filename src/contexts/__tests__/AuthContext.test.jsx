import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '../AuthContext';

test('AuthContext provides signIn and signOut functions', async () => {
  function MockComponent() {
    const { signIn, signOut } = useAuth();

    return (
      <div>
        <button type="button" onClick={() => signIn('testToken')}>
          Sign In
        </button>
        <button type="button" onClick={signOut}>
          Sign Out
        </button>
      </div>
    );
  }

  render(
    <AuthProvider>
      <MockComponent />
    </AuthProvider>,
  );

  await act(async () => {
    await userEvent.click(screen.getByText('Sign In'));
  });

  expect(localStorage.getItem('token')).toBe('testToken');

  await act(async () => {
    await userEvent.click(screen.getByText('Sign Out'));
  });

  expect(localStorage.getItem('token')).toBe(null);
});
