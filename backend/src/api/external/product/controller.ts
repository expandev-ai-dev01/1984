/**
 * @summary
 * External API controller for Product entity.
 * Handles public product retrieval, related products, reviews list, and quote submission.
 *
 * @module api/external/product/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import {
  productGetById,
  productGetRelated,
  productReviewList,
  productQuoteCreate,
} from '@/services/product';

/**
 * @api {get} /api/external/product/:id Get Product Detail
 * @apiName GetProduct
 * @apiGroup Product
 * @apiParam {Number} id Product ID
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Mock user role check from header for demonstration of visibility rules
    // In production, this would come from a proper auth middleware even for public routes (optional auth)
    const userRole = req.headers['x-user-role'] as string | undefined;

    const data = await productGetById(req.params, userRole);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {get} /api/external/product/:id/related Get Related Products
 * @apiName GetRelatedProducts
 * @apiGroup Product
 * @apiParam {Number} id Product ID
 */
export async function getRelatedHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await productGetRelated(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {get} /api/external/product/:id/reviews List Product Reviews
 * @apiName ListProductReviews
 * @apiGroup Product
 * @apiParam {Number} id Product ID
 */
export async function getReviewsHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await productReviewList(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {post} /api/external/product/:id/quote Submit Quote Request
 * @apiName SubmitQuote
 * @apiGroup Product
 * @apiParam {Number} id Product ID
 */
export async function createQuoteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await productQuoteCreate(req.params, req.body);
    res.status(201).json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
