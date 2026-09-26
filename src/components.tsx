import { useEffect, useRef, type ComponentProps, type ReactNode } from 'react';
import { AccessibilityInfo, Animated, Platform, Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { theme } from './theme';
import type { Translator } from './i18n';
const c = theme.color;
export type IconName = ComponentProps<typeof Ionicons>['name'];
export function Icon({ name, color = c.forest, size = 24 }: { name: IconName; color?: string; size?: number }) {
  return <View accessible={false} aria-hidden importantForAccessibility="no-hide-descendants" style={{ flexShrink: 0 }}><Ionicons name={name} color={color} size={size} /></View>;
}
export function Button({ label, onPress, secondary = false, disabled = false, expanded, icon }: {
  label: string; onPress: () => void; secondary?: boolean; disabled?: boolean; expanded?: boolean; icon?: IconName;
}) {
  return <Pressable accessibilityRole="button" accessibilityState={{ disabled, expanded }} disabled={disabled} onPress={onPress}
    style={({ pressed }) => [ui.button, secondary && ui.secondary, disabled && ui.disabled, pressed && { opacity: 0.78 }]}>
    <View style={ui.buttonContents}>{icon && <Icon name={icon} size={20} color={disabled ? c.muted : secondary ? c.forest : c.white} />}<Text style={[ui.buttonText, secondary && { color: c.forest }, disabled && { color: c.muted }]}>{label}</Text></View>
  </Pressable>;
}
export function Heading({ children, hero = false, light = false }: { children: ReactNode; hero?: boolean; light?: boolean }) {
  return <Text accessibilityRole="header" style={[ui.heading, hero && ui.heroHeading, light && { color: c.cream }]}>{children}</Text>;
}
export function Body({ children, light = false, small = false }: { children: ReactNode; light?: boolean; small?: boolean }) {
  return <Text style={[ui.body, small && ui.small, light && { color: '#E4EADC' }]}>{children}</Text>;
}
export function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <Text style={[ui.kicker, light && { color: '#F0CF88' }]}>{children}</Text>;
}
export function Surface({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return <View style={[ui.surface, style]}>{children}</View>;
}
export function Label({ children }: { children: ReactNode }) {
  return <View style={ui.label}><Text style={ui.labelText}>{children}</Text></View>;
}
export function Progress({ step, t }: { step: number; t: Translator }) {
  return <View style={{ gap: 12 }} accessibilityRole="progressbar" accessibilityLabel={t('progressAccessibility')}
    accessibilityValue={{ min: 0, max: 3, now: step }}>
    <View style={ui.row}>{[1, 2, 3].map((n) => <View key={n} style={[ui.progressTrack, n <= step && { backgroundColor: c.forest }]} />)}</View>
    <View style={ui.row}>{(['stepListen', 'stepMeaning', 'stepMission'] as const).map((key, i) =>
      <Text key={key} style={[ui.stepLabel, i + 1 === step && { color: c.forest, fontWeight: '700' }]}>{t(key)}</Text>)}</View>
  </View>;
}
export function Fade({ children }: { children: ReactNode }) {
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    let active = true;
    void AccessibilityInfo.isReduceMotionEnabled().then((reduced) => {
      if (!active || reduced) return;
      opacity.setValue(0.6);
      Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: Platform.OS !== 'web' }).start();
    }).catch(() => {});
    return () => { active = false; opacity.stopAnimation(); };
  }, [opacity]);
  return <Animated.View style={{ opacity, gap: 24 }}>{children}</Animated.View>;
}
export const ui = StyleSheet.create({
  heading: { fontSize: 34, lineHeight: 42, fontWeight: '600', color: c.forest },
  heroHeading: { fontSize: 52, lineHeight: 58 },
  body: { color: c.muted, fontSize: 16, lineHeight: 25 }, small: { fontSize: 14, lineHeight: 22 },
  kicker: { fontSize: 11, lineHeight: 18, letterSpacing: 1.6, fontWeight: '700', color: c.forest },
  surface: { backgroundColor: c.white, padding: 24, borderRadius: 24, borderWidth: 1, borderColor: c.line, gap: 16 },
  button: { minHeight: 52, backgroundColor: c.forest, paddingHorizontal: 20, paddingVertical: 15, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  buttonContents: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  buttonText: { flexShrink: 1, fontSize: 16, lineHeight: 23, fontWeight: '600', color: c.white, textAlign: 'center' },
  secondary: { backgroundColor: c.pale }, disabled: { backgroundColor: '#E4E4DA' },
  label: { alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6, backgroundColor: c.goldBg },
  labelText: { color: '#624614', fontWeight: '600', fontSize: 11, lineHeight: 17, letterSpacing: 0.5 },
  row: { flexDirection: 'row', gap: 12 }, progressTrack: { flex: 1, height: 5, borderRadius: 3, backgroundColor: c.line },
  stepLabel: { flex: 1, fontSize: 12, lineHeight: 18, color: c.muted },
});
