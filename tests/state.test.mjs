import { test } from 'node:test';
import assert from 'node:assert/strict';
import { completeDemo, decodeState, initialState } from '../src/state.ts';
import { learningItem, isDemoCorrect } from '../src/content/learning.ts';
import { familyPrompts } from '../src/content/family.ts';
import { en } from '../src/locales/en.ts';
import { fr } from '../src/locales/fr.ts';

test('empty storage starts in English with no awarded completion', () => {
  assert.deepEqual(decodeState(null), initialState);
});
test('completion and French round-trip through serialized local storage', () => {
  const next = completeDemo({ ...initialState, language: 'fr' }, 'planned');
  assert.deepEqual(decodeState(JSON.stringify(next)), next);
});
test('replay does not increase progress or downgrade a shared mission', () => {
  const shared = completeDemo(initialState, 'shared');
  assert.deepEqual(completeDemo(shared, 'planned'), shared);
  assert.deepEqual(completeDemo(shared, 'shared'), shared);
});
test('planned mission can become shared', () => {
  assert.equal(completeDemo(completeDemo(initialState, 'planned'), 'shared').mission, 'shared');
});
test('malformed, incompatible and contradictory records are rejected', () => {
  for (const raw of ['{', 'null', '{}', JSON.stringify({ ...initialState, version: 2 }), JSON.stringify({ ...initialState, language: 'xx' }), JSON.stringify({ ...initialState, demoComplete: true }), JSON.stringify({ ...initialState, mission: 'shared' })]) {
    assert.throws(() => decodeState(raw));
  }
});
test('unreviewed learning material contains no invented Pular or audio', () => {
  assert.equal(learningItem.verificationStatus, 'needs-review');
  for (const value of [learningItem.pular, learningItem.audioSource, learningItem.translation.en, learningItem.translation.fr, learningItem.reviewedBy]) assert.equal(value, '');
});
test('demo feedback has exactly one intended correct choice', () => {
  assert.equal(isDemoCorrect('greeting'), true);
  for (const choice of ['thanks', 'goodbye', '']) assert.equal(isDemoCorrect(choice), false);
});
test('both locales cover every interface key and interpolation token', () => {
  assert.deepEqual(Object.keys(fr).sort(), Object.keys(en).sort());
  for (const key of Object.keys(en) as (keyof typeof en)[]) {
    assert.ok(fr[key].trim());
    assert.deepEqual(fr[key].match(/\{\w+\}/g), en[key].match(/\{\w+\}/g));
  }
});
test('all six original questions retain two follow-ups in both languages', () => {
  assert.equal(familyPrompts.length, 6);
  for (const item of familyPrompts) for (const lang of ['en', 'fr'] as const) {
    assert.equal(item[lang].followUps.length, 2);
    assert.ok(item[lang].question.length > 0);
  }
});
