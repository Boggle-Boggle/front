export type SearchMediaType = 'BOOK' | 'EBOOK';

export type BookSearchRequest = {
  query: string;
  type: SearchMediaType;
  page: number;
  size: number;
};

export type BookSearchItemResponse = {
  isbn13: string;
  itemId: number;
  title: string;
  author: string;
  publisher?: string;
  publishedDate?: string;
  coverUrl?: string;
  description?: string;
  category?: string;
  mediaType: SearchMediaType;
};

export type SearchBookItem = {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  pubDate: string;
  cover: string;
};
