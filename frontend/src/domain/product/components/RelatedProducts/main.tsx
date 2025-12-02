import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/core/components/card';
import { useRelatedProducts } from '../../hooks/useProduct';

interface RelatedProductsProps {
  productId: string;
}

function RelatedProducts({ productId }: RelatedProductsProps) {
  const { data: products, isLoading } = useRelatedProducts(productId);

  if (isLoading || !products || products.length === 0) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Produtos Relacionados</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Link key={product.product_id} to={`/product/${product.product_id}`} className="group">
            <Card className="h-full overflow-hidden transition-all hover:shadow-md">
              <div className="bg-muted aspect-square overflow-hidden">
                <img
                  src={product.main_image_url}
                  alt={product.product_name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h4 className="group-hover:text-primary line-clamp-2 font-medium">
                  {product.product_name}
                </h4>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export { RelatedProducts };
