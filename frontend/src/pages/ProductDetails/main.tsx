import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '@/domain/product/hooks/useProduct';
import {
  ProductGallery,
  ProductInfo,
  ProductVariations,
  ProductSpecs,
  ProductReviews,
  ProductDownloads,
  RelatedProducts,
  QuoteModal,
} from '@/domain/product/components';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { Separator } from '@/core/components/separator';
import type { ProductVariation } from '@/domain/product/types';

function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id);

  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | undefined>(
    undefined
  );
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Reset variation when product changes
  useEffect(() => {
    setSelectedVariation(undefined);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <LoadingSpinner className="size-8" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Produto não encontrado</h2>
        <p className="text-muted-foreground">
          O produto que você procura não existe ou foi removido.
        </p>
      </div>
    );
  }

  // Determine active data based on variation
  const activeMedia = selectedVariation?.media_gallery || product.media_gallery;
  const activePrice = selectedVariation?.price || product.product_price;
  const activeSku = selectedVariation?.sku || product.product_sku;

  return (
    <div className="space-y-12 py-8">
      {/* Top Section: Gallery & Info */}
      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery media={activeMedia} />

        <ProductInfo
          product={product}
          activePrice={activePrice}
          activeSku={activeSku}
          onQuoteClick={() => setIsQuoteModalOpen(true)}
        >
          {product.product_variations && product.product_variations.length > 0 && (
            <ProductVariations
              variations={product.product_variations}
              selectedId={selectedVariation?.id}
              onSelect={setSelectedVariation}
            />
          )}
        </ProductInfo>
      </div>

      <Separator />

      {/* Middle Section: Specs & Downloads */}
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <ProductSpecs product={product} />
        </div>
        <div>
          <ProductDownloads files={product.downloadable_files} />
        </div>
      </div>

      <Separator />

      {/* Reviews Section */}
      <ProductReviews productId={product.product_id} />

      <Separator />

      {/* Bottom Section: Related Products */}
      <RelatedProducts productId={product.product_id} />

      {/* Modals */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        productName={product.product_name}
        productId={product.product_id}
      />
    </div>
  );
}

export { ProductDetailsPage };
