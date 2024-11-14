import bookmark from 'assets/bookmark.png';

// TODO : IMG
import img1 from 'assets/1.png';
import img2 from 'assets/2.png';
import img3 from 'assets/3.png';

import Title from './shared/Title';
import ButtonSet from './shared/ButtonSet';
import SubTitle from './shared/SubTitle';
import { useState } from 'react';

const REDING_STATUS = [
  {
    status: 'reading',
    title: '읽는 중인 책',
    subTitle: '책을 읽고 있는 중이신가요? \n 나중에 다 읽은 책으로 변경할 수 있어요',
    img: img1,
  },
  {
    status: 'pending',
    title: '다 읽은 책',
    subTitle: '대단해요! 책을 다 읽으셨나요? \n 등록 후 책에 대한 이야기를 남겨보세요',
    img: img2,
  },
  {
    status: 'completed',
    title: '읽어보고 싶은 책',
    subTitle: '읽고 싶은 책인가요? \n 잊어버리지 않게 미리 등록해두세요!',
    img: img3,
  },
] as const;

type StatusType = (typeof REDING_STATUS)[number]['status'];

type StatusProps = {
  onNext: () => void;
};

const Status = ({ onNext }: StatusProps) => {
  const [selected, setSelected] = useState<StatusType>('reading');

  const handleSelect = (status: StatusType) => {
    setSelected(status);
  };

  return (
    <>
      <Title message="이만큼 읽었어요!" />
      <SubTitle message="책을 어느정도 읽었는지 알려주세요" />

      <ul>
        {REDING_STATUS.map(({ status, title, subTitle, img }) => (
          <li
            className={`relative mb-6 flex h-24 w-full list-none flex-row items-center justify-between rounded-[10px] bg-white px-6 py-4 shadow-inherit ${status === selected && 'border-2 border-accent'}`}
            onClick={() => handleSelect(status)}
            key={status}
          >
            <p>
              <p className="pb-1 text-lg font-semibold">{title}</p>
              <p className="whitespace-pre-line text-xs opacity-60">{subTitle}</p>
            </p>
            <img src={img} className="right-0 h-14 w-14" />
            {status === selected && <img src={bookmark} className="absolute -top-1 left-4" />}
          </li>
        ))}
      </ul>
      <ButtonSet onNext={onNext} />
    </>
  );
};

export default Status;
