export type SavedState = { version: 1; language: 'en' | 'fr'; demoComplete: boolean; mission: 'planned' | 'shared' | null };
export const initialState: SavedState = { version: 1, language: 'en', demoComplete: false, mission: null };
export function decodeState(raw: string | null): SavedState {
  if (raw === null) return { ...initialState };
  const value = JSON.parse(raw);
  if (!value || value.version !== 1 || !['en', 'fr'].includes(value.language)
    || typeof value.demoComplete !== 'boolean' || ![null, 'planned', 'shared'].includes(value.mission)
    || (value.demoComplete !== (value.mission !== null))) throw new Error('Invalid saved state');
  return { version: 1, language: value.language, demoComplete: value.demoComplete, mission: value.mission };
}
export function completeDemo(state: SavedState, mission: 'planned' | 'shared'): SavedState {
  return { ...state, demoComplete: true, mission: state.mission === 'shared' ? 'shared' : mission };
}
