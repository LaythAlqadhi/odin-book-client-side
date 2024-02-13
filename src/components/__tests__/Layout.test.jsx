import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from '../Layout';

describe('Layout component', () => {
  it('renders Layout component correctly', () => {
    render(
      <Router>
        <Layout />
      </Router>,
    );

    expect(screen.container).toMatchSnapshot();
  });
});
