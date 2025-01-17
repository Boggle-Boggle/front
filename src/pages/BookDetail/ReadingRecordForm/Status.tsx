import { REDING_STATUS, StatusType } from 'types/record';

import bookmark from 'assets/bookmark.png';

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
              <img src={img} className="right-0 h-14 w-14" alt="" />
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
