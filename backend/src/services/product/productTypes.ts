/**
 * @summary
 * Type definitions for Product entity and related structures.
 *
 * @module services/product/productTypes
 */

import { PriceVisibilityRule, ReviewStatus } from '@/constants/product';

export interface ProductMedia {
  url: string;
  alt: string;
  type: 'image' | 'video';
}

export interface ProductVariationOption {
  label: string;
  sku?: string;
  price?: number;
  media?: ProductMedia[];
}

export interface ProductVariation {
  name: string;
  options: ProductVariationOption[];
}

export interface ProductSpecs {
  height?: number;
  width?: number;
  depth?: number;
  weight?: number;
  materials?: string[];
}

export interface ProductCTA {
  label: string;
  actionType: 'WHATSAPP' | 'QUOTE_FORM' | 'EXTERNAL_LINK';
  actionValue: string;
}

export interface ProductDownload {
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: string;
  requiredRole?: string;
}

export interface ProductEntity {
  id: number;
  name: string;
  sku: string;
  description: string;
  price: number;
  priceVisibility: PriceVisibilityRule;
  category: string;
  media: ProductMedia[];
  specs: ProductSpecs;
  variations?: ProductVariation[];
  cta: ProductCTA[];
  downloads?: ProductDownload[];
  active: boolean;
  dateCreated: string;
  dateModified: string;
}

export interface ProductReviewEntity {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  rating: number;
  comment?: string;
  status: ReviewStatus;
  dateCreated: string;
}

export interface ProductQuoteEntity {
  id: number;
  productId: number;
  productName: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  message?: string;
  dateCreated: string;
}

// Response Types

export interface ProductDetailResponse extends Omit<ProductEntity, 'price'> {
  price: number | null;
  priceMessage?: string;
  rating: {
    average: number;
    count: number;
  };
}

export interface RelatedProductResponse {
  id: number;
  name: string;
  imageUrl: string;
}

export interface ReviewListResponse {
  reviews: Omit<ProductReviewEntity, 'userId' | 'status'>[];
  total: number;
  average: number;
}

export interface QuoteCreateRequest {
  userName: string;
  userEmail: string;
  userPhone?: string;
  message?: string;
}

export interface ReviewCreateRequest {
  rating: number;
  comment?: string;
}
