import { renderHook, act } from '@testing-library/react';
import { useToggle } from './useToggle';

describe('test the useToggle custom hook', () => {
  it('should use Toggle', async () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current.isActive).toBe(false);
    expect(typeof result.current.handleSetIsActive).toBe('function');
  });

  it('should change isActive value', () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current.handleSetIsActive();
    });

    expect(result.current.isActive).toBe(true);

    act(() => {
      result.current.handleSetIsActive();
    });

    expect(result.current.isActive).toBe(false);
  });
});
