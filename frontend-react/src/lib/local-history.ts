import type { HistoryItem } from './api';

const KEY = 'signa.local-history';
const MAX = 200;

export const localHistory = {
  list(): HistoryItem[] {
    try {
      return JSON.parse(localStorage.getItem(KEY) ?? '[]') as HistoryItem[];
    } catch {
      return [];
    }
  },
  save(text: string): HistoryItem {
    const item: HistoryItem = { id: Date.now(), text, savedAt: new Date().toISOString() };
    const all = [item, ...localHistory.list()].slice(0, MAX);
    localStorage.setItem(KEY, JSON.stringify(all));
    return item;
  },
  clear(): void {
    localStorage.removeItem(KEY);
  },
};
