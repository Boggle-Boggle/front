import { useNavigate } from 'react-router-dom';

import { Button } from 'components/Button';
import { IconArrowLeft, IconHome } from 'components/icons';

const MSG_NOT_FOUND_CODE = '404';
const MSG_NOT_FOUND_TITLE = '페이지를 찾을 수 없어요';
const MSG_NOT_FOUND_DESCRIPTION = '주소가 바뀌었거나, 더 이상 사용할 수 없는 페이지예요.';
const MSG_NOT_FOUND_HOME = '홈으로 가기';
const MSG_NOT_FOUND_BACK = '이전으로';

const NotFound = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/', { replace: true });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <main className="flex h-dvh w-full flex-col items-center justify-center bg-neutral-0 px-6 py-10">
      <section className="flex w-full max-w-[22rem] flex-col items-center text-center">
        <div className="relative mb-8 flex h-[9rem] w-[8rem] items-center justify-center">
          <div className="absolute bottom-3 h-[6.75rem] w-[5rem] rotate-[-8deg] rounded-lg border border-neutral-20 bg-primary-light shadow-[0_0.75rem_1.5rem_rgba(0,0,0,0.08)]" />
          <div className="absolute bottom-0 h-[7.75rem] w-[5.75rem] rotate-[7deg] rounded-lg border border-primary bg-neutral-0 shadow-[0_1rem_2rem_rgba(0,0,0,0.1)]">
            <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-primary" />
            <div className="mx-auto mt-3 h-1 w-9 rounded-full bg-neutral-20" />
            <div className="mx-auto mt-2 h-1 w-11 rounded-full bg-neutral-20" />
          </div>
          <span className="text-heading2 relative mt-8 font-bold text-primary">{MSG_NOT_FOUND_CODE}</span>
        </div>

        <h1 className="text-heading2 font-bold text-neutral-100">{MSG_NOT_FOUND_TITLE}</h1>
        <p className="mt-3 text-body2 text-neutral-60">{MSG_NOT_FOUND_DESCRIPTION}</p>

        <div className="mt-8 flex w-full flex-col gap-3">
          <Button onClick={handleHomeClick} icon={IconHome}>
            {MSG_NOT_FOUND_HOME}
          </Button>
          <Button onClick={handleBackClick} variant="grey" icon={IconArrowLeft}>
            {MSG_NOT_FOUND_BACK}
          </Button>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
