import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import { decodeState, initialState, type SavedState } from './state';
const key = 'our-guinea.prototype.v1';
export function useLocalState() {
  const [data, setData] = useState<SavedState>(initialState);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<'saved' | 'saving' | 'error' | 'load-error'>('saved');
  const latest = useRef(data);
  const queue = useRef(Promise.resolve());
  const revision = useRef(0);
  async function load() {
    setReady(false);
    try {
      const saved = decodeState(await AsyncStorage.getItem(key));
      latest.current = saved; setData(saved); setStatus('saved');
    } catch { setStatus('load-error'); }
    finally { setReady(true); }
  }
  useEffect(() => { void load(); }, []);
  function save(next: SavedState) {
    latest.current = next; setData(next); setStatus('saving');
    const request = ++revision.current;
    queue.current = queue.current.catch(() => {}).then(async () => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(next));
        if (request === revision.current) setStatus('saved');
      } catch { if (request === revision.current) setStatus('error'); }
    });
  }
  function update(transform: (state: SavedState) => SavedState) { save(transform(latest.current)); }
  return { data, ready, status, update, retrySave: () => save(latest.current), retryLoad: load };
}
