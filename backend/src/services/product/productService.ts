/**
 * @summary
 * Business logic for Product features.
 * Handles product retrieval, visibility rules, reviews, and quotes.
 *
 * @module services/product/productService
 */

import { productStore } from '@/instances/product';
import { ServiceError } from '@/utils';
import { PRICE_VISIBILITY_RULES, REVIEW_STATUS } from '@/constants/product';
import {
  ProductDetailResponse,
  RelatedProductResponse,
  ReviewListResponse,
  QuoteCreateRequest,
  ReviewCreateRequest,
} from './productTypes';
import { productIdSchema, quoteCreateSchema, reviewCreateSchema } from './productValidation';

/**
 * Retrieves product details with visibility logic applied.
 */
export async function productGetById(
  params: unknown,
  userRole?: string
): Promise<ProductDetailResponse> {
  const validation = productIdSchema.safeParse(params);
  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;
  const product = productStore.getProduct(id);

  if (!product) {
    throw new ServiceError('NOT_FOUND', 'Product not found', 404);
  }

  // Calculate ratings
  const reviews = productStore
    .getReviewsByProduct(id)
    .filter((r) => r.status === REVIEW_STATUS.APPROVED);
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? parseFloat((reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1))
      : 0;

  // Apply Price Visibility Rules
  let displayPrice: number | null = null;
  let priceMessage: string | undefined = undefined;

  switch (product.priceVisibility) {
    case PRICE_VISIBILITY_RULES.PUBLIC:
      displayPrice = product.price;
      break;
    case PRICE_VISIBILITY_RULES.ON_REQUEST:
      displayPrice = null;
      priceMessage = 'Preço sob consulta';
      break;
    case PRICE_VISIBILITY_RULES.RESTRICTED:
      if (userRole) {
        displayPrice = product.price;
      } else {
        displayPrice = null;
        priceMessage = 'Faça login para ver o preço';
      }
      break;
  }

  return {
    ...product,
    price: displayPrice,
    priceMessage,
    rating: {
      average: averageRating,
      count: totalReviews,
    },
  };
}

/**
 * Retrieves related products based on category.
 */
export async function productGetRelated(params: unknown): Promise<RelatedProductResponse[]> {
  const validation = productIdSchema.safeParse(params);
  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;
  const product = productStore.getProduct(id);

  if (!product) return [];

  const related = productStore
    .getProductsByCategory(product.category)
    .filter((p) => p.id !== id)
    .slice(0, 6) // Limit to 6
    .map((p) => ({
      id: p.id,
      name: p.name,
      imageUrl: p.media[0]?.url || '',
    }));

  return related;
}

/**
 * Lists approved reviews for a product.
 */
export async function productReviewList(params: unknown): Promise<ReviewListResponse> {
  const validation = productIdSchema.safeParse(params);
  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;
  const reviews = productStore
    .getReviewsByProduct(id)
    .filter((r) => r.status === REVIEW_STATUS.APPROVED)
    .sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());

  const total = reviews.length;
  const average =
    total > 0 ? parseFloat((reviews.reduce((acc, r) => acc + r.rating, 0) / total).toFixed(1)) : 0;

  return {
    reviews: reviews.map(({ userId, status, ...rest }) => rest),
    total,
    average,
  };
}

/**
 * Submits a new review.
 */
export async function productReviewCreate(
  params: unknown,
  userId: number,
  userName: string,
  body: unknown
): Promise<{ message: string }> {
  const paramValidation = productIdSchema.safeParse(params);
  if (!paramValidation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, paramValidation.error.errors);
  }

  const bodyValidation = reviewCreateSchema.safeParse(body);
  if (!bodyValidation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Validation failed',
      400,
      bodyValidation.error.errors
    );
  }

  const { id } = paramValidation.data;
  const { rating, comment } = bodyValidation.data;

  if (!productStore.getProduct(id)) {
    throw new ServiceError('NOT_FOUND', 'Product not found', 404);
  }

  if (productStore.hasUserReviewed(id, userId)) {
    throw new ServiceError('CONFLICT', 'Você já avaliou este produto', 409);
  }

  productStore.addReview({
    id: 0, // Will be set by store
    productId: id,
    userId,
    userName,
    rating,
    comment,
    status: REVIEW_STATUS.PENDING,
    dateCreated: new Date().toISOString(),
  });

  return { message: 'Avaliação enviada com sucesso! Aguardando moderação.' };
}

/**
 * Submits a quote request.
 */
export async function productQuoteCreate(
  params: unknown,
  body: unknown
): Promise<{ message: string }> {
  const paramValidation = productIdSchema.safeParse(params);
  if (!paramValidation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, paramValidation.error.errors);
  }

  const bodyValidation = quoteCreateSchema.safeParse(body);
  if (!bodyValidation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Validation failed',
      400,
      bodyValidation.error.errors
    );
  }

  const { id } = paramValidation.data;
  const product = productStore.getProduct(id);

  if (!product) {
    throw new ServiceError('NOT_FOUND', 'Product not found', 404);
  }

  const quoteData = bodyValidation.data;

  productStore.addQuote({
    id: 0,
    productId: id,
    productName: product.name,
    ...quoteData,
    dateCreated: new Date().toISOString(),
  });

  return { message: 'Solicitação de orçamento enviada com sucesso!' };
}
