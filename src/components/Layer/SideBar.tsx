import useLayer from 'hooks/useLayer';

import LayerBackground from './LayerBackground';

type SideBarProps = {
  children: React.ReactNode;
};

const SideBar = ({ children }: SideBarProps) => {
  const { mounted, visible, handleAnimationEnd, handleClose } = useLayer();

  return (
    mounted && (
      <>
        <LayerBackground onClose={handleClose} />
        <div
          onAnimationEnd={handleAnimationEnd}
          style={{ boxShadow: '0px 2px 20px 0px #00000029' }}
          className={`absolute bottom-0 left-0 z-layer h-[calc(100%-3.375rem)] w-[calc(100%-3.75rem)] rounded-r-[20px] bg-neutral-0 pr-[3.75rem] pt-safe-top ${visible ? 'animate-slideLeft' : 'animate-slideRight'}`}
        >
          {children}
        </div>
      </>
    )
  );
};

export default SideBar;
