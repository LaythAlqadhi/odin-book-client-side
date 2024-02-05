import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import AuthPage from '../AuthPage';

describe('AuthPage component', () => {
  it('renders AuthPage component correctly', () => {
    render(
      <Router>
        <AuthPage />
      </Router>,
    );

    expect(screen.container).toMatchSnapshot();
  });
});
