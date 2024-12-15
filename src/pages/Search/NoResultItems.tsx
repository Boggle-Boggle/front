import Button from 'components/ui/Button';

const NoResultItems = () => {
  return (
    <section className="height-content flex flex-col items-center justify-center whitespace-pre-wrap px-16 pb-36 font-bold leading-8 text-sub">
      <p>책을 찾을 수가 없나요 ?</p>
      <img src={`${import.meta.env.VITE_IMG_BASE_URL || ''}/assets/reading1.png`} alt="" className="my-14" />
      <p>걱정마세요</p>
      <p>검색 결과가 없는 책은 아래 버튼을 통해</p>
      <p>직접 등록이 가능합니다.</p>
      <Button handleClick={() => {}} className="mt-16 w-full bg-sub text-white">
        도서 직접 등록하기
      </Button>
    </section>
  );
};

export default NoResultItems;
