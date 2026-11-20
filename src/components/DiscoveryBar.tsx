import { Search, X } from 'lucide-react';
import { RegionOrigin, SubtitleLanguage } from '../data/catalog';

export type RegionFilter = 'All' | RegionOrigin | 'Free';
export type SubtitleFilter = 'All' | SubtitleLanguage;

interface DiscoveryBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  regionFilter: RegionFilter;
  onRegionChange: (region: RegionFilter) => void;
  subtitleFilter: SubtitleFilter;
  onSubtitleChange: (sub: SubtitleFilter) => void;
  resultCount: number;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
}

const REGION_OPTIONS: { value: RegionFilter; label: string }[] = [
  { value: 'All', label: 'All Regions' },
  { value: 'Korea', label: 'Korea' },
  { value: 'China', label: 'China' },
  { value: 'Thailand', label: 'Thailand' },
  { value: 'Japan', label: 'Japan' },
  { value: 'Free', label: 'Free to Watch' },
];

const SUBTITLE_OPTIONS: { value: SubtitleFilter; label: string }[] = [
  { value: 'All', label: 'All Subtitles' },
  { value: 'English', label: 'English Sub' },
  { value: '中文', label: '中文' },
  { value: 'Bahasa', label: 'Bahasa' },
];

export function DiscoveryBar({
  searchQuery,
  onSearchChange,
  regionFilter,
  onRegionChange,
  subtitleFilter,
  onSubtitleChange,
  resultCount,
  hasActiveFilters,
  onResetFilters,
}: DiscoveryBarProps) {
  return (
    <section
      aria-label="Browse and filter shows"
      className="border-b border-white/[0.08] bg-[#161619]"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Region / Free segmented controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {REGION_OPTIONS.map((option) => {
            const isActive = regionFilter === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onRegionChange(option.value)}
                className={`rounded-md px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FDBE11] ${
                  isActive
                    ? 'bg-[#FDBE11] text-[#111113] font-semibold'
                    : 'bg-[#232329] text-[#D4D4D8] hover:bg-[#2C2C34] hover:text-white'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {/* Search & Subtitle controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:w-64 sm:flex-none">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A1A1AA]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search dramas, cast, variety..."
              aria-label="Search titles, cast, or genres"
              className="w-full rounded-md border border-white/10 bg-[#111113] py-2 pl-9 pr-8 text-sm text-white placeholder-[#71717A] transition-colors focus:border-[#FDBE11] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-white cursor-pointer"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </div>

          <label className="sr-only" htmlFor="subtitle-filter-select">
            Filter by subtitle language
          </label>
          <select
            id="subtitle-filter-select"
            value={subtitleFilter}
            onChange={(e) => onSubtitleChange(e.target.value as SubtitleFilter)}
            className="rounded-md border border-white/10 bg-[#111113] px-3 py-2 text-sm text-[#E4E4E7] transition-colors focus:border-[#FDBE11] focus:outline-none cursor-pointer"
          >
            {SUBTITLE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#1A1A1E] text-white">
                {opt.label}
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs font-medium text-[#FDBE11] hover:text-[#FFD043] whitespace-nowrap shrink-0 cursor-pointer px-2 py-2"
            >
              Reset ({resultCount})
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
