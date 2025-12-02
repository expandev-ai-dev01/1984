import DOMPurify from 'dompurify';
import { Badge } from '@/core/components/badge';
import { ProductActions } from '../ProductActions';
import type { Product } from '../../types';

interface ProductInfoProps {
  product: Product;
  activePrice?: number;
  activeSku?: string;
  onQuoteClick: () => void;
  children?: React.ReactNode; // For Variations
}

function ProductInfo({
  product,
  activePrice,
  activeSku,
  onQuoteClick,
  children,
}: ProductInfoProps) {
  const displayPrice = activePrice ?? product.product_price;
  const displaySku = activeSku ?? product.product_sku;

  const renderPrice = () => {
    switch (product.price_visibility_rule) {
      case 'PUBLICO':
        return (
          <div className="text-primary text-3xl font-bold">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
              displayPrice
            )}
          </div>
        );
      case 'SOB_CONSULTA':
        return (
          <div className="text-muted-foreground text-xl font-semibold">Preço sob consulta</div>
        );
      case 'RESTRITO_LOGIN':
        // Mock auth check - in real app useAuth()
        const isLoggedIn = !!localStorage.getItem('auth_token');
        if (isLoggedIn) {
          return (
            <div className="text-primary text-3xl font-bold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                displayPrice
              )}
            </div>
          );
        }
        return (
          <div className="text-muted-foreground text-sm">
            <a href="/login" className="hover:text-primary underline">
              Faça login
            </a>{' '}
            para ver o preço
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Badge variant="outline" className="mb-2">
          {displaySku}
        </Badge>
        <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
          {product.product_name}
        </h1>
      </div>

      {renderPrice()}

      <div
        className="prose prose-sm text-muted-foreground max-w-none"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.product_description) }}
      />

      {children}

      <div className="pt-4">
        <ProductActions buttons={product.cta_buttons} onQuoteClick={onQuoteClick} />
      </div>
    </div>
  );
}

export { ProductInfo };
