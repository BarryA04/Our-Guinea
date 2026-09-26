// The empty fields are intentional. This item cannot be taught until reviewed.
export const learningItem = {
  id: 'phrase-001', language: 'guinean-pular', pular: '', audioSource: '',
  translation: { en: '', fr: '' }, context: { en: '', fr: '' },
  verificationStatus: 'needs-review' as const, sourceNote: '', reviewedBy: '',
};
export const demoChoices = [
  { id: 'greeting', label: 'choiceGreeting' },
  { id: 'thanks', label: 'choiceThanks' },
  { id: 'goodbye', label: 'choiceGoodbye' },
] as const;
export type Choice = typeof demoChoices[number]['id'];
export function isDemoCorrect(choice: string) { return choice === 'greeting'; }
