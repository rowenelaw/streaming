import { useRef, useState } from 'react';
import { Bookmark, Check, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Show } from '../data/catalog';
import { MediaImage } from './MediaImage';

export type RailVariant = 'poster' | 'top10' | 'episode';

interface ContentRailProps {
  id?: string;
  title: string;
  subtitle?: string;
  shows: Show[];
  variant?: RailVariant;
  defaultExpanded?: boolean;
  myListIds: string[];
  progressMap?: Record<string, { episodeNumber: number; percent: number }>;
  onSelectShow: (show: Show) => void;
  onPlayShow: (show: Show, episodeNumber?: number) => void;
  onToggleMyList: (showId: string) => void;
}

export function ContentRail({
  id,
  title,
  subtitle,
  shows,
  variant = 'poster',
  defaultExpanded = false,
  myListIds,
  progressMap = {},
  onSelectShow,
  onPlayShow,
  onToggleMyList,
}: ContentRailProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (shows.length === 0) return null;

  const scrollByAmount = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const distance = Math.max(el.clientWidth * 0.78, 320);
    el.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  return (
    <section id={id} className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8 sm:py-8">
      {/* Section Header */}
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-0.5 text-xs sm:text-sm text-[#A1A1AA]">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!isExpanded && (
            <div className="hidden sm:flex items-center gap-1.5 mr-1">
              <button
                type="button"
                onClick={() => scrollByAmount('left')}
                aria-label={`Scroll ${title} left`}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-[#1A1A1E] text-[#D4D4D8] transition-colors hover:bg-[#232329] hover:text-white cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollByAmount('right')}
                aria-label={`Scroll ${title} right`}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-[#1A1A1E] text-[#D4D4D8] transition-colors hover:bg-[#232329] hover:text-white cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}

          {shows.length > 4 && (
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="px-2.5 py-1.5 text-xs font-semibold text-[#FDBE11] hover:text-[#FFD043] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isExpanded ? 'Show shelf' : 'View all'}
            </button>
          )}
        </div>
      </div>

      {/* Cards Container: Horizontal shelf or expanded grid */}
      <div
        ref={scrollRef}
        className={
          isExpanded
            ? variant === 'episode'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'
              : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5'
            : 'flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar pb-2 scroll-smooth'
        }
      >
        {shows.map((show, idx) => {
          const isSaved = myListIds.includes(show.id);
          const progress = progressMap[show.id];
          const latestEp = show.episodes[show.episodes.length - 1];
          const rankNumber = show.topRank ?? idx + 1;

          if (variant === 'episode') {
            return (
              <article
                key={show.id}
                className={
                  isExpanded
                    ? 'group flex flex-col'
                    : 'group flex w-[270px] sm:w-[310px] shrink-0 flex-col'
                }
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-[#1A1A1E] border border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() =>
                      onPlayShow(show, progress?.episodeNumber ?? latestEp?.number ?? 1)
                    }
                    className="block h-full w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FDBE11]"
                    aria-label={`Play ${show.title}`}
                  >
                    <MediaImage
                      src={latestEp?.thumbnail ?? show.backdropUrl}
                      alt={`${show.title} episode preview`}
                      fallbackTitle={show.title}
                      className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent"
                    />
                    <span className="absolute bottom-2.5 left-3 text-xs font-semibold text-white">
                      {progress
                        ? `Ep ${progress.episodeNumber} · Resume`
                        : `Ep ${show.availableEpisodes} · ${latestEp?.duration ?? '60 min'}`}
                    </span>
                    {show.isPremium && (
                      <span className="absolute top-2.5 right-2.5 rounded bg-[#FDBE11] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#111113]">
                        Premium
                      </span>
                    )}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FDBE11] text-[#111113] shadow-lg">
                        <Play className="h-5 w-5 fill-current ml-0.5" />
                      </span>
                    </span>
                  </button>

                  {progress && (
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
                      <div
                        className="h-full bg-[#FDBE11]"
                        style={{ width: `${Math.min(100, Math.max(8, progress.percent))}%` }}
                      />
                    </div>
                  )}
                </div>

                <div className="mt-2.5 flex items-start justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectShow(show)}
                    className="text-left cursor-pointer min-w-0"
                  >
                    <h3 className="text-sm font-semibold text-white group-hover:text-[#FDBE11] transition-colors truncate">
                      {show.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-[#A1A1AA] truncate">
                      {show.category} · {show.subtitles.join(' / ')} Sub
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleMyList(show.id)}
                    aria-label={
                      isSaved ? `Remove ${show.title} from My List` : `Add ${show.title} to My List`
                    }
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded text-[#A1A1AA] hover:bg-white/10 hover:text-white cursor-pointer"
                  >
                    {isSaved ? (
                      <Check className="h-4 w-4 text-[#FDBE11]" aria-hidden="true" />
                    ) : (
                      <Bookmark className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </article>
            );
          }

          return (
            <article
              key={show.id}
              className={
                isExpanded
                  ? 'group flex flex-col'
                  : variant === 'top10'
                    ? 'group flex w-[184px] sm:w-[210px] shrink-0 flex-col'
                    : 'group flex w-[162px] sm:w-[192px] shrink-0 flex-col'
              }
            >
              <div
                className={`relative ${
                  variant === 'top10' ? 'pl-5 sm:pl-6' : ''
                }`}
              >
                {variant === 'top10' && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-0.5 bottom-1 z-20 font-display text-6xl sm:text-7xl font-extrabold leading-none tracking-tighter text-[#FDBE11] drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] tabular-nums select-none"
                  >
                    {rankNumber}
                  </span>
                )}

                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-[#1A1A1E] border border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => onSelectShow(show)}
                    className="block h-full w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FDBE11]"
                    aria-label={`View details for ${show.title}`}
                  >
                    <MediaImage
                      src={show.posterUrl}
                      alt={`${show.title} poster`}
                      fallbackTitle={show.title}
                      className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"
                    />

                    {/* Single clean status tag at top-right if Original or Premium */}
                    {(show.isOriginal || show.isPremium) && (
                      <span
                        className={`absolute top-2.5 right-2.5 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          show.isOriginal
                            ? 'bg-[#FDBE11] text-[#111113]'
                            : 'bg-[#111113]/85 text-[#FDBE11] border border-[#FDBE11]/40'
                        }`}
                      >
                        {show.isOriginal ? 'Viu Original' : 'Premium'}
                      </span>
                    )}

                    {/* Bottom episode status line */}
                    <span className="absolute bottom-2.5 right-2.5 left-3 text-right text-[11px] font-medium text-[#E4E4E7] tabular-nums">
                      {show.availableEpisodes === show.totalEpisodes
                        ? `Full ${show.totalEpisodes} Ep`
                        : `Ep ${show.availableEpisodes}`}
                    </span>
                  </button>

                  {/* Quick hover actions */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => onPlayShow(show, 1)}
                      aria-label={`Play ${show.title}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FDBE11] text-[#111113] shadow-md hover:bg-[#FFD043] cursor-pointer"
                    >
                      <Play className="h-3.5 w-3.5 fill-current ml-0.5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleMyList(show.id)}
                      aria-label={
                        isSaved ? `Remove ${show.title} from My List` : `Save ${show.title} to My List`
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111113]/85 text-white border border-white/15 hover:bg-[#232329] cursor-pointer"
                    >
                      {isSaved ? (
                        <Check className="h-3.5 w-3.5 text-[#FDBE11]" aria-hidden="true" />
                      ) : (
                        <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectShow(show)}
                className={`mt-2.5 text-left cursor-pointer ${
                  variant === 'top10' ? 'pl-5 sm:pl-6' : ''
                }`}
              >
                <h3 className="text-sm font-semibold text-white group-hover:text-[#FDBE11] transition-colors truncate">
                  {show.title}
                </h3>
                <p className="mt-0.5 text-xs text-[#A1A1AA] truncate">
                  {show.region} · {show.genres[0]} · {show.isPremium ? 'Premium' : 'Free'}
                </p>
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
