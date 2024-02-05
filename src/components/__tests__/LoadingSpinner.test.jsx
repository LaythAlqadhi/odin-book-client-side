import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner component', () => {
  it('renders LoadingSpinner component correctly', () => {
    render(<LoadingSpinner />);

    expect(screen.container).toMatchSnapshot();
  });
});
