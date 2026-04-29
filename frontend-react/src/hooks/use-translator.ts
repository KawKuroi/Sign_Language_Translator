import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import type Webcam from 'react-webcam';
import axios from 'axios';
import { translateApi, type TranslationResponse } from '@/lib/api';

const POLL_MS = 2000;
const MIN_CONFIDENCE = 0.7;
const MAX_WORD_LEN = 64;

export type EngineStatus = 'idle' | 'running' | 'error';

export interface TranslatorState {
  isActive: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
  word: string;
  currentLetter: string | null;
  confidence: number;
  handFound: boolean;
  engineStatus: EngineStatus;
  error: string | null;
  lastResponse: TranslationResponse | null;
}

interface Options {
  webcamRef: RefObject<Webcam | null>;
  pollMs?: number;
  minConfidence?: number;
}

export function useTranslator({ webcamRef, pollMs = POLL_MS, minConfidence = MIN_CONFIDENCE }: Options): TranslatorState {
  const [isActive, setIsActive] = useState(false);
  const [word, setWord] = useState('');
  const [currentLetter, setCurrentLetter] = useState<string | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [handFound, setHandFound] = useState(false);
  const [engineStatus, setEngineStatus] = useState<EngineStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [lastResponse, setLastResponse] = useState<TranslationResponse | null>(null);

  const inFlightRef = useRef<AbortController | null>(null);
  const lastLetterRef = useRef<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const tick = useCallback(async () => {
    const cam = webcamRef.current;
    if (!cam) return;

    if (inFlightRef.current) return;

    let dataUrl: string | null = null;
    try {
      dataUrl = cam.getScreenshot({ width: 640, height: 480 });
    } catch {
      dataUrl = null;
    }
    if (!dataUrl) return;

    const ac = new AbortController();
    inFlightRef.current = ac;
    try {
      const res = await translateApi.translate(dataUrl, ac.signal);
      setLastResponse(res);
      setHandFound(res.handFound);
      setConfidence(res.confidence ?? 0);
      setCurrentLetter(res.letter);
      setEngineStatus('running');
      setError(null);

      if (res.handFound && res.letter && res.confidence >= minConfidence) {
        if (res.letter !== lastLetterRef.current) {
          lastLetterRef.current = res.letter;
          setWord((prev) => (prev.length >= MAX_WORD_LEN ? prev : prev + res.letter));
        }
      } else if (!res.handFound) {
        lastLetterRef.current = null;
      }
    } catch (err) {
      if (axios.isCancel(err)) return;
      setEngineStatus('error');
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      if (inFlightRef.current === ac) {
        inFlightRef.current = null;
      }
    }
  }, [webcamRef, minConfidence]);

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      inFlightRef.current?.abort();
      inFlightRef.current = null;
      return;
    }
    setEngineStatus('running');
    void tick();
    intervalRef.current = setInterval(() => {
      void tick();
    }, pollMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      inFlightRef.current?.abort();
      inFlightRef.current = null;
    };
  }, [isActive, tick, pollMs]);

  const start = useCallback(() => setIsActive(true), []);
  const stop = useCallback(() => {
    setIsActive(false);
    setEngineStatus('idle');
  }, []);
  const reset = useCallback(() => {
    setWord('');
    lastLetterRef.current = null;
  }, []);

  return {
    isActive,
    start,
    stop,
    reset,
    word,
    currentLetter,
    confidence,
    handFound,
    engineStatus,
    error,
    lastResponse,
  };
}
