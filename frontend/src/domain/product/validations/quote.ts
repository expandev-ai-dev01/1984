import { z } from 'zod';

export const quoteSchema = z.object({
  quote_product_name: z.string(),
  quote_user_name: z.string('Nome é obrigatório').min(2, 'Nome deve ter pelo menos 2 caracteres'),
  quote_user_email: z.string('E-mail é obrigatório').email('E-mail inválido'),
  quote_user_phone: z.string().optional(),
  quote_message: z.string().max(1000, 'Mensagem muito longa').optional(),
});
