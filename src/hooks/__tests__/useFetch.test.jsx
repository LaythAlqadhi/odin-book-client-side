import { renderHook, act, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import useFetch from '../useFetch';

afterAll(() => {
  vi.clearAllMocks();
});

describe('useFetch hook', () => {
  it('should fetch data successfully', async () => {
    const url = 'https://api.example.com/data';
    const token = 'yourAccessToken';
    const responseData = { foo: 'bar' };

    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(responseData),
    });

    const { result } = renderHook(() => useFetch());
    act(() => {
      result.current.fetchData(url, token, 'GET');
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(responseData);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });

  it('should handle fetch error', async () => {
    const url = 'https://api.example.com/error';
    const token = 'yourAccessToken';
    const errorMessage = 'Error fetching data';

    global.fetch = vi.fn().mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useFetch());
    act(() => {
      result.current.fetchData(url, token, 'GET');
    });

    await waitFor(() => {
      expect(result.current.data).toBe(null);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(errorMessage);
    });
  });
});
