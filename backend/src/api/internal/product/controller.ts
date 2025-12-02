/**
 * @summary
 * Internal API controller for Product entity.
 * Handles authenticated operations like review submission.
 *
 * @module api/internal/product/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import { productReviewCreate } from '@/services/product';

/**
 * @api {post} /api/internal/product/:id/reviews Submit Review
 * @apiName SubmitReview
 * @apiGroup Product
 * @apiParam {Number} id Product ID
 */
export async function createReviewHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Mock user info - in real app this comes from req.user populated by auth middleware
    const userId = 101; // Mock User ID
    const userName = 'Test User'; // Mock User Name

    const data = await productReviewCreate(req.params, userId, userName, req.body);
    res.status(201).json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
