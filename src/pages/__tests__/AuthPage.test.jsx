import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthPage from '../AuthPage';

describe('AuthPage component', () => {
  it('renders AuthPage component correctly', () => {
    render(<AuthPage />);
    
    expect(screen.container).toMatchSnapshot();
  });
});
