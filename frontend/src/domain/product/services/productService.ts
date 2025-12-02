import { publicClient, authenticatedClient } from '@/core/lib/api';
import type { Product, RelatedProduct, ProductReviewsResponse } from '../types';
import type { QuoteFormOutput, ReviewFormOutput } from '../types/forms';

/**
 * @service ProductService
 * @domain Product
 */
export const productService = {
  async getById(id: string): Promise<Product> {
    const { data } = await publicClient.get(`/product/${id}`);
    return data.data;
  },

  async getRelated(id: string): Promise<RelatedProduct[]> {
    const { data } = await publicClient.get(`/product/${id}/related`);
    return data.data;
  },

  async getReviews(id: string): Promise<ProductReviewsResponse> {
    const { data } = await publicClient.get(`/product/${id}/reviews`);
    return data.data;
  },

  async createQuote(id: string, data: QuoteFormOutput): Promise<void> {
    await publicClient.post(`/product/${id}/quote`, data);
  },

  async createReview(id: string, data: ReviewFormOutput): Promise<void> {
    await authenticatedClient.post(`/product/${id}/reviews`, data);
  },
};
