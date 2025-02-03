import bookNoResultImg from 'assets/img/book_no_result.png';

const NoResultItems = () => {
  return (
    <section className="flex h-3/4 flex-col items-center justify-center whitespace-pre-wrap px-16">
      <img src={bookNoResultImg} alt="" className="my-10 w-2/3" />
      <p className="pb-24 font-bold opacity-70">검색어와 일치하는 책이 없어요</p>
      {/* <p>걱정마세요</p>
      <p>검색 결과가 없는 책은 아래 버튼을 통해</p>
      <p>직접 등록이 가능합니다.</p>
      <Button handleClick={() => {}} className="mt-16 w-full bg-sub text-white">
        도서 직접 등록하기
      </Button> */}
    </section>
  );
};

export default NoResultItems;
