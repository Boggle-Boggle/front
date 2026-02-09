import BookCover from 'components/BookCover';

import Title from '../shared/Title';

const AuthorOtherWorksSection = () => {
  return (
    <>
      <Title text="[작가]의 다른 작품" />

      <ul className="flex justify-center px-mobile">
        <li className="flex h-[11.625rem] w-full gap-5 rounded-[16px] border-[1px] border-[#EEEEEE] p-6 shadow-[0_0.375rem_0.9375rem_0_#A0B1C040]">
          <div className="shrink-0">
            <BookCover size="medium" url="https://contents.kyobobook.co.kr/sih/pdt/fit-in/198x396/9788901299402.jpg" />
          </div>
          <div className="min-w-0">
            <p className="pb-2 text-title3">책 제목을 입력해주세요</p>
            <p className="line-clamp-5 text-caption1 text-neutral-60">
              제8권. 미야비 소동도 겨우 일단락…됐다 했더니 이번엔 소우 삼촌의 옛 여친이 등장?! 나오가 어른이 될 때까지
              연애는 하지 않겠다던 소우 삼촌. 그런 그의 말에 뭔가를 느낀 오니세가 마침내! 달콤하고 큐트한 완결편, 놓치지
              마세요! 그리고 〈허니〉의 바탕이 된 단편도 수록했습니다♪
            </p>
          </div>
        </li>
      </ul>
    </>
  );
};

export default AuthorOtherWorksSection;
