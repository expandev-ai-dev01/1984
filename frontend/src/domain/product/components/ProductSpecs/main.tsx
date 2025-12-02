import { Table, TableBody, TableCell, TableRow } from '@/core/components/table';
import type { Product } from '../../types';

interface ProductSpecsProps {
  product: Product;
}

function ProductSpecs({ product }: ProductSpecsProps) {
  const hasSpecs =
    product.dimensions_height ||
    product.dimensions_width ||
    product.dimensions_depth ||
    product.product_weight ||
    (product.materials && product.materials.length > 0);

  if (!hasSpecs) return null;

  return (
    <div className="rounded-lg border p-6">
      <h3 className="mb-4 text-lg font-semibold">Ficha Técnica</h3>
      <Table>
        <TableBody>
          {product.dimensions_height && (
            <TableRow>
              <TableCell className="font-medium">Altura</TableCell>
              <TableCell>{product.dimensions_height} cm</TableCell>
            </TableRow>
          )}
          {product.dimensions_width && (
            <TableRow>
              <TableCell className="font-medium">Largura</TableCell>
              <TableCell>{product.dimensions_width} cm</TableCell>
            </TableRow>
          )}
          {product.dimensions_depth && (
            <TableRow>
              <TableCell className="font-medium">Profundidade</TableCell>
              <TableCell>{product.dimensions_depth} cm</TableCell>
            </TableRow>
          )}
          {product.product_weight && (
            <TableRow>
              <TableCell className="font-medium">Peso</TableCell>
              <TableCell>{product.product_weight} kg</TableCell>
            </TableRow>
          )}
          {product.materials && product.materials.length > 0 && (
            <TableRow>
              <TableCell className="font-medium">Materiais</TableCell>
              <TableCell>{product.materials.join(', ')}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export { ProductSpecs };
