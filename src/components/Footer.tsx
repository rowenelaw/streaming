import { NavTab } from './TopBar';

interface FooterProps {
  onSelectNav: (tab: NavTab) => void;
  onOpenPremium: () => void;
}

export function Footer({ onSelectNav, onOpenPremium }: FooterProps) {
  return (
    <footer className="mt-12 border-t border-white/[0.08] bg-[#0B0B0D]">
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-display text-3xl font-extrabold tracking-tight text-[#FDBE11]">
              viu
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#A1A1AA]">
              Singapore Edition · Watch the latest K-dramas, Korean variety hits, C-dramas, Thai
              series, and anime with fast English and Chinese subtitles.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Browse Library
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-[#A1A1AA]">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectNav('K-Dramas')}
                  className="hover:text-[#FDBE11] transition-colors cursor-pointer"
                >
                  Korean Dramas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectNav('Variety')}
                  className="hover:text-[#FDBE11] transition-colors cursor-pointer"
                >
                  Korean Variety Shows
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectNav('C-Dramas')}
                  className="hover:text-[#FDBE11] transition-colors cursor-pointer"
                >
                  Chinese Dramas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectNav('My List')}
                  className="hover:text-[#FDBE11] transition-colors cursor-pointer"
                >
                  My Watchlist
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Membership
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-[#A1A1AA]">
              <li>
                <button
                  type="button"
                  onClick={onOpenPremium}
                  className="hover:text-[#FDBE11] transition-colors cursor-pointer"
                >
                  Viu Premium Singapore
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPremium}
                  className="hover:text-[#FDBE11] transition-colors cursor-pointer"
                >
                  Redeem Promo Code
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Support &amp; Region
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-[#A1A1AA]">
              <li>Region: Singapore (SGT)</li>
              <li>Subtitles: English · 中文 · Bahasa</li>
              <li>Support: enquiry.sg@viu.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-[#71717A] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Viu Singapore Streaming Showcase. All rights reserved.</p>
          <p>Terms of Service · Privacy Statement · Parental Controls</p>
        </div>
      </div>
    </footer>
  );
}
