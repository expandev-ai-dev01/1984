import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StarIcon } from 'lucide-react';
import { Button } from '@/core/components/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/core/components/form';
import { Textarea } from '@/core/components/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/select';
import { cn } from '@/core/lib/utils';
import { useProductReviews } from '../../hooks/useProduct';
import { useSubmitReview } from '../../hooks/useProductMutations';
import { reviewSchema } from '../../validations/review';
import type { ReviewFormInput, ReviewFormOutput } from '../../types/forms';

interface ProductReviewsProps {
  productId: string;
}

function ProductReviews({ productId }: ProductReviewsProps) {
  const { data, isLoading } = useProductReviews(productId);
  const { mutateAsync: submitReview, isPending } = useSubmitReview(productId);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const form = useForm<ReviewFormInput, any, ReviewFormOutput>({
    resolver: zodResolver(reviewSchema),
    mode: 'onBlur',
    defaultValues: {
      review_rating: 5,
      review_comment: '',
    },
  });

  const onSubmit = async (data: ReviewFormOutput) => {
    try {
      await submitReview(data);
      form.reset();
      setIsFormVisible(false);
    } catch (error) {
      // Error handled by mutation hook
    }
  };

  if (isLoading) return <div>Carregando avaliações...</div>;

  const reviews = data?.reviews_list || [];
  const average = data?.average_rating || 0;
  const total = data?.total_reviews || 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Avaliações</h3>
          <div className="mt-1 flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={cn(
                    'size-5',
                    star <= Math.round(average)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground'
                  )}
                />
              ))}
            </div>
            <span className="text-muted-foreground">({total} avaliações)</span>
          </div>
        </div>
        <Button onClick={() => setIsFormVisible(!isFormVisible)} variant="outline">
          {isFormVisible ? 'Cancelar' : 'Avaliar Produto'}
        </Button>
      </div>

      {isFormVisible && (
        <div className="bg-muted/30 rounded-lg border p-6">
          <h4 className="mb-4 font-semibold">Escreva sua avaliação</h4>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="review_rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nota</FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(Number(val))}
                      defaultValue={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Selecione uma nota" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[5, 4, 3, 2, 1].map((num) => (
                          <SelectItem key={num} value={String(num)}>
                            {num} Estrela{num > 1 ? 's' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="review_comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comentário</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Conte o que achou do produto..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isPending}>
                {isPending ? 'Enviando...' : 'Enviar Avaliação'}
              </Button>
            </form>
          </Form>
        </div>
      )}

      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center">
            Seja o primeiro a avaliar este produto!
          </p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-0">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-semibold">{review.user_name}</span>
                <span className="text-muted-foreground text-sm">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <div className="mb-2 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={cn(
                      'size-4',
                      star <= review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    )}
                  />
                ))}
              </div>
              <p className="text-muted-foreground">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export { ProductReviews };
