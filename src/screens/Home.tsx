import { StyleSheet, Text, View } from 'react-native';
import { Body, Button, Heading, Kicker, Label, Surface, ui } from '../components';
import type { Translator } from '../i18n';
import type { SavedState } from '../state';
import { theme } from '../theme';
export function Home({ t, data, wide, start, family }: { t: Translator; data: SavedState; wide: boolean; start: () => void; family: (index: number) => void }) {
  return <>
    <View style={[s.hero, wide && { flexDirection: 'row', padding: 40 }]}>
      <View style={{ flex: 1, gap: 22 }}>
        <Kicker light>{t('eyebrow')}</Kicker>
        <Heading hero light>{t('heroTitle')}</Heading>
        <Body light>{t('heroBody')}</Body>
        <View style={s.goldRule} />
        <Body small light>{t('heroNote')}</Body>
      </View>
      <View style={[s.feature, wide && { flex: 0.85 }]}>
        <Kicker>{t('introKicker')}</Kicker>
        <Heading>{t('introTitle')}</Heading>
        <Label>{t('reviewShort')}</Label>
        <Body>{t('introBody')}</Body>
        <Text style={s.meta}>{t('module')}</Text>
        <Text style={s.meta}>{t('duration')}</Text>
        <Button label={t(data.demoComplete ? 'replay' : 'start')} onPress={start} />
      </View>
    </View>
    <View style={[s.lower, wide && { flexDirection: 'row' }]}>
      <View style={{ flex: 1.35, gap: 18 }}>
        <Kicker>{t('familyKicker')}</Kicker>
        <Heading>{t('familyTitle')}</Heading>
        <Body>{t('familyBody')}</Body>
        <Button label={t('familyOpen')} secondary onPress={() => family(0)} />
        <View style={s.childhood}>
          <Text accessibilityRole="header" style={s.childTitle}>{t('childhood')}</Text>
          <Body small>{t('childhoodBody')}</Body>
          <Button label={t('childhoodOpen')} secondary onPress={() => family(3)} />
        </View>
      </View>
      <Surface style={{ flex: 1, backgroundColor: '#EFEBDD' }}>
        <Kicker>{t('progressTitle')}</Kicker>
        <Text style={s.progressNumber}>{data.demoComplete ? '01' : '00'}<Text style={s.progressTotal}> / 01</Text></Text>
        <Body>{t(data.demoComplete ? 'progressComplete' : 'progressEmpty')}</Body>
        <View style={[ui.progressTrack, { flex: 0, height: 6, backgroundColor: data.demoComplete ? theme.color.forest : theme.color.line }]} />
        <Body small>{t(data.mission === 'shared' ? 'missionDone' : data.mission === 'planned' ? 'missionPlanned' : 'missionEmpty')}</Body>
        <Body small>{t('noMastery')}</Body>
      </Surface>
    </View>
    <View style={s.inclusive}><Kicker>{t('inclusive')}</Kicker><Body small>{t('inclusiveBody')}</Body></View>
  </>;
}
const s = StyleSheet.create({
  hero: { backgroundColor: theme.color.forest, borderRadius: 28, padding: 24, gap: 32 },
  feature: { backgroundColor: theme.color.cream, borderRadius: 20, padding: 24, gap: 16 },
  goldRule: { width: 56, height: 3, backgroundColor: theme.color.gold },
  meta: { color: theme.color.muted, fontSize: 13, lineHeight: 20 },
  lower: { gap: 32, paddingVertical: 12 },
  childhood: { gap: 12, borderTopWidth: 1, borderTopColor: theme.color.line, paddingTop: 20 },
  childTitle: { color: theme.color.forest, fontSize: 19, fontWeight: '600' },
  progressNumber: { color: theme.color.forest, fontSize: 56, fontWeight: '300' }, progressTotal: { fontSize: 22, color: theme.color.muted },
  inclusive: { borderTopWidth: 1, borderColor: theme.color.line, paddingTop: 24, gap: 8 },
});
