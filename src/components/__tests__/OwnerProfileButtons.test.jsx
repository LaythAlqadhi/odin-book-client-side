import React from 'react';
import { render, screen } from '@testing-library/react';
import OwnerProfileButtons from '../OwnerProfileButtons';

describe('OwnerProfileButtons component', () => {
  it('should render edit button correctly', () => {
    render(<OwnerProfileButtons />);

    const editButtonElement = screen.getByRole('button', {
      name: /Edit Profile/i,
    });

    expect(editButtonElement).toBeInTheDocument();
  });

  it('should render share button correctly', () => {
    render(<OwnerProfileButtons />);

    const shareButtonElement = screen.getByRole('button', {
      name: /Share Profile/i,
    });

    expect(shareButtonElement).toBeInTheDocument();
  });
});
