import { ArrowRight, Cast, Clock, Download, Monitor, Play, ShieldCheck } from 'lucide-react';

interface PremiumHighlightsProps {
  isPremiumMember: boolean;
  onOpenPremium: () => void;
}

const PREMIUM_FEATURES = [
  {
    index: '01',
    title: 'Continue Watching',
    description: 'Pick up right where you left off across desktop, mobile, and smart TV.',
    icon: Play,
  },
  {
    index: '02',
    title: 'Ad-Free Streaming',
    description: 'Watch dramas, variety hits, and anime with zero pre-roll or mid-roll ads.',
    icon: ShieldCheck,
  },
  {
    index: '03',
    title: 'Full HD (1080p) Resolution',
    description: 'Crisp 1080p picture clarity with synced English, 中文, and Bahasa subtitles.',
    icon: Monitor,
  },
  {
    index: '04',
    title: 'Unlimited Downloads',
    description: 'Save full seasons and variety episodes offline for commute or flight viewing.',
    icon: Download,
  },
  {
    index: '05',
    title: 'Early Episode Access',
    description: 'Stream priority simulcasts as fast as 8 hours after Korea and Japan broadcasts.',
    icon: Clock,
  },
  {
    index: '06',
    title: 'Full Catalog & TV Casting',
    description: 'Unlock every Viu Original, Premium-only series, and big-screen TV casting.',
    icon: Cast,
  },
];

export function PremiumHighlights({
  isPremiumMember,
  onOpenPremium,
}: PremiumHighlightsProps) {
  return (
    <section
      aria-labelledby="premium-unlocks-heading"
      className="mx-auto max-w-[1440px] px-4 pt-8 pb-4 sm:px-8 sm:pt-10"
    >
      <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs sm:text-sm font-semibold text-[#FDBE11]">
            Viu Premium Membership
          </p>
          <h2
            id="premium-unlocks-heading"
            className="mt-1 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white [text-wrap:balance]"
          >
            What Paid Viu Premium Plans Unlock
          </h2>
          <p className="mt-2 text-sm text-[#A1A1AA]">
            From uninterrupted Full HD playback to early simulcasts and TV casting, upgrade any
            time starting from S$69.98/year.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenPremium}
          className="inline-flex items-center gap-2 self-start rounded-md bg-[#FDBE11] px-5 py-2.5 text-sm font-bold text-[#111113] transition-colors duration-150 hover:bg-[#FFD043] whitespace-nowrap shrink-0 cursor-pointer md:self-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FDBE11]"
        >
          <span>{isPremiumMember ? 'Manage Viu Premium' : 'Compare Paid Plans'}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PREMIUM_FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.index}
              className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#161619] p-5 transition-colors duration-150 hover:border-[#FDBE11]/35"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-display text-sm font-bold text-[#FDBE11] tabular-nums">
                  {feature.index}.
                </span>
                <Icon className="h-4 w-4 text-[#A1A1AA]" aria-hidden="true" />
              </div>

              <div className="mt-3">
                <h3 className="font-display text-base font-bold text-white">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#A1A1AA]">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
