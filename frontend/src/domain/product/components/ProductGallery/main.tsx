import { useState, useEffect } from 'react';
import { cn } from '@/core/lib/utils';
import type { ProductMedia } from '../../types';
import { PlayCircleIcon } from 'lucide-react';

interface ProductGalleryProps {
  media: ProductMedia[];
  className?: string;
}

function ProductGallery({ media, className }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Reset selection when media changes (e.g. variation change)
  useEffect(() => {
    setSelectedIndex(0);
  }, [media]);

  if (!media || media.length === 0) {
    return (
      <div
        className={cn(
          'bg-muted text-muted-foreground flex aspect-square w-full items-center justify-center rounded-lg',
          className
        )}
      >
        Imagem não disponível
      </div>
    );
  }

  const selectedMedia = media[selectedIndex];

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/* Main Display */}
      <div
        className="bg-background relative aspect-square w-full overflow-hidden rounded-lg border"
        onMouseEnter={() => selectedMedia.type === 'image' && setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        {selectedMedia.type === 'image' ? (
          <img
            src={selectedMedia.url}
            alt={selectedMedia.alt_text}
            className={cn(
              'h-full w-full object-cover transition-transform duration-500',
              isZoomed ? 'scale-150 cursor-zoom-in' : 'scale-100'
            )}
            style={isZoomed ? { transformOrigin: 'center center' } : undefined}
          />
        ) : (
          <video
            src={selectedMedia.url}
            controls
            className="h-full w-full object-contain"
            poster={media.find((m) => m.type === 'image')?.url} // Fallback poster
          />
        )}
      </div>

      {/* Thumbnails */}
      {media.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {media.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-md border transition-all hover:opacity-100',
                selectedIndex === index ? 'ring-primary ring-2 ring-offset-2' : 'opacity-70'
              )}
            >
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <PlayCircleIcon className="size-8 text-white drop-shadow-md" />
                </div>
              )}
              {item.type === 'image' ? (
                <img src={item.url} alt={item.alt_text} className="h-full w-full object-cover" />
              ) : (
                <div className="bg-muted flex h-full w-full items-center justify-center">
                  <PlayCircleIcon className="size-6 text-muted-foreground" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export { ProductGallery };
