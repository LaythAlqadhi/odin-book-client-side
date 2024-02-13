import React from 'react';
import { render, screen } from '@testing-library/react';
import Icon from '../Icon';

describe('Icon component', () => {
  it('renders Icon component correctly', () => {
    render(<Icon />);

    expect(screen.container).toMatchSnapshot();
  });
});
