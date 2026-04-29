import { describe, expect, it } from 'vitest';
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
  it('initial state is idle and inactive', () => {
    const ref = makeWebcamRef(() => null);
    const { result } = renderHook(() => useTranslator({ webcamRef: ref }));
    expect(result.current.isActive).toBe(false);
    expect(result.current.word).toBe('');
    expect(result.current.engineStatus).toBe('idle');
  });

  it('appends a letter when confidence >= threshold', async () => {
    const ref = makeWebcamRef(() => 'data:image/jpeg;base64,aaaa');
    const { result } = renderHook(() => useTranslator({ webcamRef: ref, pollMs: 50 }));

    act(() => result.current.start());

    await waitFor(() => expect(result.current.word).toBe('A'), { timeout: 2000 });
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
    const { result } = renderHook(() => useTranslator({ webcamRef: ref, pollMs: 50 }));
    act(() => result.current.start());
    await waitFor(() => expect(result.current.engineStatus).toBe('running'));
    await new Promise((r) => setTimeout(r, 150));
    expect(result.current.word).toBe('');
  });

  it('reset clears the word', async () => {
    const ref = makeWebcamRef(() => 'data:image/jpeg;base64,xx');
    const { result } = renderHook(() => useTranslator({ webcamRef: ref, pollMs: 50 }));
    act(() => result.current.start());
    await waitFor(() => expect(result.current.word.length).toBeGreaterThan(0));
    act(() => result.current.reset());
    expect(result.current.word).toBe('');
  });

  it('stop deactivates polling and resets engineStatus', async () => {
    const ref = makeWebcamRef(() => 'data:image/jpeg;base64,xx');
    const { result } = renderHook(() => useTranslator({ webcamRef: ref, pollMs: 50 }));
    act(() => result.current.start());
    await waitFor(() => expect(result.current.isActive).toBe(true));
    act(() => result.current.stop());
    expect(result.current.isActive).toBe(false);
    expect(result.current.engineStatus).toBe('idle');
  });

  it('skips when getScreenshot returns null', async () => {
    let called = 0;
    server.use(
      http.post('http://localhost:8080/translate', () => {
        called += 1;
        return HttpResponse.json({ handFound: false, letter: null, confidence: 0, top: [] });
      }),
    );
    const ref = makeWebcamRef(() => null);
    const { result } = renderHook(() => useTranslator({ webcamRef: ref, pollMs: 50 }));
    act(() => result.current.start());
    await new Promise((r) => setTimeout(r, 200));
    expect(called).toBe(0);
    expect(result.current.word).toBe('');
  });
});
