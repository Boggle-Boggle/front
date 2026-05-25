## 목적

이 문서는 빼곡 프론트엔드 프로젝트에서 에이전트가 바로 알아야 하는 최소 작업 규칙과 컨벤션 문서의 진입점을 정의한다.

개발 컨벤션의 상세 내용은 `docs/convention` 아래 문서를 기준으로 관리한다.

## Language

- 모든 응답은 반드시 한국어로 작성한다.
- 모든 Plan은 반드시 한국어로 작성한다.

## 개발 컨벤션 문서

프로젝트 개발 컨벤션은 아래 문서를 우선 참조한다.

- `docs/convention/README.md`
- `docs/convention/project-structure.md`
- `docs/convention/components.md`
- `docs/convention/state-management.md`
- `docs/convention/code-style.md`

## API 명세

이 디렉터리에서 사용하는 API 명세서는 아래 staging OpenAPI spec을 기준으로 참조한다.

- `https://staging.api.bbaegok.store/v3/api-docs`

## 프로젝트 특이사항

- `legacy` 디렉터리는 보호된 영역이다.
- `src/legacy/**`, `legacy/**` 아래 파일은 수정하지 않는다.
- legacy 보호의 상세 규칙은 `docs/convention/project-structure.md`의 `Legacy Protection` 섹션을 따른다.
