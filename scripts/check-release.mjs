import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

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
    `서비스 버전 ${previousPackage.version} → ${currentPackage.version}은(는) 허용된 증가가 아닙니다. ` +
      '첫 출시는 2.0.0, 이후 출시는 MAJOR/MINOR/PATCH 중 한 자리만 한 단계 올려 주세요.',
  );
}

const releaseNotePath = join('docs', 'releases', `${currentPackage.version}.md`);
if (!existsSync(releaseNotePath)) {
  throw new Error(`릴리스 노트가 없습니다: ${releaseNotePath}`);
}

const releaseNote = readFileSync(releaseNotePath, 'utf8');
if (!releaseNote.startsWith(`# 서비스 ${currentPackage.version} 출시 기록\n`)) {
  throw new Error(`릴리스 노트 제목에 서비스 버전 ${currentPackage.version}을(를) 적어 주세요: ${releaseNotePath}`);
}

console.log(`${previousPackage.version} → ${currentPackage.version} (${releaseType}), ${releaseNotePath} 확인 완료`);
