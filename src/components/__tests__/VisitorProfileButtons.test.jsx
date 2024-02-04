import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import useFetch from '../../hooks/useFetch';
import VisitorProfileButtons from '../VisitorProfileButtons';

beforeAll(() => {
  vi.mock('../../hooks/useFetch');
});

afterAll(() => {
  vi.clearAllMocks();
});

describe('VisitorProfileButtons component', () => {
  it('should render follow button when the current user is not following the profile owner', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: null,
      loading: true,
      error: null,
    }));

    render(
      <VisitorProfileButtons
        token="mockToken"
        me={{ username: 'mockUsername' }}
        user={{
          username: 'mockUsername',
          followers: [],
          followingRequests: [],
        }}
      />,
    );

    const followButtonElement = screen.getByRole('button', { name: /Follow/i });

    expect(followButtonElement).toBeInTheDocument();
  });

  it('should render following button when the current user is following the profile owner', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: null,
      loading: true,
      error: null,
    }));

    render(
      <VisitorProfileButtons
        token="mockToken"
        me={{ username: 'mockUsername' }}
        user={{
          username: 'mockUsername',
          followers: ['mockUsername'],
          followingRequests: [],
        }}
      />,
    );

    const followingButtonElement = screen.getByRole('button', {
      name: /Following/i,
    });

    expect(followingButtonElement).toBeInTheDocument();
  });

  it('should render Requested button when the current user is sended a Request follow to the profile owner', () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: null,
      loading: true,
      error: null,
    }));

    render(
      <VisitorProfileButtons
        token="mockToken"
        me={{ username: 'mockUsername' }}
        user={{
          username: 'mockUsername',
          followers: [],
          followingRequests: ['mockUsername'],
        }}
      />,
    );

    const requestedButtonElement = screen.getByRole('button', {
      name: /Requested/i,
    });

    expect(requestedButtonElement).toBeInTheDocument();
  });

  it('should render requested button when follow button is clicked', async () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: null,
      loading: true,
      error: null,
    }));

    render(
      <VisitorProfileButtons
        token="mockToken"
        me={{ username: 'mockUsername' }}
        user={{
          username: 'mockUsername',
          followers: [],
          followingRequests: [],
        }}
      />,
    );

    const followButtonElement = screen.getByRole('button', { name: /Follow/i });

    await userEvent.click(followButtonElement);

    const requestedButtonElement = screen.getByRole('button', {
      name: /Requested/i,
    });

    expect(followButtonElement).not.toBeInTheDocument();
    expect(requestedButtonElement).toBeInTheDocument();
  });

  it('should render follow button when requested button is clicked', async () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: null,
      loading: true,
      error: null,
    }));

    render(
      <VisitorProfileButtons
        token="mockToken"
        me={{ username: 'mockUsername' }}
        user={{
          username: 'mockUsername',
          followers: [],
          followingRequests: ['mockUsername'],
        }}
      />,
    );

    const requestedButtonElement = screen.getByRole('button', {
      name: /Requested/i,
    });

    await userEvent.click(requestedButtonElement);

    const followButtonElement = screen.getByRole('button', { name: /Follow/i });

    expect(requestedButtonElement).not.toBeInTheDocument();
    expect(followButtonElement).toBeInTheDocument();
  });

  it('should render follow button when following button is clicked', async () => {
    useFetch.mockImplementation(() => ({
      fetchData: vi.fn(),
      data: null,
      loading: true,
      error: null,
    }));

    render(
      <VisitorProfileButtons
        token="mockToken"
        me={{ username: 'mockUsername' }}
        user={{
          username: 'mockUsername',
          followers: ['mockUsername'],
          followingRequests: [],
        }}
      />,
    );

    const followingButtonElement = screen.getByRole('button', {
      name: /Following/i,
    });

    await userEvent.click(followingButtonElement);

    const followButtonElement = screen.getByRole('button', { name: /Follow/i });

    expect(followingButtonElement).not.toBeInTheDocument();
    expect(followButtonElement).toBeInTheDocument();
  });
});
