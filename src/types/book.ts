export type Book = {
  title: string;
  isbn: string;
  author: string;
  pubDate: string;
  cover: string;
  publisher: string;
};

export type BookDetail = Book & {
  genre: string;
  plot: string;
};
