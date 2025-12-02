import { Button } from '@/core/components/button';
import { MessageCircleIcon, FileTextIcon, ExternalLinkIcon } from 'lucide-react';
import type { CtaButton } from '../../types';

interface ProductActionsProps {
  buttons: CtaButton[];
  onQuoteClick: () => void;
}

function ProductActions({ buttons, onQuoteClick }: ProductActionsProps) {
  const handleAction = (btn: CtaButton) => {
    switch (btn.action_type) {
      case 'WHATSAPP':
        window.open(`https://wa.me/${btn.action_value}`, '_blank');
        break;
      case 'QUOTE_FORM':
        onQuoteClick();
        break;
      case 'EXTERNAL_LINK':
        window.open(btn.action_value, '_blank');
        break;
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'WHATSAPP':
        return <MessageCircleIcon className="size-4" />;
      case 'QUOTE_FORM':
        return <FileTextIcon className="size-4" />;
      default:
        return <ExternalLinkIcon className="size-4" />;
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {buttons.map((btn, index) => (
        <Button
          key={index}
          onClick={() => handleAction(btn)}
          className="flex-1"
          variant={btn.action_type === 'QUOTE_FORM' ? 'default' : 'outline'}
          size="lg"
        >
          {getIcon(btn.action_type)}
          {btn.label}
        </Button>
      ))}
    </div>
  );
}

export { ProductActions };
