export interface SearchBookItem {
  isbn13: string;
  itemId: number;
  title: string;
  author: string;
  publisher: string;
  publishedDate: string;
  coverUrl: string | null;
  description: string | null;
  category: string;
  mediaType: 'BOOK' | 'EBOOK';
  isAdult: boolean;
}

export interface BookSearchListResponse {
  items: SearchBookItem[];
  hideAdultContent: boolean;
}

const MOCK_AUTHOR_BOOKS: SearchBookItem[] = [
  {
    isbn13: '9788937462788',
    itemId: 12345678,
    title: '데미안',
    author: '헤르만 헤세',
    publisher: '민음사',
    publishedDate: '2009-03-20',
    coverUrl: 'https://contents.kyobobook.co.kr/sih/pdt/fit-in/198x396/9788937462788.jpg',
    description:
      '한 소년이 자기 자신에게로 가는 길을 그린 소설. 헤르만 헤세의 자전적 소설이자 전 세계 독자들에게 깊은 울림을 준 평생의 고전입니다. 싱클레어가 어두운 세계에서 벗어나 데미안이라는 안내자를 만나 참된 자아를 깨달아가는 성장 이야기를 만나보세요.',
    category: '국내도서>소설/시/희곡>독일소설',
    mediaType: 'BOOK',
    isAdult: false,
  },
  {
    isbn13: '9788937460258',
    itemId: 23456789,
    title: '싯다르타',
    author: '헤르만 헤세',
    publisher: '민음사',
    publishedDate: '2002-11-20',
    coverUrl: 'https://contents.kyobobook.co.kr/sih/pdt/fit-in/198x396/9788937460258.jpg',
    description:
      '인간 싯다르타가 부와 명예, 쾌락을 내려놓고 고독한 구도자가 되어 참된 깨달음과 내면의 평화를 얻어가는 위대한 성찰의 소설입니다.',
    category: '국내도서>소설/시/희곡>독일소설',
    mediaType: 'BOOK',
    isAdult: false,
  },
  {
    isbn13: '9788937460111',
    itemId: 34567890,
    title: '수레바퀴 아래서',
    author: '헤르만 헤세',
    publisher: '민음사',
    publishedDate: '2001-09-10',
    coverUrl: 'https://contents.kyobobook.co.kr/sih/pdt/fit-in/198x396/9788937460111.jpg',
    description:
      '촉망받는 한 엘리트 소년 한스 기벤라트가 주변 어른들의 강요와 제도적 억압 속에서 생기와 자아를 잃고 서서히 파멸해 가는 비극적이고 아름다운 고전 소설입니다.',
    category: '국내도서>소설/시/희곡>독일소설',
    mediaType: 'BOOK',
    isAdult: false,
  },
];

export const getAuthorOtherWorks = async (authorName: string): Promise<BookSearchListResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        items: MOCK_AUTHOR_BOOKS,
        hideAdultContent: false,
      });
    }, 300);
  });
};
