/**
 * @summary
 * In-memory store instance for Product entity.
 * Stores products, reviews, and quotes.
 *
 * @module instances/product/productStore
 */

import {
  ProductEntity,
  ProductReviewEntity,
  ProductQuoteEntity,
} from '@/services/product/productTypes';
import { PRICE_VISIBILITY_RULES, REVIEW_STATUS } from '@/constants/product';

class ProductStore {
  private products: Map<number, ProductEntity> = new Map();
  private reviews: Map<number, ProductReviewEntity> = new Map();
  private quotes: Map<number, ProductQuoteEntity> = new Map();
  private nextReviewId = 1;
  private nextQuoteId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed a sample product
    const product: ProductEntity = {
      id: 1,
      name: 'Sofá Retrátil 3 Lugares Linho Bege',
      sku: 'SOFA-RET-001',
      description: '<p>Sofá confortável com design moderno, ideal para salas de estar.</p>',
      price: 2500.0,
      priceVisibility: PRICE_VISIBILITY_RULES.PUBLIC,
      category: 'Sala de Estar',
      media: [
        { url: 'https://example.com/sofa-main.jpg', alt: 'Sofá Frente', type: 'image' },
        { url: 'https://example.com/sofa-side.jpg', alt: 'Sofá Lateral', type: 'image' },
      ],
      specs: {
        height: 95,
        width: 220,
        depth: 110,
        weight: 85,
        materials: ['Madeira Maciça', 'Linho', 'Espuma D33'],
      },
      variations: [
        {
          name: 'Cor',
          options: [
            {
              label: 'Bege',
              sku: 'SOFA-RET-001-BE',
              media: [{ url: 'https://example.com/sofa-bege.jpg', alt: 'Bege', type: 'image' }],
            },
            {
              label: 'Cinza',
              sku: 'SOFA-RET-001-CZ',
              media: [{ url: 'https://example.com/sofa-cinza.jpg', alt: 'Cinza', type: 'image' }],
            },
          ],
        },
      ],
      cta: [
        { label: 'Solicitar Orçamento', actionType: 'QUOTE_FORM', actionValue: 'modal-quote' },
        { label: 'Falar no WhatsApp', actionType: 'WHATSAPP', actionValue: '5511999999999' },
      ],
      downloads: [
        {
          fileName: 'Manual de Montagem',
          fileUrl: 'https://example.com/manual.pdf',
          fileType: 'MANUAL',
          fileSize: '2MB',
        },
      ],
      active: true,
      dateCreated: new Date().toISOString(),
      dateModified: new Date().toISOString(),
    };

    this.products.set(product.id, product);

    // Seed another product for related items
    const product2: ProductEntity = {
      ...product,
      id: 2,
      name: 'Poltrona Decorativa',
      sku: 'POLT-002',
      category: 'Sala de Estar',
      priceVisibility: PRICE_VISIBILITY_RULES.ON_REQUEST,
    };
    this.products.set(product2.id, product2);

    // Seed a review
    this.addReview({
      id: this.nextReviewId++,
      productId: 1,
      userId: 101,
      userName: 'Maria Silva',
      rating: 5,
      comment: 'Excelente sofá, muito confortável!',
      status: REVIEW_STATUS.APPROVED,
      dateCreated: new Date().toISOString(),
    });
  }

  getProduct(id: number): ProductEntity | undefined {
    return this.products.get(id);
  }

  getProductsByCategory(category: string): ProductEntity[] {
    return Array.from(this.products.values()).filter((p) => p.category === category);
  }

  addReview(review: ProductReviewEntity): ProductReviewEntity {
    const newReview = { ...review, id: this.nextReviewId++ };
    this.reviews.set(newReview.id, newReview);
    return newReview;
  }

  getReviewsByProduct(productId: number): ProductReviewEntity[] {
    return Array.from(this.reviews.values()).filter((r) => r.productId === productId);
  }

  hasUserReviewed(productId: number, userId: number): boolean {
    return Array.from(this.reviews.values()).some(
      (r) => r.productId === productId && r.userId === userId
    );
  }

  addQuote(quote: ProductQuoteEntity): ProductQuoteEntity {
    const newQuote = { ...quote, id: this.nextQuoteId++ };
    this.quotes.set(newQuote.id, newQuote);
    return newQuote;
  }
}

export const productStore = new ProductStore();
