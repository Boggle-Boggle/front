import { getRouteErrorMessage } from 'policy/error';
import { useNavigate, useRouteError } from 'react-router-dom';

import { Button } from 'components/Button';
import { IconArrowLeft, IconHome } from 'components/icons';

const MSG_ROUTE_ERROR_HOME = '홈으로 가기';
const MSG_ROUTE_ERROR_BACK = '이전으로';

const RouteErrorFallback = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  const errorMessage = getRouteErrorMessage(error);

  const handleHomeClick = () => navigate('/', { replace: true });

  const handleBackClick = () => navigate(-1);

  return (
    // TODO 임의의 not found 화면
    <main className="flex h-dvh w-full flex-col items-center justify-center px-6 py-10">
      <section className="flex w-full max-w-[22rem] flex-col items-center text-center">
        <div className="relative mb-8 flex h-[9rem] w-[8rem] items-center justify-center">
          <div className="absolute bottom-3 h-[6.75rem] w-[5rem] rotate-[-8deg] rounded-lg border border-neutral-20 bg-primary-light shadow-[0_0.75rem_1.5rem_rgba(0,0,0,0.08)]" />
          <div className="absolute bottom-0 h-[7.75rem] w-[5.75rem] rotate-[7deg] rounded-lg border border-primary bg-neutral-0 shadow-[0_1rem_2rem_rgba(0,0,0,0.1)]">
            <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-primary" />
            <div className="mx-auto mt-3 h-1 w-9 rounded-full bg-neutral-20" />
            <div className="mx-auto mt-2 h-1 w-11 rounded-full bg-neutral-20" />
          </div>
          <span className="text-heading2 relative mt-8 font-bold text-primary">!</span>
        </div>

        <h1 className="text-heading2 font-bold text-neutral-100">{errorMessage.title}</h1>
        <p className="mt-3 text-body2 text-neutral-60">{errorMessage.description}</p>

        <div className="mt-8 flex w-full flex-col gap-3">
          <Button onClick={handleHomeClick} icon={IconHome}>
            {MSG_ROUTE_ERROR_HOME}
          </Button>
          <Button onClick={handleBackClick} variant="grey" icon={IconArrowLeft}>
            {MSG_ROUTE_ERROR_BACK}
          </Button>
        </div>
      </section>
    </main>
  );
};

export default RouteErrorFallback;
