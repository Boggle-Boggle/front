import api from '.';

export interface PromotionSummary {
  totalBookCount: number;
  excludePendingCount: number;
  totalNoteCount: number;
  averageRating: number;
}
export interface PromotionReadingStyle {
  styleType: 'STEADY' | 'INTENSIVE' | 'LEISURELY' | 'WAVE' | 'STARTER' | 'FINISHER';
  styleName: string;
}

export interface PromotionBestBook {
  rank: number;
  imageUrl: string;
  title: string;
  publisher: string;
  readCount: number;
  noteCount: number;
  rating: number;
}

export interface PromotionRanking {
  bestBooks: PromotionBestBook[];
}

export interface Promotion2025Response {
  summary: PromotionSummary;
  ranking: PromotionRanking;
  readingStyle: PromotionReadingStyle;
}

const getPromotion2025 = async (): Promise<Promotion2025Response> => {
  const response = await api.get('/promo/christmas');
  return response.data.data as Promotion2025Response;



};

export default getPromotion2025;
