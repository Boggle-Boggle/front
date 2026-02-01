import { useNavigate } from 'react-router-dom';

import { IconArrowLeft } from 'components/icons';

import IconButton from './refactor/Button/IconButton';

type HeaderProps = {
  prev?: () => void;
  title?: React.ReactNode;
  rightBtn?: React.ReactNode;
  withSpacer?: boolean;
  transparent?: boolean;
};

const Header = ({ prev, title, rightBtn, withSpacer = true, transparent = false }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`fixed z-header grid h-header w-full max-w-mobile grid-cols-[1fr_auto_1fr] items-center pt-safe-top ${
          transparent ? 'bg-transparent' : 'bg-neutral-0'
        }`}
      >
        <div className="flex justify-start">
          <IconButton onClick={prev || (() => navigate(-1))} label="뒤로가기">
            <IconArrowLeft className="size-icon-md" />
          </IconButton>
        </div>

        <h1 className="truncate px-2 text-center text-body1">{title}</h1>

        <div className="flex justify-end">{rightBtn}</div>
      </div>

      {withSpacer && <div className="mt-safe-top h-header" />}
    </>
  );
};

export default Header;
