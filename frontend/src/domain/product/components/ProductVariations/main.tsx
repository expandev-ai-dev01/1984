import { Label } from '@/core/components/label';
import { RadioGroup, RadioGroupItem } from '@/core/components/radio-group';
import type { ProductVariation } from '../../types';

interface ProductVariationsProps {
  variations: ProductVariation[];
  selectedId?: string;
  onSelect: (variation: ProductVariation) => void;
}

function ProductVariations({ variations, selectedId, onSelect }: ProductVariationsProps) {
  if (!variations || variations.length === 0) return null;

  // Group variations by type if needed, but spec implies simple list or single type for now.
  // Assuming simple list for this implementation based on spec FC-003.

  return (
    <div className="space-y-3">
      <Label className="text-base">Variações</Label>
      <RadioGroup
        value={selectedId}
        onValueChange={(val) => {
          const selected = variations.find((v) => v.id === val);
          if (selected) onSelect(selected);
        }}
        className="flex flex-wrap gap-3"
      >
        {variations.map((variation) => (
          <div key={variation.id} className="flex items-center space-x-2">
            <RadioGroupItem value={variation.id} id={variation.id} className="peer sr-only" />
            <Label
              htmlFor={variation.id}
              className="peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-primary hover:bg-accent cursor-pointer rounded-md border px-3 py-2 peer-data-[state=checked]:ring-1"
            >
              {variation.name}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export { ProductVariations };
