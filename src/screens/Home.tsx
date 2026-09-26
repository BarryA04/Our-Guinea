import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Body, Icon, Kicker, Surface } from '../components';
import type { Translator } from '../i18n';
import type { SavedState } from '../state';
import { Artwork } from '../Artwork';
import { theme } from '../theme';

export function Home({ t, data, wide, start, family }: { t: Translator; data: SavedState; wide: boolean; start: () => void; family: (index: number) => void }) {
  const [aboutOpen, setAboutOpen] = useState(false);
  const { width, fontScale } = useWindowDimensions();
  return <View style={[s.home, wide && { maxWidth: 820 }]}>
    <View style={s.intro}>
      <Text accessibilityRole="header" style={[s.title, wide && { fontSize: 42, lineHeight: 50 }]}>{t('homeSimpleTitle')}</Text>
      <Body>{t('homeSimpleSubtitle')}</Body>
    </View>

    <Pressable accessibilityRole="button" accessibilityLabel={t('homeShare')} accessibilityHint={t('homeShareHint')}
      onPress={() => family(0)} style={({ pressed }) => [s.primary, pressed && s.pressed]}>
      <View style={s.primaryTop}>
        <Artwork kind="memory" />
        <Icon name="arrow-forward" color={c.cream} size={26} />
      </View>
      <Text style={s.primaryTitle}>{t('homeShare')}</Text>
      <Text style={s.primaryHint}>{t('homeShareHint')}</Text>
    </Pressable>

    <View style={[s.options, (width < 400 || fontScale > 1.3) && { flexDirection: 'column' }]}>
      <Pressable accessibilityRole="button" accessibilityLabel={t('homeChildhood')} accessibilityHint={t('homeChildhoodHint')}
        onPress={() => family(3)} style={({ pressed }) => [s.option, s.childhood, pressed && s.pressed]}>
        <View style={s.iconRow}><Artwork kind="games" compact /><Icon name="chevron-forward" color={c.forest} size={18} /></View>
        <Text style={s.optionTitle}>{t('homeChildhood')}</Text>
        <Text style={s.optionHint}>{t('homeChildhoodHint')}</Text>
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel={t('homeLanguage')} accessibilityHint={t('homeLanguageHint')}
        onPress={start} style={({ pressed }) => [s.option, s.language, pressed && s.pressed]}>
        <View style={s.iconRow}><Artwork kind="language" compact /><Icon name="chevron-forward" color={c.forest} size={18} /></View>
        <Text style={s.optionTitle}>{t('homeLanguage')}</Text>
        <Text style={s.optionHint}>{t('homeLanguageHint')}</Text>
      </Pressable>
    </View>

    <View style={s.detailsRow}>
      <Pressable accessibilityRole="button" accessibilityState={{ expanded: aboutOpen }} aria-expanded={aboutOpen}
        onPress={() => setAboutOpen(!aboutOpen)} style={({ pressed }) => [s.about, pressed && s.pressed]}>
        <Icon name="information-circle-outline" color={c.muted} size={20} />
        <Text style={s.aboutText}>{t('homeAbout')}</Text>
        <Icon name={aboutOpen ? 'chevron-up' : 'chevron-down'} color={c.muted} size={16} />
      </Pressable>
      {data.demoComplete && <View style={s.saved}><Icon name="checkmark-circle-outline" color={c.forest} size={18} /><Text style={s.savedText}>{t('homeProgress')}</Text></View>}
    </View>
    {aboutOpen && <Surface>
      <Body>{t('heroBody')}</Body>
      <Kicker>{t('inclusive')}</Kicker><Body small>{t('inclusiveBody')}</Body>
      <Body small>{t('previewNote')}</Body><Body small>{t('privacy')}</Body>
      {data.demoComplete && <><Kicker>{t('progressTitle')}</Kicker><Body small>{t('progressComplete')}</Body><Body small>{t(data.mission === 'shared' ? 'missionDone' : 'missionPlanned')}</Body><Body small>{t('noMastery')}</Body></>}
    </Surface>}
  </View>;
}
const c = theme.color;
const s = StyleSheet.create({
  home: { width: '100%', alignSelf: 'center', gap: 16, paddingBottom: 24 },
  intro: { gap: 6, paddingTop: 8, paddingBottom: 8 },
  title: { fontSize: 32, lineHeight: 39, fontWeight: '600', color: c.forest },
  primary: { backgroundColor: c.forest, padding: 24, borderRadius: 24, gap: 10, minHeight: 190 },
  primaryTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  primaryTitle: { color: c.white, fontSize: 27, lineHeight: 34, fontWeight: '600' },
  primaryHint: { color: '#E4EADC', fontSize: 15, lineHeight: 23 },
  options: { flexDirection: 'row', gap: 12 },
  option: { flex: 1, backgroundColor: c.white, borderWidth: 1, borderColor: c.line, borderRadius: 20, padding: 16, gap: 10, minHeight: 148 },
  language: { backgroundColor: '#E6F1F5', borderColor: '#D1E4EA' },
  childhood: { backgroundColor: '#F1E3C4', borderColor: '#F1E3C4' },
  iconRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  optionTitle: { color: c.forest, fontSize: 19, lineHeight: 25, fontWeight: '600' },
  optionHint: { color: '#48534A', fontSize: 15, lineHeight: 22 },
  detailsRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 4 },
  about: { flexDirection: 'row', alignItems: 'center', minHeight: 48, gap: 8, paddingVertical: 10 },
  aboutText: { color: c.muted, fontSize: 14, lineHeight: 22, flexShrink: 1 },
  saved: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 8 },
  savedText: { color: c.forest, fontSize: 14, lineHeight: 22 },
  pressed: { opacity: 0.78 },
});
