import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundPage from '../NotFoundPage';

describe('NotFoundPage component', () => {
  it('renders NotFoundPage component correctly', () => {
    render(<NotFoundPage />);

    expect(screen.container).toMatchSnapshot();
  });
});
