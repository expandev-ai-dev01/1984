import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';

export const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id!),
    enabled: !!id,
  });
};

export const useRelatedProducts = (id: string | undefined) => {
  return useQuery({
    queryKey: ['product', id, 'related'],
    queryFn: () => productService.getRelated(id!),
    enabled: !!id,
  });
};

export const useProductReviews = (id: string | undefined) => {
  return useQuery({
    queryKey: ['product', id, 'reviews'],
    queryFn: () => productService.getReviews(id!),
    enabled: !!id,
  });
};
