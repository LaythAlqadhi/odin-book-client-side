import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import HomePage from '../HomePage';

describe('HomePage component', () => {
  it('renders HomePage component in the document correctly', () => {
    render(
      <MemoryRouter>
        <HomePage/>
      </MemoryRouter>
    );
    
    expect(screen.container).toMatchSnapshot();
  });
});
