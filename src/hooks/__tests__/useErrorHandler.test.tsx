import { renderHook, act } from '@testing-library/react';
import { useErrorHandler } from '../useErrorHandler';

describe('useErrorHandler', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('initializes with null error', () => {
    const { result } = renderHook(() => useErrorHandler());
    expect(result.current.error).toBeNull();
  });

  it('handles Error objects', () => {
    const { result } = renderHook(() => useErrorHandler());
    const testError = new Error('Test error message');

    act(() => {
      result.current.handleError(testError);
    });

    expect(result.current.error).toEqual({
      message: 'Test error message',
      technical: testError.stack,
    });
  });

  it('handles string errors', () => {
    const { result } = renderHook(() => useErrorHandler());

    act(() => {
      result.current.handleError('String error message');
    });

    expect(result.current.error).toEqual({
      message: 'String error message',
    });
  });

  it('handles unknown error types', () => {
    const { result } = renderHook(() => useErrorHandler());
    const unknownError = { custom: 'error' };

    act(() => {
      result.current.handleError(unknownError);
    });

    expect(result.current.error).toEqual({
      message: 'An unexpected error occurred',
      technical: JSON.stringify(unknownError),
    });
  });

  it('clears error state', () => {
    const { result } = renderHook(() => useErrorHandler());

    act(() => {
      result.current.handleError('Test error');
    });
    expect(result.current.error).not.toBeNull();

    act(() => {
      result.current.clearError();
    });
    expect(result.current.error).toBeNull();
  });
}); 