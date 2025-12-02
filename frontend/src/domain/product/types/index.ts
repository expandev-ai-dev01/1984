export interface ProductMedia {
  url: string;
  alt_text: string;
  type: 'image' | 'video';
}

export interface ProductVariation {
  id: string;
  name: string;
  type: string;
  sku?: string;
  price?: number;
  media_gallery?: ProductMedia[];
}

export interface CtaButton {
  label: string;
  action_type: 'WHATSAPP' | 'QUOTE_FORM' | 'EXTERNAL_LINK';
  action_value: string;
}

export interface DownloadableFile {
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: string;
  required_role?: string;
}

export interface Product {
  product_id: string;
  product_name: string;
  product_sku: string;
  product_description: string;
  product_price: number;
  price_visibility_rule: 'PUBLICO' | 'SOB_CONSULTA' | 'RESTRITO_LOGIN';
  media_gallery: ProductMedia[];
  product_variations?: ProductVariation[];
  dimensions_height?: number;
  dimensions_width?: number;
  dimensions_depth?: number;
  product_weight?: number;
  materials?: string[];
  cta_buttons: CtaButton[];
  downloadable_files?: DownloadableFile[];
  average_rating?: number;
  total_reviews?: number;
}

export interface RelatedProduct {
  product_id: string;
  product_name: string;
  main_image_url: string;
  product_url: string;
}

export interface ProductReview {
  id: string;
  rating: number;
  comment?: string;
  user_name: string;
  date: string;
}

export interface ProductReviewsResponse {
  average_rating: number;
  total_reviews: number;
  reviews_list: ProductReview[];
}
