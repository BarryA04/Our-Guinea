import { View, StyleSheet } from 'react-native';
import { Icon, type IconName } from './components';

export type ArtworkKind = 'memory' | 'games' | 'language' | 'place' | 'tradition' | 'food' | 'smile';
const subjects: Record<ArtworkKind, { main: IconName; small: IconName; color: string; accent: string; background: string }> = {
  memory: { main: 'chatbubble', small: 'chatbubble-ellipses', color: '#F1B84B', accent: '#9FD5DF', background: '#2B6553' },
  games: { main: 'football', small: 'sparkles', color: '#C66045', accent: '#23796B', background: '#F9DFA2' },
  language: { main: 'headset', small: 'chatbubble-ellipses', color: '#275C78', accent: '#C66045', background: '#CFE8EF' },
  place: { main: 'home', small: 'sunny', color: '#C66045', accent: '#BF841D', background: '#FBE7BA' },
  tradition: { main: 'people', small: 'heart', color: '#23796B', accent: '#C66045', background: '#DCEDE0' },
  food: { main: 'restaurant', small: 'heart', color: '#C66045', accent: '#23796B', background: '#F8DDD0' },
  smile: { main: 'happy', small: 'sparkles', color: '#A96C12', accent: '#275C78', background: '#FBE7BA' },
};
/** Decorative, generic activity symbols; not representations of a specific Guinean tradition. */
export function Artwork({ kind, compact = false }: { kind: ArtworkKind; compact?: boolean }) {
  const art = subjects[kind];
  return <View accessible={false} aria-hidden importantForAccessibility="no-hide-descendants" style={[s.frame, compact && s.compact]}>
    <View style={[s.blob, { backgroundColor: art.background }]} />
    <View style={s.main}><Icon name={art.main} color={art.color} size={compact ? 44 : 56} /></View>
    <View style={[s.badge, { backgroundColor: kind === 'memory' ? '#E8F4F3' : '#FFF9ED' }]}><Icon name={art.small} color={art.accent} size={compact ? 24 : 28} /></View>
    <View style={[s.dot, { backgroundColor: art.color }]} />
    <View style={[s.dot, { top: 8, left: 14, width: 6, height: 6, backgroundColor: art.accent }]} />
  </View>;
}
const s = StyleSheet.create({
  frame: { width: 120, height: 96, flexShrink: 0 }, compact: { width: 100, height: 78 },
  blob: { position: 'absolute', left: 4, top: 8, right: 12, bottom: 3, borderRadius: 30, transform: [{ rotate: '-8deg' }] },
  main: { position: 'absolute', left: 19, top: 18, transform: [{ rotate: '-8deg' }] },
  badge: { position: 'absolute', right: 0, bottom: 0, width: 44, height: 42, borderRadius: 16, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '9deg' }] },
  dot: { position: 'absolute', right: 7, top: 8, width: 9, height: 9, borderRadius: 5 },
});
