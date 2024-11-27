import { useParams, useNavigate } from 'react-router-dom';

const Record = () => {
  const { recordId } = useParams();
  const navigate = useNavigate();
  const handleGoToNote = () => {
    navigate(`/note/write`, { state: { recordId } });
  };

  return (
    <>
      <div className="h-80 w-full bg-slate-300">노트 조회</div>
      <div>
        <button onClick={handleGoToNote}>노트 작성하기</button>
      </div>
      <div>
        <button>노트 수정하기</button>
      </div>
      <div>
        <button>노트 삭제하기</button>
      </div>
    </>
  );
};

export default Record;
