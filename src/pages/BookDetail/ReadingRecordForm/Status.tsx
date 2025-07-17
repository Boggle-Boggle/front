import { StatusType } from 'types/record';

import bookmark from 'assets/library/status_bookmark.png';

import ButtonSet from './shared/ButtonSet';
import SubTitle from './shared/SubTitle';
import Title from './shared/Title';

type StatusProps = {
  selected: StatusType;
  setSelected: React.Dispatch<React.SetStateAction<StatusType>>;
  onNext: () => void;
};

const Status = ({ selected, setSelected, onNext }: StatusProps) => {
  const handleSelect = (status: StatusType) => {
    setSelected(status);
  };

  const REDING_STATUS = [
    {
      status: 'completed',
      title: '다 읽은 책',
      subTitle: '대단해요! 책을 다 읽으셨나요? \n 등록 후 책에 대한 이야기를 남겨보세요',
      img: <div>이미지</div>,
    },
    {
      status: 'reading',
      title: '읽는 중인 책',
      subTitle: '책을 읽고 있는 중이신가요? \n 나중에 다 읽은 책으로 변경할 수 있어요',
      img: <div>이미지</div>,
    },
    {
      status: 'pending',
      title: '읽어보고 싶은 책',
      subTitle: '읽고 싶은 책인가요? \n 잊어버리지 않게 미리 등록해두세요!',
      img: <div>이미지</div>,
    },
  ] as const;

  return (
    <>
      <Title message="이만큼 읽었어요!" />
      <SubTitle message="책을 어느정도 읽었는지 알려주세요" />

      <ul>
        {REDING_STATUS.map(({ status, title, subTitle, img }) => (
          <li key={status}>
            <button
              type="button"
              className={`relative mb-6 flex h-24 w-full flex-row items-center justify-between rounded-[10px] border-2 bg-white px-6 py-4 shadow-inherit ${status === selected ? 'border-accent' : 'border-transparent'}`}
              onClick={() => handleSelect(status)}
            >
              <div className="text-start">
                <p className="pb-1 text-lg font-semibold">{title}</p>
                <p className="whitespace-pre-line text-xs opacity-60">{subTitle}</p>
              </div>
              {img}
              {status === selected && <img src={bookmark} className="absolute -top-1 left-4" alt="선택됨" />}
            </button>
          </li>
        ))}
      </ul>
      <ButtonSet onNext={onNext} />
    </>
  );
};

export default Status;
