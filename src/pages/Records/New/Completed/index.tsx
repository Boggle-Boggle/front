import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from 'components/Button';
import Highlight from 'components/Highlight';

import completionImage from 'assets/img/add-record-completion.png';

const MSG_ADD_RECORD_COMPLETE_PREFIX = '나의 책이';
const MSG_ADD_RECORD_COMPLETE_SUFFIX = '추가 되었습니다!';
const MSG_ADD_RECORD_WRITE_NOTE = '바로 독서 노트 작성하기';
const MSG_ADD_RECORD_CONTINUE = '이어서 도서 등록하기';

type RecordNewCompletedLocationState = {
  recordId?: number;
};

const isRecordNewCompletedLocationState = (value: unknown): value is RecordNewCompletedLocationState => {
  if (typeof value !== 'object' || value === null) return false;

  if ('recordId' in value && value.recordId !== undefined && typeof value.recordId !== 'number') return false;

  return true;
};

const RecordNewCompleted = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const locationState = isRecordNewCompletedLocationState(location.state) ? location.state : null;
  const recordId = typeof locationState?.recordId === 'number' ? locationState.recordId : null;

  const handleWriteNote = () => {
    if (!recordId) return;

    navigate(`/records/${recordId}`);
  };
  const handleContinue = () => navigate('/search');

  return (
    <div className="flex h-full flex-col px-mobile pb-safe-bottom pt-safe-top">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <Highlight text={MSG_ADD_RECORD_COMPLETE_PREFIX} className="text-h1" />
        <Highlight text={MSG_ADD_RECORD_COMPLETE_SUFFIX} className="text-h1" />

        <img src={completionImage} alt="" className="mt-8 w-96" />
      </div>

      <div className="flex flex-col gap-2 pb-4">
        <Button onClick={handleWriteNote}>{MSG_ADD_RECORD_WRITE_NOTE}</Button>
        <Button onClick={handleContinue} variant="grey">
          {MSG_ADD_RECORD_CONTINUE}
        </Button>
      </div>
    </div>
  );
};

export default RecordNewCompleted;
