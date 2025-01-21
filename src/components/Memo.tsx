type MemoProps = {
  children: React.ReactNode;
  handleClose: () => void;
};

const Memo = ({ children, handleClose }: MemoProps) => {
  return (
    <>
      <button className="fixed left-0 top-0 z-20 h-full w-full" aria-label="취소" type="button" onClick={handleClose} />
      {children}
    </>
  );
};

export default Memo;
