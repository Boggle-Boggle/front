import CheckBox from 'components/CheckBox';

const EditVisible = () => {
  return (
    <>
      <p className="flex h-14 items-center border-t-[3px] border-main px-6 font-semibold">책 숨기기</p>
      <div className="mx-6 mb-2 mt-1 flex h-14 items-center justify-between rounded-[10px] border border-main p-3 shadow-[1px_7px_10px_2px_rgba(0,0,0,0.05)]">
        <p>책장에서 책 숨기기</p>
        <CheckBox />
      </div>
    </>
  );
};

export default EditVisible;
