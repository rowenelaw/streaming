import { useEffect, useState } from 'react';
import { Clock, Crown } from 'lucide-react';

interface FreeTrialBannerProps {
  isPremiumMember?: boolean;
  onGoPremiumClick: () => void;
}

const ONE_HOUR_SECONDS = 3600;
const STORAGE_KEY = 'uwatch_sg_trial_deadline';

function getInitialRemainingSeconds(): number {
  try {
    const saved = window.sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const deadline = Number(saved);
      const diff = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
      if (diff > 0) return diff;
    }
    const nextDeadline = Date.now() + ONE_HOUR_SECONDS * 1000;
    window.sessionStorage.setItem(STORAGE_KEY, String(nextDeadline));
  } catch {
    // Ignore storage errors in restricted contexts
  }
  return ONE_HOUR_SECONDS;
}

function formatCountdown(totalSeconds: number): string {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return [hrs, mins, secs].map((n) => String(n).padStart(2, '0')).join(':');
}

export function FreeTrialBanner({
  isPremiumMember = false,
  onGoPremiumClick,
}: FreeTrialBannerProps) {
  const [secondsLeft, setSecondsLeft] = useState<number>(() =>
    getInitialRemainingSeconds()
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      aria-label="Free trial promotion"
      className="mx-auto max-w-[1440px] px-4 pt-4 pb-2 sm:px-8"
    >
      <div className="animate-uwatch-banner-glow relative overflow-hidden rounded-xl bg-[#FFE6D1] px-6 py-4 sm:px-8 sm:py-5">
        {/* Continuous GPU-composited golden sheen sweep */}
        <div
          aria-hidden="true"
          className="animate-uwatch-banner-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        />

        <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <h2 className="font-display text-lg sm:text-2xl lg:text-[21px] xl:text-[26px] font-extrabold tracking-tight text-[#1F2126] leading-tight lg:whitespace-nowrap">
            Sign up for FREE trial on your first{' '}
            <span className="animate-uwatch-adfree-flash inline-block text-[#F04E00]">
              AD-FREE
            </span>{' '}
            series NOW.
          </h2>

          <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end lg:shrink-0">
            <div
              aria-live="off"
              aria-label={`Offer ends in ${formatCountdown(secondsLeft)}`}
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg bg-[#1F2126] px-3.5 py-2.5 text-white"
            >
              <Clock className="h-4 w-4 text-[#FF5E00] shrink-0" aria-hidden="true" />
              <span className="text-xs font-medium text-[#D4D4D8] whitespace-nowrap">
                Ends in
              </span>
              <span className="font-mono text-sm sm:text-base font-bold tracking-wider text-[#FF5E00] tabular-nums">
                {formatCountdown(secondsLeft)}
              </span>
            </div>

            <button
              type="button"
              onClick={onGoPremiumClick}
              className="ml-auto sm:ml-0 inline-flex items-center gap-2 rounded-lg bg-[#111113] px-6 py-3 font-display text-base sm:text-lg font-extrabold tracking-tight text-[#FF5E00] shadow-md transition-colors duration-150 hover:bg-[#232329] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111113]"
            >
              <Crown className="h-5 w-5 text-[#FF5E00]" aria-hidden="true" />
              <span>{isPremiumMember ? 'UWatch Premium' : 'Go Premium'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
