import { z } from 'zod';

export const reviewSchema = z.object({
  review_rating: z.coerce
    .number('Nota é obrigatória')
    .int()
    .min(1, 'Selecione pelo menos 1 estrela')
    .max(5, 'Máximo de 5 estrelas'),
  review_comment: z.string().max(1500, 'Comentário muito longo').optional(),
});
