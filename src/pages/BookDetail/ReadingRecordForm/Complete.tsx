import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Button from 'components/ui/Button';
import visible from 'assets/visible.png';
import { RecordType } from 'types/record';
import { addRecord } from 'services/record';

import Title from './shared/Title';
import SubTitle from './shared/SubTitle';

type CompleteType = {
  record: RecordType;
};

const Complete = ({ record }: CompleteType) => {
  const [recordId, setRecordId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const creaateRecord = async () => {
      const id = await addRecord(record);
      setRecordId(id);
    };

    creaateRecord();
  }, [record]);

  const handleGoRecord = () => {
    if (recordId) {
      navigate('/');
    }
  };

  return (
    <>
      <Title message="책이 등록되었어요!" />
      <SubTitle message="기록을 통해 독서노트도 작성해보세요" />
      <img src={visible} className="mx-auto"></img>
      <Button handleClick={handleGoRecord}>독서 노트 작성하기</Button>
      <Button handleClick={() => navigate('/search')} className="mt-4 w-full bg-main text-black shadow-sm">
        이어서 도서 등록하기
      </Button>
    </>
  );
};

export default Complete;
