import { useEffect } from 'react';
import { Bookmark, Check, Lock, Play, X } from 'lucide-react';
import { Episode, Show } from '../data/catalog';
import { MediaImage } from './MediaImage';

interface ShowDetailModalProps {
  show: Show | null;
  isSaved: boolean;
  isPremiumMember: boolean;
  onClose: () => void;
  onToggleMyList: (showId: string) => void;
  onPlayEpisode: (show: Show, episode: Episode) => void;
  onOpenPremium: () => void;
}

export function ShowDetailModal({
  show,
  isSaved,
  isPremiumMember,
  onClose,
  onToggleMyList,
  onPlayEpisode,
  onOpenPremium,
}: ShowDetailModalProps) {
  useEffect(() => {
    if (!show) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [show, onClose]);

  if (!show) return null;

  const firstPlayable = show.episodes[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="show-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-white/10 bg-[#161619] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close show details"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[#111113]/85 text-white border border-white/15 hover:bg-[#232329] cursor-pointer"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {/* Backdrop Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#111113]">
          <MediaImage
            src={show.backdropUrl}
            alt={`${show.title} key art`}
            fallbackTitle={show.title}
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#161619] via-[#161619]/50 to-transparent"
          />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <p className="text-xs font-semibold text-[#FDBE11]">
              {show.isOriginal ? 'Viu Original' : show.category}
              {show.simulcastNote ? ` · ${show.simulcastNote}` : ''}
            </p>
            <h2
              id="show-modal-title"
              className="mt-1 font-display text-2xl sm:text-4xl font-bold text-white [text-wrap:balance]"
            >
              {show.title}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#A1A1AA]">{show.nativeTitle}</p>
          </div>
        </div>

        {/* Metadata & Actions */}
        <div className="px-6 pb-8 pt-2 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm text-[#D4D4D8] tabular-nums">
              <span>{show.year}</span>
              <span aria-hidden="true">·</span>
              <span>{show.region}</span>
              <span aria-hidden="true">·</span>
              <span>
                {show.availableEpisodes} / {show.totalEpisodes} Episodes
              </span>
              <span aria-hidden="true">·</span>
              <span>{show.audioLanguage} Audio</span>
              <span aria-hidden="true">·</span>
              <span>{show.subtitles.join(' / ')} Sub</span>
            </div>

            <div className="flex items-center gap-3">
              {firstPlayable && (
                <button
                  type="button"
                  onClick={() => onPlayEpisode(show, firstPlayable)}
                  className="inline-flex items-center gap-2 rounded-md bg-[#FDBE11] px-4 py-2 text-sm font-bold text-[#111113] hover:bg-[#FFD043] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                  <span>Watch Ep 1</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => onToggleMyList(show.id)}
                className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-[#232329] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2C2C34] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {isSaved ? (
                  <Check className="h-4 w-4 text-[#FDBE11]" aria-hidden="true" />
                ) : (
                  <Bookmark className="h-4 w-4" aria-hidden="true" />
                )}
                <span>{isSaved ? 'Saved' : 'My List'}</span>
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <p className="text-sm leading-relaxed text-[#E4E4E7]">{show.synopsis}</p>
            </div>
            <div className="space-y-2 text-xs sm:text-sm">
              <p className="text-[#A1A1AA]">
                <span className="text-white font-medium">Cast:</span> {show.cast.join(', ')}
              </p>
              <p className="text-[#A1A1AA]">
                <span className="text-white font-medium">Director:</span> {show.director}
              </p>
              <p className="text-[#A1A1AA]">
                <span className="text-white font-medium">Genres:</span> {show.genres.join(', ')}
              </p>
            </div>
          </div>

          {/* Episodes List */}
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-white">
                Episodes ({show.episodes.length} Featured)
              </h3>
              {!isPremiumMember && (
                <button
                  type="button"
                  onClick={onOpenPremium}
                  className="text-xs font-semibold text-[#FDBE11] hover:text-[#FFD043] cursor-pointer"
                >
                  Unlock all with Viu Premium
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {show.episodes.map((ep) => {
                const locked = ep.isPremiumOnly && !isPremiumMember;
                return (
                  <button
                    key={ep.number}
                    type="button"
                    onClick={() => (locked ? onOpenPremium() : onPlayEpisode(show, ep))}
                    className="group flex items-center gap-3.5 rounded-lg border border-white/[0.06] bg-[#1D1D22] p-2.5 text-left transition-colors hover:bg-[#25252C] cursor-pointer"
                  >
                    <div className="relative aspect-video w-32 shrink-0 overflow-hidden rounded bg-[#111113]">
                      <MediaImage
                        src={ep.thumbnail}
                        alt={`${show.title} Episode ${ep.number}`}
                        fallbackTitle={`Ep ${ep.number}`}
                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                        {locked ? (
                          <Lock className="h-4 w-4 text-[#FDBE11]" aria-hidden="true" />
                        ) : (
                          <Play className="h-4 w-4 fill-current text-[#FDBE11]" aria-hidden="true" />
                        )}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-white group-hover:text-[#FDBE11] truncate">
                          Ep {ep.number} · {ep.title}
                        </span>
                        {locked && (
                          <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-[#FDBE11]">
                            Premium
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-[#A1A1AA] line-clamp-1">{ep.synopsis}</p>
                      <p className="mt-1 text-[11px] text-[#71717A] tabular-nums">
                        {ep.duration} · {ep.releaseNote}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
