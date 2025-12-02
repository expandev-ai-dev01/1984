import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services/productService';
import { toast } from 'sonner';
import type { QuoteFormOutput, ReviewFormOutput } from '../types/forms';

export const useProductQuote = (productId: string) => {
  return useMutation({
    mutationFn: (data: QuoteFormOutput) => productService.createQuote(productId, data),
    onSuccess: () => {
      toast.success('Solicitação de orçamento enviada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao enviar solicitação. Tente novamente.');
    },
  });
};

export const useSubmitReview = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReviewFormOutput) => productService.createReview(productId, data),
    onSuccess: () => {
      toast.success('Avaliação enviada para moderação!');
      queryClient.invalidateQueries({ queryKey: ['product', productId, 'reviews'] });
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        toast.error('Você precisa estar logado para avaliar.');
      } else {
        toast.error('Erro ao enviar avaliação. Tente novamente.');
      }
    },
  });
};
