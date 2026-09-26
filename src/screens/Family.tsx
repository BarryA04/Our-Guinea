import { useState } from 'react';
import { Text, View } from 'react-native';
import { Body, Button, Heading, Kicker, Surface, ui } from '../components';
import { familyPrompts } from '../content/family';
import type { Language, Translator } from '../i18n';
import { Artwork } from '../Artwork';
import { theme } from '../theme';
export function Family({ t, language, initialIndex, home, narrow }: { t: Translator; language: Language; initialIndex: number; home: () => void; narrow: boolean }) {
  const [index, setIndex] = useState(initialIndex);
  const [expanded, setExpanded] = useState(false);
  const item = familyPrompts[index];
  const change = (next: number) => { setIndex(next); setExpanded(false); };
  return <>
    <Kicker>{t('familyKicker')}</Kicker><Heading>{t('familyHeading')}</Heading>
    <Body>{t('familyInstruction')}</Body>
    <Surface>
      <View accessibilityLiveRegion="polite" style={{ gap: 16 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}><Artwork kind={item.id} compact /><Kicker>{t(item.collection)}</Kicker></View>
        <Body small>{t('questionCount', { current: index + 1, total: familyPrompts.length })}</Body>
        <Text accessibilityRole="header" style={{ fontSize: 26, lineHeight: 36, color: theme.color.forest }}>{item[language].question}</Text>
      </View>
      <Button icon={expanded ? 'chevron-up' : 'chevron-down'} label={t(expanded ? 'followClose' : 'followOpen')} secondary expanded={expanded} onPress={() => setExpanded(!expanded)} />
      {expanded && <View accessibilityLiveRegion="polite" style={{ gap: 14 }}>{item[language].followUps.map((q) => <Body key={q}>• {q}</Body>)}</View>}
    </Surface>
    <View style={[ui.row, narrow && { flexDirection: 'column' }]}>
      <View style={{ flex: 1 }}><Button icon="arrow-back" label={t('previous')} secondary disabled={index === 0} onPress={() => change(Math.max(0, index - 1))} /></View>
      <View style={{ flex: 1 }}><Button icon={index === familyPrompts.length - 1 ? 'refresh' : 'arrow-forward'} label={t(index === familyPrompts.length - 1 ? 'again' : 'next')} onPress={() => change((index + 1) % familyPrompts.length)} /></View>
    </View>
    <Body small>{t('familyHint')}</Body><Button icon="home-outline" label={t('home')} secondary onPress={home} />
  </>;
}
