type FullScreenModalProps = {
  children: React.ReactNode;
  handleClose?: () => void;
};

const FullScreenModal = ({ children, handleClose }: FullScreenModalProps) => {
  return (
    <>
      <button
        className="absolute top-0 h-full w-full bg-black opacity-15"
        aria-label="취소"
        type="button"
        onClick={handleClose}
      />
      <section className="absolute bottom-0 z-30 h-1/2 w-full rounded-2xl bg-main p-4">{children}</section>
    </>
  );
};

export default FullScreenModal;
