import Button from 'components/ui/Button';
import visible from 'assets/visible.png';

import Title from './shared/Title';
import SubTitle from './shared/SubTitle';

const Complete = () => {
  return (
    <>
      <Title message="책이 등록되었어요!" />
      <SubTitle message="기록을 통해 독서노트도 작성해보세요" />
      <img src={visible} className="mx-auto"></img>
      <Button handleClick={() => {}}>독서 노트 작성하기</Button>
      <Button handleClick={() => {}} className="mt-4 w-full bg-main text-black shadow-sm">
        이어서 도서 등록하기
      </Button>
    </>
  );
};

export default Complete;
