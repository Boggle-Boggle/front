import { api } from 'api';
import type { ApiSuccessResponse } from 'api.types';

import type { BookDetail } from 'types';

export const getBookDetail = async (isbn13: string) => {
  const response = await api.get<ApiSuccessResponse<BookDetail>>(`/v2/books/${isbn13}`);

  return response.data.data;
};

export const addInterestedBook = async (isbn13: string) => {
  await api.post('/v2/interested-books', { isbn13 });
};

export const deleteInterestedBookByIsbn13 = async (isbn13: string) => {
  await api.delete(`/v2/interested-books/${isbn13}`);
};

export type ReviewSortParamType = 'RECENT' | 'OLDEST' | 'POPULAR';

export interface ReviewAuthor {
  userId: number;
  nickname: string;
}

export interface BookReviewItem {
  id: number;
  content: string;
  likeCount: number;
  author: ReviewAuthor;
  createdAt: string;
  updatedAt: string;
  isSpoiler: boolean;
  isLiked: boolean;
}

export interface ReviewListResponse {
  canWriteReview: boolean;
  totalReviewCount: number;
  myReview: BookReviewItem | null;
  reviews: BookReviewItem[];
}

export interface GetBookReviewsRequest {
  isbn13: string;
  page?: number;
  size?: number;
  sort?: ReviewSortParamType;
}

export const getBookReviews = async (params: GetBookReviewsRequest) => {
  const { isbn13, ...queryParams } = params;
  const response = await api.get<ApiSuccessResponse<ReviewListResponse>>(`/v2/books/${isbn13}/reviews`, {
    params: queryParams,
  });

  return response.data.data;
};
