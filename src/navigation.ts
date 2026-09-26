import { useEffect, useState } from 'react';
import { BackHandler, Platform } from 'react-native';
export type Route = 'home' | 'listen' | 'meaning' | 'mission' | 'results' | 'family';
export function useNavigation() {
  const [route, setRoute] = useState<Route>('home');
  useEffect(() => {
    if (Platform.OS === 'web') {
      window.history.replaceState({ ourGuinea: true }, '');
      const onBack = () => setRoute('home');
      window.addEventListener('popstate', onBack);
      return () => window.removeEventListener('popstate', onBack);
    }
  }, []);
  useEffect(() => {
    if (Platform.OS !== 'android' || route === 'home') return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => { setRoute('home'); return true; });
    return () => sub.remove();
  }, [route]);
  function navigate(next: Route) {
    if (Platform.OS === 'web' && route === 'home' && next !== 'home') window.history.pushState({ ourGuinea: true }, '');
    // Screen history is one level deep; device/browser Back exits the activity to Home.
    setRoute(next);
  }
  return { route, navigate };
}
