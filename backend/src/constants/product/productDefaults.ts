/**
 * @summary
 * Default values and constants for Product entity.
 * Defines limits, enums, and default configurations.
 *
 * @module constants/product/productDefaults
 */

/**
 * @interface ProductLimitsType
 * @description Validation constraints for Product entity fields.
 */
export const PRODUCT_LIMITS = {
  NAME_MAX_LENGTH: 120,
  SKU_MAX_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 5000,
  REVIEW_COMMENT_MAX_LENGTH: 1500,
  QUOTE_MESSAGE_MAX_LENGTH: 1000,
} as const;

/**
 * @interface PriceVisibilityRulesType
 * @description Enum for price visibility rules.
 */
export const PRICE_VISIBILITY_RULES = {
  PUBLIC: 'PUBLICO',
  ON_REQUEST: 'SOB_CONSULTA',
  RESTRICTED: 'RESTRITO_LOGIN',
} as const;

export type PriceVisibilityRule =
  (typeof PRICE_VISIBILITY_RULES)[keyof typeof PRICE_VISIBILITY_RULES];

/**
 * @interface ReviewStatusType
 * @description Enum for review status.
 */
export const REVIEW_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;

export type ReviewStatus = (typeof REVIEW_STATUS)[keyof typeof REVIEW_STATUS];
