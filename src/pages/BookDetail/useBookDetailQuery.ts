import { useQuery } from '@tanstack/react-query';

interface BookDetail {
  title: string;
  isbn: string;
  author: string;
  pubDate: string;
  cover: string;
  publisher: string;
  genre: string;
  plot: string;
  link: string;
}

const MOCK_BOOK_DETAIL: BookDetail = {
  title: '데미안',
  isbn: '9788937460449',
  author: '헤르만 헤세',
  pubDate: '2013-01-01',
  cover: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791139719284.jpg',
  publisher: '민음사',
  genre: '소설',
  plot: '한 소년의 자아 탐색과 성장 과정을 그린 작품으로, 내면의 갈등과 자유를 향한 의지를 보여준다.한 소년의 자아 탐색과 성장 과정을 그린 작품으로, 내면의 갈등과 자유를 향한 의지를 보여준다.한 소년의 자아 탐색과 성장 과정을 그린 작품으로, 내면의 갈등과 자유를 향한 의지를 보여준다.한 소년의 자아 탐색과 성장 과정을 그린 작품으로, 내면의 갈등과 자유를 향한 의지를 보여준다.한 소년의 자아 탐색과 성장 과정을 그린 작품으로, 내면의 갈등과 자유를 향한 의지를 보여준다.한 소년의 자아 탐색과 성장 과정을 그린 작품으로, 내면의 갈등과 자유를 향한 의지를 보여준다.한 소년의 자아 탐색과 성장 과정을 그린 작품으로, 내면의 갈등과 자유를 향한 의지를 보여준다.한 소년의 자아 탐색과 성장 과정을 그린 작품으로, 내면의 갈등과 자유를 향한 의지를 보여준다.한 소년의 자아 탐색과 성장 과정을 그린 작품으로, 내면의 갈등과 자유를 향한 의지를 보여준다.한 소년의 자아 탐색과 성장 과정을 그린 작품으로, 내면의 갈등과 자유를 향한 의지를 보여준다.한 소년의 자아 탐색과 성장 과정을 그린 작품으로, 내면의 갈등과 자유를 향한 의지를 보여준다.한 소년의 자아 탐색과 성장 과정을 그린 작품으로, 내면의 갈등과 자유를 향한 의지를 보여준다.한 소년의 자아 탐색과 성장 과정을 그린 작품으로, 내면의 갈등과 자유를 향한 의지를 보여준다.한 소년의 자아 탐색과 성장 과정을 그린 작품으로, 내면의 갈등과 자유를 향한 의지를 보여준다.한 소년의 자아 탐색과 성장 과정을 그린 작품으로, 내면의 갈등과 자유를 향한 의지를 보여준다.한 소년의 자아 탐색과 성장 과정을 그린 작품으로, 내면의 갈등과 자유를 향한 의지를 보여준다.한 소년의 자아 탐색과 성장 과정을 그린 작품으로, 내면의 갈등과 자유를 향한 의지를 보여준다.한 소년의 자아 탐색과 성장 과정을 그린 작품으로, 내면의 갈등과 자유를 향한 의지를 보여준다.한 소년의 자아 탐색과 성장 과정을 그린 작품으로, 내면의 갈등과 자유를 향한 의지를 보여준다.한 소년의 자아 탐색과 성장 과정을 그린 작품으로, 내면의 갈등과 자유를 향한 의지를 보여준다.한 소년의 자아 탐색과 성장 과정을 그린 작품으로, 내면의 갈등과 자유를 향한 의지를 보여준다.',
  link: 'www.aladin.co.kr/shop/wproduct.aspx?ItemId=5765',
};

const getBookDetailMock = async (): Promise<BookDetail> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_BOOK_DETAIL);
    }, 200);
  });
};

export const useBookDetailQuery = (bookId: string) => {
  return useQuery({
    queryKey: ['books', 'detail', bookId],
    queryFn: getBookDetailMock,
    enabled: Boolean(bookId),
  });
};
