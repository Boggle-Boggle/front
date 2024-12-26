import { useReducer } from 'react';
import { CiCircleInfo, CiTimer, CiFlag1, CiCalendarDate, CiUnread, CiStar, CiShoppingTag } from 'react-icons/ci';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';

import RecordItem from './shared/RecordItem';

const RecordTab = () => {
  const [isToggledInfo, handleInfoToggle] = useReducer((prev) => !prev, false);
  const [isToggledExpand, handleExpandToggle] = useReducer((prev) => !prev, true);

  const libraries = ['완독서', '구병모 소설 모음집', '시은이한테 추천해줌'];

  return (
    <>
      <RecordItem
        icons={<CiCircleInfo style={{ width: '20px', height: '20px' }} />}
        title="도서정보"
        content={
          isToggledInfo ? (
            <button onClick={handleInfoToggle} aria-label="도서 정보 자세히 보기" type="button">
              <GoChevronUp style={{ width: '20px', height: '20px' }} />
            </button>
          ) : (
            <button onClick={handleInfoToggle} aria-label="도서 정보 간략히 보기" type="button">
              <GoChevronDown style={{ width: '20px', height: '20px' }} />
            </button>
          )
        }
      />
      {isToggledInfo && (
        <section className="border-b border-main p-4">
          <p className="text-xs font-bold">책정보</p>
          <span className="mt-2 flex">
            <p className="mr-2 text-xs font-semibold">저자</p>
            <p className="text-xs opacity-70">구병모</p>
          </span>
          <span className="mt-2 flex">
            <p className="mr-2 text-xs font-semibold">분야</p>
            <p className="text-xs opacity-70">한국소설</p>
          </span>
          <span className="mt-2 flex">
            <p className="mr-2 text-xs font-semibold">출판사</p>
            <p className="text-xs opacity-70">위즈덤하우스</p>
          </span>
          <span className="mt-2 flex">
            <p className="mr-2 text-xs font-semibold">발행일</p>
            <p className="text-xs opacity-70">2018.04.16</p>
          </span>
          <span className="mt-2 flex">
            <p className="mr-2 text-xs font-semibold">페이지</p>
            <p className="text-xs opacity-70">203 p</p>
          </span>
          <span className="mt-4 flex justify-between text-xs font-bold">
            책소개
            <button type="button" onClick={handleExpandToggle}>
              <p className="font-normal opacity-70">더보기</p>
            </button>
          </span>
          <p className={`mt-2 text-xs opacity-70 ${isToggledExpand}`}>
            한국 소설에 가장 강렬하게 새겨질 새로운 여성 서사를 탄생시킨 구병모 작가의 《파과》가 새 옷을 갈아입었다.
            40여 년간 날카롭고 냉혹하게 청부 살인을 업으로 삼아온 60대 여성 킬러 ‘조각(爪角)’. 몸도 기억도 예전 같지
            않게 삐걱거리기 시작하면서 이제는 퇴물 취급을 받는다...
          </p>
        </section>
      )}

      <RecordItem icons={<CiTimer style={{ width: '20px', height: '20px' }} />} title="진행도" content="다 읽은 책" />
      <RecordItem
        icons={<CiCalendarDate style={{ width: '20px', height: '20px' }} />}
        title="독서기간"
        content="2021.10.15 - 2031.11.15"
      />
      <RecordItem icons={<CiFlag1 style={{ width: '20px', height: '20px' }} />} title="회독" content="1회독" />
      <RecordItem
        icons={<CiStar style={{ width: '20px', height: '20px' }} />}
        title="내 평점"
        content="⭐️⭐️⭐️⭐️⭐️"
      />

      {libraries.map((library, idx) => {
        if (idx === 0)
          return (
            <RecordItem
              icons={<CiShoppingTag style={{ width: '20px', height: '20px' }} />}
              title="서재분류"
              content="완독책"
            />
          );
        return <RecordItem content={library} />;
      })}

      <RecordItem
        icons={<CiUnread style={{ width: '20px', height: '20px' }} />}
        title="책장에서 숨기기"
        content="책장에서 숨김"
      />

      <RecordItem />
    </>
  );
};

export default RecordTab;
