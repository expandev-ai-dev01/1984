import { z } from 'zod';
import { quoteSchema } from '../validations/quote';
import { reviewSchema } from '../validations/review';

export type QuoteFormInput = z.input<typeof quoteSchema>;
export type QuoteFormOutput = z.output<typeof quoteSchema>;

export type ReviewFormInput = z.input<typeof reviewSchema>;
export type ReviewFormOutput = z.output<typeof reviewSchema>;
