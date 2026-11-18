import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

import { getReleaseType } from './release-version.mjs';

const baseSha = process.env.BASE_SHA;
if (!baseSha || !/^[0-9a-f]{40}$/.test(baseSha)) {
  throw new Error('검증할 production 기준 커밋(BASE_SHA)이 없습니다.');
}

const previousPackage = JSON.parse(execFileSync('git', ['show', `${baseSha}:package.json`], { encoding: 'utf8' }));
const currentPackage = JSON.parse(readFileSync('package.json', 'utf8'));
const releaseType = getReleaseType(previousPackage.version, currentPackage.version);

if (!releaseType) {
  throw new Error(
    `서비스 버전 ${previousPackage.version} → ${currentPackage.version}은(는) 허용된 변경이 아닙니다. ` +
      '2.0.0 유지 또는 MAJOR/MINOR/PATCH 중 한 자리만 한 단계 올려 주세요.',
  );
}

console.log(`${previousPackage.version} → ${currentPackage.version} (${releaseType}) 확인 완료`);
