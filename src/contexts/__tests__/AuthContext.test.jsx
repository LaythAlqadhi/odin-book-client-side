import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '../AuthContext';

test('AuthContext provides signIn and signOut functions', async () => {
  function MockComponent() {
    const { signIn, signOut } = useAuth();

    return (
      <div>
        <button type="button" onClick={() => signIn({ token: 'mockToken', user: {} })}>
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
  
  const getPayload = () => JSON.parse(localStorage.getItem('payload'));
  
  expect(getPayload().value).toEqual({ token: 'mockToken', user: {} });

  await act(async () => {
    await userEvent.click(screen.getByText('Sign Out'));
  });
  
  expect(getPayload()?.value).toEqual(null || undefined);

});
