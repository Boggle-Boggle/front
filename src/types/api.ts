export type Response<T> = {
  success: boolean;
  code: number;
  message: string;
  data: T | null;
};

export type PaginationResponse<T> = {
  pageNum: number;
  totalResultCnt: number;
  itemsPerPage: number;
  items: T;
};
