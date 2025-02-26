# 빼곡 - 빼곡하게 채우는 나만의 책장


### 목차
1️⃣ [서비스 소개](https://github.com/Boggle-Boggle/front/tree/dev?tab=readme-ov-file#1%EF%B8%8F%E2%83%A3-%EC%84%9C%EB%B9%84%EC%8A%A4-%EC%86%8C%EA%B0%9C) <br/>
2️⃣ [주요 기능](https://github.com/Boggle-Boggle/front/tree/dev?tab=readme-ov-file#2%EF%B8%8F%E2%83%A3-%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5) <br/>
3️⃣ [기술 스택](https://github.com/Boggle-Boggle/front/tree/dev?tab=readme-ov-file#3%EF%B8%8F%E2%83%A3-%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D) <br/>
4️⃣ [트러블 슈팅 및 기술포스팅](https://github.com/Boggle-Boggle/front/tree/dev?tab=readme-ov-file#4%EF%B8%8F%E2%83%A3-%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85-%EB%B0%8F-%EA%B8%B0%EC%88%A0%ED%8F%AC%EC%8A%A4%ED%8C%85) <br/>
5️⃣ [디렉터리 구조](https://github.com/Boggle-Boggle/front/tree/dev?tab=readme-ov-file#5%EF%B8%8F%E2%83%A3-%EB%94%94%EB%A0%89%ED%84%B0%EB%A6%AC-%EA%B5%AC%EC%A1%B0) <br/>
6️⃣ [컨벤션 및 브랜치 전략](https://github.com/Boggle-Boggle/front/tree/dev?tab=readme-ov-file#6%EF%B8%8F%E2%83%A3-%EC%BB%A8%EB%B2%A4%EC%85%98-%EB%B0%8F-%EB%B8%8C%EB%9E%9C%EC%B9%98-%EC%A0%84%EB%9E%B5)

<br/>
<br/>

## 1️⃣ 서비스 소개


<p align="center">
  <img src="https://github.com/user-attachments/assets/8a7fc7b6-6e12-4c5f-9aeb-946a5cbd90b8"  width='50%'>
</p>

### [구글 플레이스토어 바로가기](https://play.google.com/store/apps/details?id=bbaegok.app)



책장 UI에 3D 효과를 적용해 아기자기하게 책을 정리하고 한눈에 확인할 수 있는 독서기록 앱입니다.

기존 독서 기록 앱과 달리, 사용자가 지정 서재를 만들어 분류하고, 회독을 기록할 수 있는 기능을 제공합니다.


<details>
  <summary><b>테스트 계정</b></summary>
  
구글 로그인 클릭 후 아래 테스트 ID, PW으로 테스팅할 수 있습니다.
  
   - **테스트 ID** : bbaegokTest@gmail.com
   - **테스트 PW** : Qorhr12345


</details>



<br/>
<br/>



## 2️⃣ 주요 기능







<br/>
<br/>



## 3️⃣ 기술 스택

<p align="center">
  <img src="https://github.com/user-attachments/assets/fc549fa5-cc6f-413f-bad5-24b030b6f5c3" width='100%'>
</p>

<details>
  <summary><b>기술 별 사용 이유</b></summary>

- `React(v18.3.1)` : 서비스 기본 UI를 작성하기 위해 숙련도가 가장 높은 리액트 사용
- `React Native` : React 기반이라 러닝커브가 가장 낮고, AND, IOS 둘 다 대응이 가능해서 사용
- `TypeScript(v5.2.2)` : 정적 타입시스템을 도입해 코드 안정성을 높이고, API 요청 시 예상치 못한 값을 포함해 요청하는 것을 방지하기 위해 사용
- `TanStack Query(v5.51.14)` : 서버 상태를 관리하기 위해 캐싱이 편리하고 데이터의 최신 상태를 직관적으로 확인할 수 있어 사용
- `Zustand(v4.5.4)` : 간결하게 전역상태관리를 구축할 수 있기 때문에 사용
- `Three.js(v0.170.0)` : WebGL을 직접 다루는 것보다 효율적으로 3D책장을 구현하기 위해 사용
- `Tailwind CSS(v3.4.7)` : 배워보고 싶어서 사용
- `StoryBook(v0.170.0)` : 디자인 시스템을 구축하고, 디자이너가 컴포넌트를 쉽게 확인할 수 있도록 사용
- `Figma` : UI/UX 디자인 협업을 위해 사용
- `Vite (v5.3.4)` : 리액트 공식문서에서 추천, 빠른 개발서버 가동을 위해 사용
- `PNPM` : 빠른 패키지 설치 및 중앙저장소 관리 시스템으로 용량을 많이 차지하지 않아 사용
- `Git` : 버전관리를 위해 사용

</details>



<br/>
<br/>


##  4️⃣ 트러블 슈팅 및 기술포스팅

- **[pnpm의 심볼릭링크된 의존성에서 타입추론 오류 해결하기](https://www.notion.so/pnpm-12971e97a783430a8b5aa09ffc7ba3aa?pvs=21)**
- **[SameSite 정책을 이해하고 로컬 환경에서 액세스 토큰 재발급 문제 해결하기](https://www.notion.so/SameSite-14c2522077a080159261ef67f98fa65d?pvs=21)**



<br/>
<br/>




## 5️⃣ 디렉터리 구조

```diff
📦src
 ┣ 📂assets
 ┃ ┣ 📂icons
 ┃ ┣ 📂img
 ┃ ┣ 📂library
 ┃ ┣ 📂logo
 ┃ ┗ 📂stars
 ┣ 📂components
 ┣ 📂hooks
 ┣ 📂pages
 ┃ ┣ 📂Auth
 ┃ ┣ 📂BookDetail
 ┃ ┃ ┣ 📂ReadingRecordForm
 ┃ ┃ ┃ ┗ 📂shared
 ┃ ┣ 📂Edit
 ┃ ┣ 📂Home
 ┃ ┣ 📂Library
 ┃ ┃ ┗ 📂shared
 ┃ ┣ 📂Login
 ┃ ┣ 📂MyPage
 ┃ ┃ ┗ 📂shared
 ┃ ┣ 📂Note
 ┃ ┣ 📂Record
 ┃ ┃ ┗ 📂shared
 ┃ ┣ 📂Search
 ┃ ┗ 📂SignUp
 ┣ 📂services
 ┣ 📂stores
 ┣ 📂types
 ┣ 📂utils
 ┣ 📜App.tsx
 ┣ 📜main.css
 ┣ 📜main.tsx
 ┣ 📜.env.d.ts
 ┗ 📜vite-env.d.ts
```

<details>
  <summary><b>디렉터리 구조 설명</b></summary>

- **assets**: 정적 리소스를 관리하는 폴더
    - **icons**: SVG 및 기타 아이콘 파일
    - **img**: 일반적인 이미지 파일
    - **library**: 3D 책장 glb 파일
    - **logo**: 로그인 등의 서비스 로고
    - **stars**: 별점 컴포넌트에 필요한 이미지 파일
- **components**: 공용 컴포넌트
- **hooks**: 커스텀 훅을 관리하는 폴더
- **pages**: 페이지 컴포넌트 폴더
    - **Auth**: 인증 및 리디렉션 페이지
    - **BookDetail**: 책 세부 정보 페이지
        - **ReadingRecordForm**: 독서 기록 추가 프로세스
            - **shared**: 독서 기록 추가 로직에서 공용으로 사용되는 컴포넌트
    - **Edit**: 독서 기록 수정 페이지
    - **Home**: 메인 홈 화면 구성 페이지
    - **Library**: 서재 화면 페이지
        - **shared**: 서재 화면에서 공용으로 사용되는 컴포넌트
    - **Login**: 로그인 페이지
    - **MyPage**: 마이 페이지
        - **shared**: 마이페이지에서 공용으로 사용되는 컴포넌트
    - **Note**: 노트 작성 페이지
    - **Record**: 독서 기록 페이지
        - **shared**: 독서 기록 페이지에서 공용으로 사용되는  컴포넌트
    - **Search**: 도서 검색 페이지
    - **SignUp**: 회원 가입 페이지
- **services**: API 요청 함수를 관리하는 폴더
- **stores**: 전역 상태를 관리하는 폴더
- **types**: 타입 정의하는 폴더
- **utils**: 유틸리티 함수를 관리하는 폴더

</details>




<br/>
<br/>




## 6️⃣ 컨벤션 및 브랜치 전략

- [빼곡 프론트엔드 컨벤션](https://kyoung2.notion.site/1a62522077a080cbbce4dfaa0be6f75b)




<br/>
<br/>


