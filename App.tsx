import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Platform, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Body, Button, Fade } from './src/components';
import { translator } from './src/i18n';
import { theme } from './src/theme';
import { completeDemo } from './src/state';
import { useLocalState } from './src/useLocalState';
import { useNavigation } from './src/navigation';
import { isDemoCorrect, type Choice } from './src/content/learning';
import { Home } from './src/screens/Home';
import { Family } from './src/screens/Family';
import { Journey } from './src/screens/Journey';

export default function App() {
  return <SafeAreaProvider><OurGuinea /></SafeAreaProvider>;
}
function OurGuinea() {
  const storage = useLocalState();
  const { route, navigate } = useNavigation();
  const [familyIndex, setFamilyIndex] = useState(0);
  const [cueOpen, setCueOpen] = useState(false);
  const [choice, setChoice] = useState<Choice | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const { width, fontScale } = useWindowDimensions();
  const t = translator(storage.data.language);
  const wide = width >= 850 && fontScale < 1.3;
  function start() { setCueOpen(false); setChoice(null); setFeedback(null); navigate('listen'); }
  function family(index: number) { setFamilyIndex(index); navigate('family'); }
  function finish(mission: 'planned' | 'shared') {
    storage.update((state) => completeDemo(state, mission));
    navigate('results');
  }
  if (!storage.ready) return <SafeAreaView style={s.loading}><ActivityIndicator color={theme.color.forest} /><Text style={s.navText}>{t('loading')}</Text></SafeAreaView>;
  return <SafeAreaView style={s.page}>
    <StatusBar style="dark" />
    <ScrollView key={route} style={s.page} contentContainerStyle={s.scroll}>
      <View style={s.shell}>
        <View style={[s.header, width < 520 && { alignItems: 'flex-start' }]}>
          <Pressable accessibilityRole="button" accessibilityLabel={t('brandAccessibility')} onPress={() => navigate('home')} style={s.brandButton}>
            <View style={s.brandMark} accessible={false}><View style={s.markLine} /><View style={[s.markLine, { height: 22, backgroundColor: theme.color.gold }]} /><View style={[s.markLine, { height: 14 }]} /></View>
            <Text style={s.brand}>{t('brand')}</Text>
          </Pressable>
          <View accessibilityLabel={t('language')} style={s.languages}>
            {(['en', 'fr'] as const).map((lang) => <Pressable key={lang} accessibilityRole="button" accessibilityState={{ selected: storage.data.language === lang }}
              onPress={() => storage.update((state) => ({ ...state, language: lang }))}
              style={[s.languageButton, storage.data.language === lang && s.languageActive]}>
              <Text style={[s.languageText, storage.data.language === lang && { color: theme.color.white }]}>{t(lang === 'en' ? 'english' : 'french')}</Text>
            </Pressable>)}
          </View>
        </View>
        <View style={s.nav}>
          <Pressable accessibilityRole="button" accessibilityState={{ selected: route === 'home' }} onPress={() => navigate('home')} style={[s.navButton, route === 'home' && s.navActive]}><Text style={s.navText}>{t('navHome')}</Text></Pressable>
          <Pressable accessibilityRole="button" accessibilityState={{ selected: route === 'family' }} onPress={() => family(0)} style={[s.navButton, route === 'family' && s.navActive]}><Text style={s.navText}>{t('navFamily')}</Text></Pressable>
        </View>
        {(storage.status === 'error' || storage.status === 'load-error') && <View accessibilityRole="alert" style={s.error}>
          <Body>{t(storage.status === 'load-error' ? 'loadFailed' : 'saveFailed')}</Body>
          <Button label={t(storage.status === 'load-error' ? 'retryLoad' : 'retrySave')} secondary onPress={storage.status === 'load-error' ? storage.retryLoad : storage.retrySave} />
        </View>}
        <View style={[s.content, route !== 'home' && s.reading]}>
          <Fade key={route}>
            {route === 'home' ? <Home t={t} data={storage.data} wide={wide} start={start} family={family} />
              : route === 'family' ? <Family key={familyIndex} t={t} language={storage.data.language} initialIndex={familyIndex} home={() => navigate('home')} narrow={width < 390 || fontScale > 1.3} />
              : <Journey route={route} t={t} cueOpen={cueOpen} setCueOpen={setCueOpen} choice={choice} choose={setChoice} feedback={feedback}
                  check={() => { if (choice) setFeedback(isDemoCorrect(choice) ? 'correct' : 'wrong'); }} retry={() => { setChoice(null); setFeedback(null); }}
                  navigate={navigate} finish={finish} data={storage.data} status={storage.status} replay={start} />}
            {route !== 'home' && route !== 'family' && route !== 'results' && <Button label={t('home')} secondary onPress={() => navigate('home')} />}
          </Fade>
        </View>
        <View style={s.footer}><Text style={s.footerTitle}>{t('footer')}</Text><Body small>{t('privacy')}</Body></View>
      </View>
    </ScrollView>
  </SafeAreaView>;
}
const c = theme.color;
const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: c.cream }, loading: { flex: 1, backgroundColor: c.cream, alignItems: 'center', justifyContent: 'center', gap: 16 },
  scroll: { flexGrow: 1, alignItems: 'center' }, shell: { width: '100%', maxWidth: 1120, paddingHorizontal: 20, paddingTop: 12 },
  header: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingVertical: 12 },
  brandButton: { flexDirection: 'row', alignItems: 'center', minHeight: 48, gap: 10 },
  brand: { color: c.forest, fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif', fontSize: 25, fontWeight: '600' },
  brandMark: { width: 36, height: 36, backgroundColor: c.forest, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 3 },
  markLine: { width: 3, height: 14, borderRadius: 2, backgroundColor: c.cream },
  languages: { flexDirection: 'row', backgroundColor: '#EAE6DB', borderRadius: 12, padding: 3, flexWrap: 'wrap' },
  languageButton: { minHeight: 44, paddingVertical: 10, paddingHorizontal: 12, justifyContent: 'center', borderRadius: 10 },
  languageActive: { backgroundColor: c.forest }, languageText: { fontSize: 13, fontWeight: '600', color: c.forest },
  nav: { flexDirection: 'row', gap: 24, borderBottomWidth: 1, borderBottomColor: c.line, marginBottom: 28 },
  navButton: { paddingVertical: 13, paddingHorizontal: 4, minHeight: 48, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  navActive: { borderBottomColor: c.forest }, navText: { fontSize: 15, lineHeight: 22, fontWeight: '600', color: c.forest },
  content: { width: '100%' }, reading: { maxWidth: 640, alignSelf: 'center' },
  footer: { marginTop: 40, paddingTop: 24, paddingBottom: 32, borderTopWidth: 1, borderTopColor: c.line, gap: 10 },
  footerTitle: { color: c.forest, fontSize: 10, lineHeight: 18, letterSpacing: 1.4, fontWeight: '700' },
  error: { padding: 20, borderRadius: 16, backgroundColor: c.errorBg, gap: 12, marginBottom: 24 },
});
