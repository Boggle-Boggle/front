import CheckBox from 'components/CheckBox';

const EditLibraries = () => {
  const libraries = [1, 2, 3];
  return (
    <div className="border-t-[3px] border-main">
      <p className="relative flex h-14 items-center justify-between px-6 font-semibold">
        서재구분
        <button className="text-sm font-normal opacity-50" type="button" aria-label="독서기간 추가">
          편집
        </button>
      </p>
      <ul>
        {libraries.map(() => (
          <li className="relative flex h-14 w-full items-center justify-between border-t-[1px] border-main px-6">
            1회독
            <CheckBox />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditLibraries;
