import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../HomePage';

describe('HomePage component', () => {
  it('renders HomePage component correctly', () => {
    render(<HomePage/>);
    
    expect(screen.container).toMatchSnapshot();
  });
});
