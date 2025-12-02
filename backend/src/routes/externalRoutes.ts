/**
 * @summary
 * External API routes configuration.
 * Handles public endpoints that don't require authentication.
 *
 * @module routes/externalRoutes
 */

import { Router } from 'express';
import * as productController from '@/api/external/product/controller';

const router = Router();

/**
 * @rule {be-route-configuration}
 * Product Public Routes
 */
router.get('/product/:id', productController.getHandler);
router.get('/product/:id/related', productController.getRelatedHandler);
router.get('/product/:id/reviews', productController.getReviewsHandler);
router.post('/product/:id/quote', productController.createQuoteHandler);

export default router;
