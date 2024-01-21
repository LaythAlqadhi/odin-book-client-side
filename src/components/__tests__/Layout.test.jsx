import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from '../Layout';

describe('Layout component', () => {
  it('renders Layout component correctly', () => {
    render(<Layout/>);
    
    expect(screen.container).toMatchSnapshot();
  });
});
