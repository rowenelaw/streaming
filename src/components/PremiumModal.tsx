import { useEffect, useState } from 'react';
import { Check, Crown, X } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  isPremiumMember: boolean;
  onClose: () => void;
  onActivatePremium: () => void;
}

const BENEFITS = [
  'Priority viewing 8 hours after Korea & Japan broadcast',
  'Unlimited ad-free streaming across all dramas & variety shows',
  'Full 1080p HD quality with English, 中文, and Bahasa subtitles',
  'Download episodes offline across mobile, tablet, and TV',
];

export function PremiumModal({
  isOpen,
  isPremiumMember,
  onClose,
  onActivatePremium,
}: PremiumModalProps) {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');
  const [promoCode, setPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = promoCode.trim().toUpperCase();
    if (!trimmed) {
      setPromoMessage('Enter a valid promo code such as VIUSG30.');
      return;
    }
    if (trimmed === 'VIUSG30' || trimmed === 'VIU2026') {
      setPromoMessage('Promo applied: First 30 days included at S$0.00.');
    } else {
      setPromoMessage('Code not recognized. Try VIUSG30 for a 30-day preview.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="premium-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-xl border border-white/10 bg-[#161619] p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Viu Premium dialog"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#111113] text-white hover:bg-[#232329] cursor-pointer"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2 text-[#FDBE11]">
          <Crown className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-wider">Viu Singapore</span>
        </div>

        <h2
          id="premium-modal-title"
          className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white"
        >
          Upgrade to Viu Premium
        </h2>
        <p className="mt-1.5 text-sm text-[#A1A1AA]">
          Watch the newest K-dramas, Viu Originals, and variety episodes without interruptions.
        </p>

        {/* Segmented Billing Switch */}
        <div className="mt-6 grid grid-cols-2 gap-2 rounded-lg bg-[#111113] p-1 border border-white/[0.06]">
          <button
            type="button"
            onClick={() => setBilling('monthly')}
            className={`rounded-md py-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              billing === 'monthly'
                ? 'bg-[#232329] text-white'
                : 'text-[#A1A1AA] hover:text-white'
            }`}
          >
            Monthly · S$8.98/mo
          </button>
          <button
            type="button"
            onClick={() => setBilling('annual')}
            className={`rounded-md py-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              billing === 'annual'
                ? 'bg-[#FDBE11] text-[#111113]'
                : 'text-[#A1A1AA] hover:text-white'
            }`}
          >
            Annual · S$69.98/yr
          </button>
        </div>

        {/* Selected Plan Summary */}
        <div className="mt-4 rounded-lg border border-white/10 bg-[#1D1D22] p-4 flex items-baseline justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white">
              {billing === 'annual' ? 'Annual Pass (Save 35%)' : 'Monthly Pass'}
            </p>
            <p className="mt-0.5 text-xs text-[#A1A1AA]">
              Cancel anytime · Includes 4 concurrent screens
            </p>
          </div>
          <p className="font-display text-2xl font-bold text-[#FDBE11] tabular-nums shrink-0">
            {billing === 'annual' ? 'S$69.98' : 'S$8.98'}
          </p>
        </div>

        {/* Benefits */}
        <ul className="mt-5 space-y-2.5">
          {BENEFITS.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-[#E4E4E7]">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FDBE11]" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Promo Redemption */}
        <form onSubmit={handleApplyPromo} className="mt-6 flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Redeem promo code (try VIUSG30)"
            aria-label="Redeem Viu promo code"
            className="flex-1 rounded-md border border-white/10 bg-[#111113] px-3 py-2 text-sm text-white placeholder-[#71717A] focus:border-[#FDBE11] focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-md border border-white/15 bg-[#232329] px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-[#2E2E36] cursor-pointer whitespace-nowrap shrink-0"
          >
            Apply
          </button>
        </form>
        {promoMessage && (
          <p className="mt-2 text-xs text-[#FDBE11]">{promoMessage}</p>
        )}

        {/* Primary Action */}
        <div className="mt-6 flex items-center justify-end gap-3 border-t border-white/10 pt-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-4 py-2 text-sm font-medium text-[#A1A1AA] hover:text-white cursor-pointer"
          >
            Maybe Later
          </button>
          <button
            type="button"
            onClick={() => {
              onActivatePremium();
              onClose();
            }}
            className="rounded-md bg-[#FDBE11] px-5 py-2.5 text-sm font-bold text-[#111113] hover:bg-[#FFD043] transition-colors cursor-pointer"
          >
            {isPremiumMember ? 'Premium Active' : 'Activate Premium Preview'}
          </button>
        </div>
      </div>
    </div>
  );
}
