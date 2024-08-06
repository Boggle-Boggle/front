type HeaderProps = {
  leftBtn?: {
    icon: JSX.Element;
    handleLeftBtnClick: () => void;
  };
  title?: {
    text: string;
    handleTitleClick?: () => void;
  };
  rightBtn?: {
    icon: JSX.Element;
    handleRightBtnClick: () => void;
  };
};

const Header = ({ leftBtn, title, rightBtn }: HeaderProps) => {
  return (
    <div className="relative flex h-16 items-center bg-slate-300">
      {leftBtn && (
        <button type="button" onClick={leftBtn.handleLeftBtnClick} className="absolute left-0 px-3">
          <span>{leftBtn.icon}</span>
        </button>
      )}
      {title && <h1 className="mx-auto text-lg font-semibold">{title.text}</h1>}
      {rightBtn && (
        <button
          type="button"
          onClick={rightBtn.handleRightBtnClick}
          className="absolute right-0 px-3"
        >
          <span>{rightBtn.icon}</span>
        </button>
      )}
    </div>
  );
};

export default Header;
