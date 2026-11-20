import { useEffect, useState } from 'react';
import {
  ChevronRight,
  Captions,
  Lock,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { Episode, Show, SubtitleLanguage } from '../data/catalog';
import { MediaImage } from './MediaImage';

interface VideoPlayerModalProps {
  show: Show | null;
  episode: Episode | null;
  isPremiumMember: boolean;
  onClose: () => void;
  onSelectEpisode: (episode: Episode) => void;
  onProgressUpdate: (showId: string, episodeNumber: number, percent: number) => void;
  onOpenPremium: () => void;
}

type QualityOption = '1080p Full HD' | '720p HD' | '480p SD';

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function VideoPlayerModal({
  show,
  episode,
  isPremiumMember,
  onClose,
  onSelectEpisode,
  onProgressUpdate,
  onOpenPremium,
}: VideoPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(14);
  const [subtitleLang, setSubtitleLang] = useState<SubtitleLanguage | 'Off'>('English');
  const [quality, setQuality] = useState<QualityOption>('1080p Full HD');

  useEffect(() => {
    if (!show || !episode) return;
    setCurrentTime(14);
    setIsPlaying(true);
    if (!show.subtitles.includes('English')) {
      setSubtitleLang(show.subtitles[0] ?? 'Off');
    } else {
      setSubtitleLang('English');
    }
  }, [show?.id, episode?.number]);

  useEffect(() => {
    if (!show || !episode) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [show, episode, onClose]);

  useEffect(() => {
    if (!show || !episode || !isPlaying) return;
    const timer = window.setInterval(() => {
      setCurrentTime((prev) => Math.min(episode.durationSeconds, prev + 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [show, episode, isPlaying]);

  useEffect(() => {
    if (!show || !episode) return;
    const pct = Math.round((currentTime / episode.durationSeconds) * 100);
    onProgressUpdate(show.id, episode.number, pct);
  }, [currentTime, show, episode, onProgressUpdate]);

  if (!show || !episode) return null;

  const progressPct = Math.min(100, (currentTime / episode.durationSeconds) * 100);
  const nextEpisode = show.episodes.find((ep) => ep.number === episode.number + 1);
  const nextLocked = nextEpisode ? nextEpisode.isPremiumOnly && !isPremiumMember : false;

  const subtitleLines =
    subtitleLang === 'Off'
      ? []
      : episode.sampleSubtitles[subtitleLang] ?? episode.sampleSubtitles.English;
  const activeSubtitle =
    subtitleLines.length > 0
      ? subtitleLines[Math.floor(currentTime / 6) % subtitleLines.length]
      : '';

  const handleSeek = (val: number) => {
    const clamped = Math.max(0, Math.min(episode.durationSeconds, val));
    setCurrentTime(clamped);
    onProgressUpdate(
      show.id,
      episode.number,
      Math.round((clamped / episode.durationSeconds) * 100)
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Playing ${show.title} Episode ${episode.number}`}
      className="fixed inset-0 z-50 flex flex-col bg-[#0A0A0C]"
    >
      {/* Top Player Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-[#111113] px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="text-xs font-medium text-[#FDBE11] truncate">
            {show.title} · Episode {episode.number}
          </p>
          <h2 className="font-display text-sm sm:text-base font-bold text-white truncate">
            {episode.title}
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Exit player"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/15 bg-[#1A1A1E] text-white hover:bg-[#232329] cursor-pointer"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* Main Viewport + Episode Sidebar */}
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        {/* Video Stage */}
        <div className="relative flex flex-1 flex-col justify-between bg-black">
          <div className="relative flex-1 overflow-hidden">
            <MediaImage
              src={episode.thumbnail}
              alt={`${show.title} Episode ${episode.number} stream`}
              fallbackTitle={show.title}
              className={`h-full w-full object-cover transition-transform duration-1000 ${
                isPlaying ? 'scale-[1.02]' : 'scale-100 brightness-75'
              }`}
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30"
            />

            {/* Center Play/Pause click area */}
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              className="absolute inset-0 flex items-center justify-center cursor-pointer focus-visible:outline-none"
            >
              {!isPlaying && (
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FDBE11] text-[#111113] shadow-xl">
                  <Play className="h-7 w-7 fill-current ml-0.5" />
                </span>
              )}
            </button>

            {/* Synced Multi-language Subtitle Overlay */}
            {activeSubtitle && (
              <div className="pointer-events-none absolute inset-x-4 bottom-8 flex justify-center">
                <p className="max-w-2xl rounded bg-black/80 px-4 py-1.5 text-center text-sm sm:text-lg font-medium text-white shadow-lg">
                  {activeSubtitle}
                </p>
              </div>
            )}
          </div>

          {/* Player Controls Bar */}
          <div className="border-t border-white/10 bg-[#111113] px-4 py-3 sm:px-6">
            {/* Scrubber */}
            <div className="mb-3 flex items-center gap-3">
              <span className="text-xs font-mono text-[#D4D4D8] tabular-nums w-12">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={episode.durationSeconds}
                value={currentTime}
                onChange={(e) => handleSeek(Number(e.target.value))}
                aria-label="Seek video timeline"
                className="h-1.5 flex-1 cursor-pointer accent-[#FDBE11]"
                style={{
                  background: `linear-gradient(to right, #FDBE11 ${progressPct}%, #2C2C34 ${progressPct}%)`,
                }}
              />
              <span className="text-xs font-mono text-[#A1A1AA] tabular-nums w-12 text-right">
                {formatTime(episode.durationSeconds)}
              </span>
            </div>

            {/* Playback & Language Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying((p) => !p)}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-[#FDBE11] text-[#111113] hover:bg-[#FFD043] cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4 fill-current" />
                  ) : (
                    <Play className="h-4 w-4 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleSeek(currentTime - 10)}
                  aria-label="Rewind 10 seconds"
                  className="flex h-9 px-2.5 items-center gap-1 rounded-md border border-white/10 bg-[#1A1A1E] text-xs font-medium text-white hover:bg-[#232329] cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>10s</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSeek(currentTime + 10)}
                  aria-label="Forward 10 seconds"
                  className="flex h-9 px-2.5 items-center gap-1 rounded-md border border-white/10 bg-[#1A1A1E] text-xs font-medium text-white hover:bg-[#232329] cursor-pointer"
                >
                  <span>10s</span>
                  <RotateCw className="h-3.5 w-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsMuted((m) => !m)}
                  aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-[#1A1A1E] text-white hover:bg-[#232329] cursor-pointer"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <Captions className="h-4 w-4 text-[#A1A1AA]" aria-hidden="true" />
                  <select
                    aria-label="Subtitle language"
                    value={subtitleLang}
                    onChange={(e) =>
                      setSubtitleLang(e.target.value as SubtitleLanguage | 'Off')
                    }
                    className="rounded-md border border-white/10 bg-[#1A1A1E] px-2.5 py-1.5 text-xs font-medium text-white focus:border-[#FDBE11] focus:outline-none cursor-pointer"
                  >
                    {show.subtitles.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                    <option value="Off">Subtitles Off</option>
                  </select>
                </div>

                <select
                  aria-label="Stream video quality"
                  value={quality}
                  onChange={(e) => setQuality(e.target.value as QualityOption)}
                  className="rounded-md border border-white/10 bg-[#1A1A1E] px-2.5 py-1.5 text-xs font-medium text-white focus:border-[#FDBE11] focus:outline-none cursor-pointer"
                >
                  <option value="1080p Full HD">1080p Full HD</option>
                  <option value="720p HD">720p HD</option>
                  <option value="480p SD">480p SD</option>
                </select>

                {nextEpisode && (
                  <button
                    type="button"
                    onClick={() =>
                      nextLocked ? onOpenPremium() : onSelectEpisode(nextEpisode)
                    }
                    className="inline-flex items-center gap-1 rounded-md border border-[#FDBE11]/40 bg-[#1A1A1E] px-3 py-1.5 text-xs font-semibold text-[#FDBE11] hover:bg-[#232329] whitespace-nowrap cursor-pointer"
                  >
                    {nextLocked && <Lock className="h-3 w-3" aria-hidden="true" />}
                    <span>Next: Ep {nextEpisode.number}</span>
                    <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Episode Queue Drawer */}
        <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-white/10 bg-[#161619] overflow-y-auto max-h-56 lg:max-h-none p-4">
          <h3 className="font-display text-sm font-bold text-white mb-3">
            Up Next · {show.episodes.length} Episodes
          </h3>
          <div className="space-y-2">
            {show.episodes.map((ep) => {
              const isCurrent = ep.number === episode.number;
              const locked = ep.isPremiumOnly && !isPremiumMember;
              return (
                <button
                  key={ep.number}
                  type="button"
                  onClick={() => (locked ? onOpenPremium() : onSelectEpisode(ep))}
                  className={`flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors cursor-pointer ${
                    isCurrent
                      ? 'bg-[#232329] border border-[#FDBE11]/50'
                      : 'hover:bg-[#1E1E24] border border-transparent'
                  }`}
                >
                  <div className="relative aspect-video w-24 shrink-0 overflow-hidden rounded bg-[#111113]">
                    <MediaImage
                      src={ep.thumbnail}
                      alt={`Episode ${ep.number}`}
                      fallbackTitle={`Ep ${ep.number}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`text-xs font-semibold truncate ${
                          isCurrent ? 'text-[#FDBE11]' : 'text-white'
                        }`}
                      >
                        Ep {ep.number} · {ep.title}
                      </span>
                      {locked && <Lock className="h-3 w-3 shrink-0 text-[#FDBE11]" />}
                    </div>
                    <p className="mt-0.5 text-[11px] text-[#A1A1AA] tabular-nums">
                      {ep.duration}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
