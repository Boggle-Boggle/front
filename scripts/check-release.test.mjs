import assert from 'node:assert/strict';
import test from 'node:test';

import { getReleaseType } from './release-version.mjs';

test('첫 v2 출시는 0.0.0에서 2.0.0으로 설정한다', () => {
  assert.equal(getReleaseType('0.0.0', '2.0.0'), 'initial');
  assert.equal(getReleaseType('0.0.0', '0.0.1'), null);
});

test('이후 출시는 한 단계 증가하고 하위 자리를 초기화한다', () => {
  assert.equal(getReleaseType('2.1.2', '2.1.3'), 'patch');
  assert.equal(getReleaseType('2.1.2', '2.2.0'), 'minor');
  assert.equal(getReleaseType('2.1.2', '3.0.0'), 'major');
});

test('동일 버전, 단계 건너뛰기, 잘못된 형식은 거부한다', () => {
  assert.equal(getReleaseType('2.1.2', '2.1.2'), null);
  assert.equal(getReleaseType('2.1.2', '2.1.4'), null);
  assert.equal(getReleaseType('2.1.2', '2.2.1'), null);
  assert.equal(getReleaseType('2.1.2', '02.2.0'), null);
});
