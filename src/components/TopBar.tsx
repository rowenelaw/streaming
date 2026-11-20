export type NavTab = 'Home' | 'K-Dramas' | 'Variety' | 'C-Dramas' | 'My List';

interface TopBarProps {
  activeNav: NavTab;
  onSelectNav: (tab: NavTab) => void;
  onOpenPremium: () => void;
  isPremiumMember: boolean;
  myListCount: number;
}

const NAV_ITEMS: NavTab[] = ['Home', 'K-Dramas', 'Variety', 'C-Dramas', 'My List'];

export function TopBar({
  activeNav,
  onSelectNav,
  onOpenPremium,
  isPremiumMember,
  myListCount,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#111113]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-8 px-4 sm:px-8">
        {/* Zone 1: Single-element Viu brand wordmark */}
        <button
          type="button"
          onClick={() => onSelectNav('Home')}
          aria-label="Viu Singapore Home"
          className="flex items-center whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FDBE11] cursor-pointer"
        >
          <span className="font-display text-3xl font-extrabold tracking-tight text-[#FDBE11] leading-none">
            viu
          </span>
        </button>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Primary categories"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item;
            const label =
              item === 'My List' && myListCount > 0 ? `My List (${myListCount})` : item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => onSelectNav(item)}
                className={`relative py-5 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FDBE11] ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                {label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-[#FDBE11]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action CTA */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenPremium}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FDBE11] ${
              isPremiumMember
                ? 'bg-[#232329] text-[#FDBE11] border border-[#FDBE11]/40 hover:bg-[#2B2B33]'
                : 'bg-[#FDBE11] text-[#111113] hover:bg-[#FFD043]'
            }`}
          >
            {isPremiumMember ? 'Viu Premium' : 'Go Premium'}
          </button>
        </div>
      </div>

      {/* Mobile horizontal nav row (compact, single-line scrolling) */}
      <nav
        aria-label="Mobile categories"
        className="flex md:hidden items-center gap-5 overflow-x-auto no-scrollbar border-t border-white/[0.06] px-4 py-2 text-xs font-medium"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeNav === item;
          const label =
            item === 'My List' && myListCount > 0 ? `My List (${myListCount})` : item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => onSelectNav(item)}
              className={`py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isActive ? 'text-[#FDBE11] font-semibold' : 'text-[#A1A1AA]'
              }`}
            >
              {label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
