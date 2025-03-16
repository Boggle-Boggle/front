# 빼곡 - 빼곡하게 채우는 나만의 책장 📚✨


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

![그래픽이미지 최종](https://github.com/user-attachments/assets/bc754346-b0df-4aa2-b4cd-683463dded98)

### [구글 플레이스토어 바로가기](https://play.google.com/store/apps/details?id=bbaegok.app)
### [앱 스토어 바로가기](https://apps.apple.com/kr/app/%EB%B9%BC%EA%B3%A1-%EB%8F%85%EC%84%9C%EA%B8%B0%EB%A1%9D-%EC%95%B1/id6742702941)

<!--
<a href='https://play.google.com/store/apps/details?id=bbaegok.app&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' width='200'/></a> -->


책장 UI에 3D 효과를 적용해 아기자기하게 책을 정리하고 한눈에 확인할 수 있는 독서기록 앱입니다.

기존 독서 기록 앱과 달리, 사용자가 지정 서재를 만들어 분류하고, 회독을 기록할 수 있는 기능을 제공합니다.


<details>
  <summary><b>  테스트 계정</b></summary>
  
구글 로그인 클릭 후 아래 테스트 ID, PW으로 테스팅할 수 있습니다.
  
   - **테스트 ID** : bbaegokTest@gmail.com
   - **테스트 PW** : Qorhr12345


</details>



<br/>
<br/>





## 2️⃣ 주요 기능


### 📚 책장 조회 (3D 책장)

<table style="width: 80%;">
  <tr>
    <td><img src="https://github.com/user-attachments/assets/46f4df31-ed48-407a-94a5-8d6d59611c33" width="300"></td>
    <td width='800'>
      🔸 Three.js를 활용해 3D 책장을 구현했으며 책 페이지에 따라 두께가 결정됩니다.<br>
      🔸 책장은 다 읽은 책을 기준으로 채워지며, 기간을 선택해 조회 가능합니다.<br>
      🔸 책 페이지 수를 기반으로 색상을 랜덤 적용하는 알고리즘을 구현했습니다.<br>
      🔸 이전 책의 두께를 고려해 reduce를 활용한 누적 계산 방식으로 다음 책의 위치를 동적으로 결정하여, 자연스럽고 일관된 배치가 이루어지도록 구현했습니다.
    </td>
  </tr>
</table>

### 🔍 도서 검색

<table style="width: 80%;">
  <tr>
    <td><img src="https://github.com/user-attachments/assets/b8ab1b33-faed-4d3b-aa7b-e6e31bf6d009" width="300"></td>
    <td width='800'>
      🔸 관심있는 도서를 검색할 수 있으며 최근 검색어 기록을 제공합니다.<br>
      🔸 상세 조회 페이지에서 뒤로 가기를 눌러도 이전 스크롤 위치가 유지되어 편리한 탐색이 가능합니다.<br>
      🔸 검색 결과에 무한스크롤을 적용하여 성능을 개선했습니다.
    </td>
  </tr>
</table>

### 📝 도서 기록

<table style="width: 80%;">
  <tr>
    <td><img src="https://github.com/user-attachments/assets/0956712a-4481-4ba6-a51c-3eaf42543182" width="300"></td>
    <td width='800'>
      🔸 검색한 도서의 상세 정보를 조회하고 기록을 남길 수 있습니다.<br>
      🔸 IOS 스타일의 DatePicker를 React 웹 환경에서 직접 구현했습니다.<br>
      🔸 단계별 진행 로직을 적용하여 사용자의 입력 과정을 직관적으로 안내합니다.<br>
      🔸 이전 단계로 돌아가도 입력한 정보가 유지되어 편리하게 수정할 수 있습니다.<br>      
      🔸 0.5점 단위 별점 컴포넌트를 직접 구현하여 세밀한 평가가 가능합니다.
    </td>
  </tr>
</table>

### 📂 서재 조회

<table style="width: 80%;">
  <tr>
    <td><img src="https://github.com/user-attachments/assets/bc7b72e9-c9c6-4ce5-aaec-95def3e04056" width="300"></td>
    <td width='800'>
<!--       - 세션 스토리지에 서재 정보(선택한 서재, 정렬 기준)를 저장하여 새로고침 후에도 유지됩니다.<br> -->
      🔸 그리드형 / 리스트형 레이아웃을 지원하여 사용자 취향에 맞는 서재 조회 방법을 제공합니다.<br>
      🔸 검색어 입력에 Debounce를 적용하여 불필요한 API 요청을 줄이고, 서재에 있는 도서를 검색할 수 있습니다.
    </td>
  </tr>
</table>

### 📖 독서 기록 조회

<table style="width: 80%;">
  <tr>
    <td><img src="https://github.com/user-attachments/assets/c5f95387-d7ba-4013-9b81-7f6f2eda04ee" width="300"></td>
    <td width='800'>
      🔸 독서 기록의 상세 정보와 독서 노트를 확인할 수 있습니다.<br>
      🔸 토글 애니메이션을 적용하여 부드러운 UI 인터랙션을 제공합니다.
    </td>
  </tr>
</table>

### ✍️ 독서 노트 작성 및 수정

<table style="width: 80%;">
  <tr>
    <td><img src="https://github.com/user-attachments/assets/9491c723-7bb2-4d71-8fdd-1b679c32e424" width="300"></td>
    <td width='800'>
      🔸 독서 기록에 페이지별 독서 노트를 작성 및 수정할 수 있습니다.<br>
      🔸 태그 기능으로 독서 노트를 키워드로 저장할 수 있습니다.
    </td>
  </tr>
</table>

### 🔄 독서 기록 수정

<table style="width: 80%;">
  <tr>
    <td><img src="https://github.com/user-attachments/assets/65d4f8b3-638e-4347-9208-9de5b815fe0f" width="300"></td>
    <td width='800'>
      🔸 같은 책을 여러 번 읽은 경우를 고려하여, 회독 정보를 추가 및 수정할 수 있는 기능을 구현했습니다.<br>
      🔸 회독 추가와 수정을 상황에 맞게 처리하기 위해 API 요청 방식(등록/수정)을 명확히 분리하면서도, 사용자에게는 일관된 인터페이스로 자연스럽게 제공하도록 설계했습니다.
    </td>
  </tr>
</table>


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

- **[pnpm의 심볼릭링크된 의존성에서 타입추론 오류 해결하기](https://velog.io/@devkyoung2/pnpm%EC%9D%98-%EC%8B%AC%EB%B3%BC%EB%A6%AD%EB%A7%81%ED%81%AC-%EB%90%9C-%EC%9D%98%EC%A1%B4%EC%84%B1%EC%97%90%EC%84%9C-%ED%83%80%EC%9E%85%EC%B6%94%EB%A1%A0-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0)**
- **[SameSite 정책을 이해하고 로컬 환경에서 액세스 토큰 재발급 문제 해결하기](https://velog.io/@devkyoung2/SameSite-%EC%A0%95%EC%B1%85%EC%9D%84-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B3%A0-%EB%A1%9C%EC%BB%AC-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-%EC%95%A1%EC%84%B8%EC%8A%A4-%ED%86%A0%ED%81%B0-%EC%9E%AC%EB%B0%9C%EA%B8%89-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0)**
- **[구글 플레이 스토어에 앱 출시하기(feat. 빼곡)](https://velog.io/@devkyoung2/%EA%B5%AC%EA%B8%80-%ED%94%8C%EB%A0%88%EC%9D%B4-%EC%8A%A4%ED%86%A0%EC%96%B4%EC%97%90-%EC%95%B1-%EC%B6%9C%EC%8B%9C%ED%95%98%EA%B8%B0)**



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



[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FBoggle-Boggle%2Ffront&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)
