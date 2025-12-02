/**
 * @summary
 * Validation schemas for Product service.
 *
 * @module services/product/productValidation
 */

import { z } from 'zod';
import { PRODUCT_LIMITS } from '@/constants/product';

export const productIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const quoteCreateSchema = z.object({
  userName: z.string().min(2),
  userEmail: z.string().email(),
  userPhone: z.string().optional(),
  message: z.string().max(PRODUCT_LIMITS.QUOTE_MESSAGE_MAX_LENGTH).optional(),
});

export const reviewCreateSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(PRODUCT_LIMITS.REVIEW_COMMENT_MAX_LENGTH).optional(),
});
