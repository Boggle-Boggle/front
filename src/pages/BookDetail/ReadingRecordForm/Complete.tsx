import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'components/ui/Button';

import { addRecord } from 'services/record';

import { RecordType } from 'types/record';

import visible from 'assets/visible.png';

import SubTitle from './shared/SubTitle';
import Title from './shared/Title';

type CompleteType = {
  record: RecordType;
};

const Complete = ({ record }: CompleteType) => {
  const [recordId, setRecordId] = useState<number | null>(null);
  const navigate = useNavigate();

  const creaateRecord = async () => {
    const id = await addRecord(record);
    setRecordId(id);
  };

  useEffect(() => {
    creaateRecord();
  }, []);

  const handleGoRecord = () => {
    if (recordId) {
      navigate(`/record/${recordId}`);
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
