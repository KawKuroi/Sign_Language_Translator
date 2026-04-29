import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import type Webcam from 'react-webcam';
import { useTranslator } from './use-translator';
import { server } from '@/test/mocks/server';

function makeWebcamRef(getScreenshot: () => string | null) {
  return {
    current: {
      getScreenshot,
    } as unknown as Webcam,
  };
}

describe('useTranslator', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('initial state is idle and inactive', () => {
    const ref = makeWebcamRef(() => null);
    const { result } = renderHook(() => useTranslator({ webcamRef: ref }));
    expect(result.current.isActive).toBe(false);
    expect(result.current.word).toBe('');
    expect(result.current.engineStatus).toBe('idle');
  });

  it('appends a letter when confidence >= threshold and dedupes consecutive duplicates', async () => {
    const ref = makeWebcamRef(() => 'data:image/jpeg;base64,aaaa');
    const { result } = renderHook(() => useTranslator({ webcamRef: ref, pollMs: 1000 }));

    act(() => result.current.start());

    await vi.waitFor(() => expect(result.current.word).toBe('A'));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
    await vi.waitFor(() => expect(result.current.word).toBe('A'));

    server.use(
      http.post('http://localhost:8080/translate', () =>
        HttpResponse.json({ handFound: false, letter: null, confidence: 0, top: [] }),
      ),
    );
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    server.use(
      http.post('http://localhost:8080/translate', () =>
        HttpResponse.json({
          handFound: true,
          letter: 'A',
          confidence: 0.95,
          top: [{ letter: 'A', confidence: 0.95 }],
        }),
      ),
    );
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
    await vi.waitFor(() => expect(result.current.word).toBe('AA'));
  });

  it('does not append below confidence threshold', async () => {
    server.use(
      http.post('http://localhost:8080/translate', () =>
        HttpResponse.json({
          handFound: true,
          letter: 'B',
          confidence: 0.3,
          top: [{ letter: 'B', confidence: 0.3 }],
        }),
      ),
    );
    const ref = makeWebcamRef(() => 'data:image/jpeg;base64,zzzz');
    const { result } = renderHook(() => useTranslator({ webcamRef: ref, pollMs: 1000 }));
    act(() => result.current.start());
    await vi.waitFor(() => expect(result.current.engineStatus).toBe('running'));
    expect(result.current.word).toBe('');
  });

  it('reset clears the word', async () => {
    const ref = makeWebcamRef(() => 'data:image/jpeg;base64,xx');
    const { result } = renderHook(() => useTranslator({ webcamRef: ref, pollMs: 1000 }));
    act(() => result.current.start());
    await vi.waitFor(() => expect(result.current.word.length).toBeGreaterThan(0));
    act(() => result.current.reset());
    expect(result.current.word).toBe('');
  });

  it('stop deactivates polling', async () => {
    const ref = makeWebcamRef(() => 'data:image/jpeg;base64,xx');
    const { result } = renderHook(() => useTranslator({ webcamRef: ref, pollMs: 1000 }));
    act(() => result.current.start());
    await waitFor(() => expect(result.current.isActive).toBe(true));
    act(() => result.current.stop());
    expect(result.current.isActive).toBe(false);
    expect(result.current.engineStatus).toBe('idle');
  });
});
