import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Body, Button, Heading, Kicker, Label, Progress, Surface } from '../components';
import { demoChoices, type Choice } from '../content/learning';
import type { Translator } from '../i18n';
import type { Route } from '../navigation';
import type { SavedState } from '../state';
import { theme } from '../theme';
const c = theme.color;
export type JourneyProps = {
  route: Route; t: Translator; cueOpen: boolean; setCueOpen: (open: boolean) => void;
  choice: Choice | null; choose: (choice: Choice) => void; feedback: 'correct' | 'wrong' | null;
  check: () => void; retry: () => void; navigate: (route: Route) => void;
  finish: (mission: 'planned' | 'shared') => void; data: SavedState;
  status: string; replay: () => void;
};
export function Journey(p: JourneyProps) {
  const { t, route } = p;
  return <>
    {route !== 'results' && <Progress step={route === 'listen' ? 1 : route === 'meaning' ? 2 : 3} t={t} />}
    {route === 'listen' && <>
      <Kicker>{t('module')}</Kicker><Heading>{t('listenTitle')}</Heading><Body>{t('listenBody')}</Body>
      <Surface>
        <Label>{t('reviewLabel')}</Label>
        <View style={s.wave} accessible={false} importantForAccessibility="no-hide-descendants">
          {[12, 24, 40, 58, 32, 72, 48, 30, 62, 44, 24, 16].map((height, i) => <View key={i} style={{ width: 6, height, borderRadius: 4, backgroundColor: i % 3 === 0 ? c.gold : '#A6B7A7' }} />)}
        </View>
        <Heading>{t('audioTitle')}</Heading><Body small>{t('audioSubtitle')}</Body>
        <Button label={t('audioUnavailable')} disabled onPress={() => {}} />
        <Body small>{t('audioExplanation')}</Body>
        <Button label={t(p.cueOpen ? 'hideCue' : 'showCue')} secondary expanded={p.cueOpen} onPress={() => p.setCueOpen(!p.cueOpen)} />
        {p.cueOpen && <View style={s.cue} accessibilityLiveRegion="polite"><Kicker>{t('cueLabel')}</Kicker><Body>{t('cueText')}</Body></View>}
      </Surface>
      <Button label={t('toMeaning')} disabled={!p.cueOpen} onPress={() => p.navigate('meaning')} />
      <Body small>{t('previewNote')}</Body>
    </>}
    {route === 'meaning' && <>
      <Label>{t('reviewShort')}</Label><Heading>{t('meaningTitle')}</Heading><Body>{t('meaningBody')}</Body>
      <View style={s.cue}><Kicker>{t('cueLabel')}</Kicker><Body>{t('cueText')}</Body></View>
      <View style={{ gap: 12 }}>
        {demoChoices.map((option, i) => <Pressable key={option.id} accessibilityRole="radio"
          accessibilityLabel={t(option.label)} accessibilityState={{ checked: p.choice === option.id, disabled: p.feedback !== null }}
          disabled={p.feedback !== null} onPress={() => p.choose(option.id)}
          style={({ pressed }) => [s.choice, p.choice === option.id && s.selected, pressed && { opacity: 0.8 }]}>
          <Text style={[s.letter, p.choice === option.id && { backgroundColor: c.forest, color: c.white }]}>{String.fromCharCode(65 + i)}</Text>
          <Text style={s.choiceText}>{t(option.label)}</Text>
          {p.choice === option.id && <Text style={s.check} accessibilityElementsHidden>✓</Text>}
        </Pressable>)}
      </View>
      {p.feedback && <View accessibilityRole="alert" accessibilityLiveRegion="polite" style={[s.feedback, p.feedback === 'wrong' && { backgroundColor: c.errorBg }]}>
        <Text style={s.feedbackTitle}>{p.feedback === 'correct' ? '✓ ' : '↺ '}{t(p.feedback === 'correct' ? 'correctTitle' : 'wrongTitle')}</Text>
        <Body>{t(p.feedback === 'correct' ? 'correctBody' : 'wrongBody')}</Body>
      </View>}
      {!p.feedback && <Button label={t('check')} disabled={!p.choice} onPress={p.check} />}
      {p.feedback === 'wrong' && <Button label={t('tryAgain')} onPress={p.retry} />}
      {p.feedback === 'correct' && <Button label={t('toMission')} onPress={() => p.navigate('mission')} />}
    </>}
    {route === 'mission' && <>
      <Kicker>{t('missionKicker')}</Kicker><Heading>{t('missionTitle')}</Heading><Body>{t('missionBody')}</Body>
      <Surface style={{ borderLeftWidth: 4, borderLeftColor: c.gold }}>
        <Text style={s.quote}>{t('missionPrompt')}</Text>
        {(['missionTip1', 'missionTip2', 'missionTip3'] as const).map((key, i) => <View key={key} style={{ flexDirection: 'row', gap: 12 }}><Text style={s.number}>{i + 1}</Text><View style={{ flex: 1 }}><Body small>{t(key)}</Body></View></View>)}
      </Surface>
      <Body small>{t('missionTrust')}</Body>
      <Button label={t('doneMission')} onPress={() => p.finish('shared')} />
      <Button label={t('planMission')} secondary onPress={() => p.finish('planned')} />
    </>}
    {route === 'results' && <>
      <View style={s.resultMark}><Text style={{ color: c.forest, fontSize: 32 }}>✓</Text></View>
      <Kicker>{t('resultsKicker')}</Kicker><Heading>{t('resultsTitle')}</Heading><Body>{t('resultsBody')}</Body>
      <Surface>
        <View style={s.resultRow}><Body>{t('resultDemo')}</Body><Text style={s.resultStatus}>{t('completed')}</Text></View>
        <View style={s.resultRow}><Body>{t('resultFamily')}</Body><Text style={s.resultStatus}>{t(p.data.mission === 'shared' ? 'shared' : 'planned')}</Text></View>
        <Body small>{t('noMastery')}</Body>
        <Text accessibilityLiveRegion="polite" style={s.resultStatus}>{t(p.status === 'saving' ? 'saving' : p.status === 'saved' ? 'saved' : 'saveFailed')}</Text>
      </Surface>
      <Label>{t('reviewShort')}</Label><Body small>{t('previewNote')}</Body>
      <Button label={t('home')} onPress={() => p.navigate('home')} />
      <Button label={t('restart')} secondary onPress={p.replay} />
    </>}
  </>;
}
const s = StyleSheet.create({
  wave: { height: 88, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  cue: { backgroundColor: c.goldBg, borderRadius: 16, padding: 20, gap: 10 },
  choice: { backgroundColor: c.white, borderColor: c.line, borderWidth: 2, borderRadius: 18, padding: 16, minHeight: 72, flexDirection: 'row', alignItems: 'center', gap: 16 },
  selected: { borderColor: c.forest, backgroundColor: c.pale },
  letter: { backgroundColor: c.cream, color: c.forest, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 9, fontSize: 15, fontWeight: '700' },
  choiceText: { color: c.ink, fontSize: 17, lineHeight: 25, flex: 1 }, check: { color: c.forest, fontSize: 20 },
  feedback: { backgroundColor: c.pale, borderRadius: 18, padding: 20, gap: 8 },
  feedbackTitle: { color: c.ink, fontWeight: '700', fontSize: 18, lineHeight: 26 },
  quote: { color: c.forest, fontFamily: 'serif', fontSize: 25, lineHeight: 35, marginBottom: 12 },
  number: { color: c.forest, fontWeight: '700', fontSize: 15, paddingTop: 2 },
  resultMark: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#E9D6A5', alignItems: 'center', justifyContent: 'center' },
  resultRow: { gap: 6, borderBottomColor: c.line, borderBottomWidth: 1, paddingBottom: 14 },
  resultStatus: { color: c.forest, fontSize: 14, lineHeight: 22, fontWeight: '600' },
});
