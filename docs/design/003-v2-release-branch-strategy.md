# v2 브랜치·배포·릴리즈 전략

## 브랜치 전략

### 웹 (`front`)

| 브랜치 | 역할 | 배포 |
| --- | --- | --- |
| `main` | v1 운영 유지 | 기존 v1 도메인 |
| `staging` | v2 개발 및 검증 | `https://stg.bbaegok.com` |
| `production` | v2 운영 | `https://bbaegok.com` |
| `hotfix/*` | v2 운영 긴급 수정 | 배포 없음 |

- 기능 브랜치는 `staging`에서 분기하고 `staging`으로 머지한다.
- `production`에는 직접 푸시하지 않는다. 정식 출시는 `staging → production`, 긴급 수정은 `hotfix/* → production` PR을 사용한다.
- `production` PR은 Production CI의 린트, 빌드, 버전 검사를 통과해야 한다.
- v1 지원이 끝날 때까지 `main`에는 v2를 머지하지 않는다.

#### 웹 핫픽스

1. `production`에서 `hotfix/{작업명}` 브랜치를 만든다.
2. 수정과 PATCH 버전 증가를 함께 반영한다.
3. `production`으로 PR을 보내 Production CI를 통과시킨다.
4. 머지와 운영 배포를 확인하고 GitHub Release를 발행한다.
5. 수정 코드를 `staging`에도 반영한 뒤 핫픽스 브랜치를 삭제한다.

### 앱 (`app`)

| 브랜치 | 역할 |
| --- | --- |
| `legacy/v1` | v1 유지 및 긴급 수정 |
| `main` | v2 개발 및 테스트 |
| `production` | 스토어 제출 및 배포 |

앱 기능 브랜치는 `main`에서 분기하고 `main`으로 머지한다. 출시는 `main → production` PR로 진행한다. 앱이 여는 URL은 브랜치가 아니라 `APP_ENV`로 결정한다.

- 개발 실행: `https://stg.bbaegok.com`
- EAS production 빌드: `https://bbaegok.com`

## 배포 전략

- `staging` 머지는 Netlify 스테이징 환경에 자동 배포한다.
- `production` 머지는 Netlify 운영 환경에 자동 배포한다.
- 웹 변경은 스테이징에서 검증한 뒤 운영 PR에 포함한다.
- 앱 코드나 설정이 바뀌면 새 앱 빌드를 만든다. 웹만 바뀌면 운영 웹을 배포하고 기존 앱에서 확인한다.
- `production`의 긴급 수정은 같은 내용을 `staging`에도 반영한다.

## 릴리즈 전략

1. `staging`에서 출시 범위와 다음 서비스 버전을 확정한다.
2. `staging → production` PR을 만들고 Production CI를 통과시킨다.
3. PR을 머지하고 Netlify 운영 배포를 확인한다.
4. 운영 커밋에 `v{버전}` 태그를 붙여 GitHub Release를 발행한다.
5. 앱 출시가 포함되면 같은 서비스 버전으로 앱을 빌드하고 심사에 제출한다.

GitHub Release 본문에는 주요 변경 사항, 웹 배포 커밋, 앱 출시 여부와 플랫폼별 빌드 번호를 기록한다.

## 버전 관리 전략

- 서비스 버전의 기준은 `front/package.json`의 `version`이다.
- 첫 v2 버전은 `2.0.0`으로 직접 확정해 출시한다.
- `production` 머지 1회마다 서비스 버전을 한 번 올린다.
- 버전은 `MAJOR.MINOR.PATCH` 형식을 사용한다.
  - `MAJOR`: 서비스의 큰 개편
  - `MINOR`: 사용자 기능 추가
  - `PATCH`: 오류 수정과 작은 개선
- 웹만 출시할 때도 서비스 버전을 올리되 앱을 다시 빌드하지는 않는다.
- 앱을 출시할 때는 해당 서비스 버전을 앱 버전으로 사용한다. 앱 버전은 웹 단독 출시 버전을 건너뛸 수 있다.
- 앱 빌드 번호는 플랫폼별 빌드를 구분하기 위해 EAS에서 자동 증가시킨다.
- 실제 출시 이력과 릴리즈 노트는 Markdown 파일이 아니라 GitHub Releases에서 관리한다.

첫 v2 출시가 안정화되면 `production` PR에 `major`, `minor`, `patch` 중 하나를 지정하고, 머지 전에 `package.json` 버전을 자동으로 올리도록 구성한다. 머지 후에는 같은 버전의 Git 태그와 GitHub Release를 자동 생성한다. 웹 배포는 기존 Netlify 브랜치 자동 배포를 유지한다.

## v1 종료 전략

- 기존 앱 사용자를 위해 v1 웹과 API를 종료일까지 유지한다.
- v1 웹에는 지원 종료일과 앱 업데이트 안내를 제공한다.
- 종료 후 마지막 v1 운영 커밋을 태그로 보존하고 기존 배포 연결을 해제한다.
- 이후 `main`의 역할은 v1 종료 시점에 다시 정한다.

## 출시 전 확인 사항

- [ ] v2 웹 기능과 테스트를 마치고 첫 출시 범위를 확정한다.
- [ ] 운영 환경의 API, 로그인, OAuth 콜백, 쿠키와 CORS를 확인한다.
- [ ] iOS TestFlight와 Android 실제 기기에서 운영 URL과 주요 기능을 확인한다.
- [ ] 브리지 계약과 브리지 미연결 시 동작을 확정한다.
- [ ] v1 종료일과 업데이트 안내 방식을 확정한다.
