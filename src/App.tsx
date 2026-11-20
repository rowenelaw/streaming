import { useCallback, useMemo, useState } from 'react';
import { ContentRail } from './components/ContentRail';
import { DiscoveryBar, RegionFilter, SubtitleFilter } from './components/DiscoveryBar';
import { Footer } from './components/Footer';
import { HeroCarousel } from './components/HeroCarousel';
import { PremiumHighlights } from './components/PremiumHighlights';
import { PremiumModal } from './components/PremiumModal';
import { ShowDetailModal } from './components/ShowDetailModal';
import { SignInModal } from './components/SignInModal';
import { NavTab, TopBar } from './components/TopBar';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { Episode, HERO_SLIDE_IDS, SHOW_CATALOG, Show } from './data/catalog';

export default function App() {
  const [activeNav, setActiveNav] = useState<NavTab>('Home');
  const [regionFilter, setRegionFilter] = useState<RegionFilter>('All');
  const [subtitleFilter, setSubtitleFilter] = useState<SubtitleFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [myListIds, setMyListIds] = useState<string[]>([
    'autumn-over-hangang',
    'running-man-sg-special',
  ]);
  const [progressMap, setProgressMap] = useState<
    Record<string, { episodeNumber: number; percent: number }>
  >({
    'seoul-ward-24': { episodeNumber: 3, percent: 62 },
    'celadon-mist-chronicles': { episodeNumber: 7, percent: 38 },
  });

  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [playerState, setPlayerState] = useState<{ show: Show; episode: Episode } | null>(null);
  const [isPremiumOpen, setIsPremiumOpen] = useState(false);
  const [isPremiumMember, setIsPremiumMember] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [signedInEmail, setSignedInEmail] = useState<string | null>(null);

  const heroSlides = useMemo(
    () =>
      HERO_SLIDE_IDS.map((id) => SHOW_CATALOG.find((s) => s.id === id)).filter(
        (s): s is Show => Boolean(s)
      ),
    []
  );

  const toggleMyList = useCallback((showId: string) => {
    setMyListIds((prev) =>
      prev.includes(showId) ? prev.filter((id) => id !== showId) : [...prev, showId]
    );
  }, []);

  const handleProgressUpdate = useCallback(
    (showId: string, episodeNumber: number, percent: number) => {
      setProgressMap((prev) => ({
        ...prev,
        [showId]: { episodeNumber, percent },
      }));
    },
    []
  );

  const handlePlayShow = useCallback(
    (show: Show, episodeNumber?: number) => {
      const targetNum = episodeNumber ?? progressMap[show.id]?.episodeNumber ?? 1;
      const ep =
        show.episodes.find((e) => e.number === targetNum) ?? show.episodes[0];
      if (!ep) return;
      if (ep.isPremiumOnly && !isPremiumMember) {
        setIsPremiumOpen(true);
        return;
      }
      setSelectedShow(null);
      setPlayerState({ show, episode: ep });
    },
    [progressMap, isPremiumMember]
  );

  const handlePlayEpisode = useCallback(
    (show: Show, episode: Episode) => {
      if (episode.isPremiumOnly && !isPremiumMember) {
        setIsPremiumOpen(true);
        return;
      }
      setSelectedShow(null);
      setPlayerState({ show, episode });
    },
    [isPremiumMember]
  );

  const handleSelectNav = useCallback((tab: NavTab) => {
    setActiveNav(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleResetFilters = useCallback(() => {
    setRegionFilter('All');
    setSubtitleFilter('All');
    setSearchQuery('');
  }, []);

  const hasActiveFilters =
    regionFilter !== 'All' || subtitleFilter !== 'All' || searchQuery.trim().length > 0;

  const filteredCatalog = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return SHOW_CATALOG.filter((show) => {
      if (activeNav === 'K-Dramas' && show.category !== 'K-Drama') return false;
      if (activeNav === 'Variety' && show.category !== 'Variety') return false;
      if (activeNav === 'C-Dramas' && show.category !== 'C-Drama') return false;
      if (activeNav === 'My List' && !myListIds.includes(show.id)) return false;

      if (regionFilter === 'Free' && show.isPremium) return false;
      if (
        regionFilter !== 'All' &&
        regionFilter !== 'Free' &&
        show.region !== regionFilter
      ) {
        return false;
      }

      if (subtitleFilter !== 'All' && !show.subtitles.includes(subtitleFilter)) {
        return false;
      }

      if (q) {
        const haystack = [
          show.title,
          show.nativeTitle,
          show.region,
          show.category,
          ...show.genres,
          ...show.cast,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [activeNav, myListIds, regionFilter, subtitleFilter, searchQuery]);

  const top10Shows = useMemo(
    () =>
      SHOW_CATALOG.filter((s) => typeof s.topRank === 'number').sort(
        (a, b) => (a.topRank ?? 99) - (b.topRank ?? 99)
      ),
    []
  );

  const viuOriginals = useMemo(
    () => SHOW_CATALOG.filter((s) => s.isOriginal),
    []
  );

  const freshReleases = useMemo(
    () => SHOW_CATALOG.slice(0, 6),
    []
  );

  const kVarietyShows = useMemo(
    () => SHOW_CATALOG.filter((s) => s.category === 'Variety'),
    []
  );

  const regionalHits = useMemo(
    () =>
      SHOW_CATALOG.filter(
        (s) => s.region === 'China' || s.region === 'Thailand' || s.region === 'Japan'
      ),
    []
  );

  const isFilteredOrTabView = activeNav !== 'Home' || hasActiveFilters;

  return (
    <div className="min-h-screen bg-[#111113] text-[#F5F5F7] flex flex-col">
      <TopBar
        activeNav={activeNav}
        onSelectNav={handleSelectNav}
        onOpenPremium={() => setIsPremiumOpen(true)}
        isPremiumMember={isPremiumMember}
        myListCount={myListIds.length}
      />

      <main className="flex-1">
        {activeNav === 'Home' && !hasActiveFilters && (
          <HeroCarousel
            slides={heroSlides}
            myListIds={myListIds}
            signedInEmail={signedInEmail}
            onSignInClick={() => setIsSignInOpen(true)}
            onSelectShow={setSelectedShow}
            onToggleMyList={toggleMyList}
          />
        )}

        <DiscoveryBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          regionFilter={regionFilter}
          onRegionChange={setRegionFilter}
          subtitleFilter={subtitleFilter}
          onSubtitleChange={setSubtitleFilter}
          resultCount={filteredCatalog.length}
          hasActiveFilters={hasActiveFilters}
          onResetFilters={handleResetFilters}
        />

        {isFilteredOrTabView ? (
          <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  {activeNav === 'Home' ? 'Search & Filter Results' : activeNav}
                </h1>
                <p className="mt-1 text-sm text-[#A1A1AA] tabular-nums">
                  {filteredCatalog.length}{' '}
                  {filteredCatalog.length === 1 ? 'title' : 'titles'} available
                </p>
              </div>
              {activeNav !== 'Home' && (
                <button
                  type="button"
                  onClick={() => handleSelectNav('Home')}
                  className="text-xs font-semibold text-[#FDBE11] hover:text-[#FFD043] cursor-pointer"
                >
                  Back to Home
                </button>
              )}
            </div>

            {filteredCatalog.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-[#161619] px-6 py-14 text-center">
                <p className="font-display text-lg font-semibold text-white">
                  {activeNav === 'My List'
                    ? 'Your watchlist is currently empty'
                    : 'No titles match your current filters'}
                </p>
                <p className="mt-1.5 text-sm text-[#A1A1AA]">
                  {activeNav === 'My List'
                    ? 'Bookmark dramas or variety shows anywhere in Viu to pick them up here.'
                    : 'Try clearing your search query or switching back to all regions.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    handleResetFilters();
                    setActiveNav('Home');
                  }}
                  className="mt-5 rounded-md bg-[#FDBE11] px-4 py-2 text-sm font-bold text-[#111113] hover:bg-[#FFD043] cursor-pointer"
                >
                  Browse Full Catalog
                </button>
              </div>
            ) : (
              <ContentRail
                title="Matching Titles"
                shows={filteredCatalog}
                variant="poster"
                defaultExpanded
                myListIds={myListIds}
                progressMap={progressMap}
                onSelectShow={setSelectedShow}
                onPlayShow={handlePlayShow}
                onToggleMyList={toggleMyList}
              />
            )}
          </section>
        ) : (
          <div className="pb-6">
            <PremiumHighlights
              isPremiumMember={isPremiumMember}
              onOpenPremium={() => setIsPremiumOpen(true)}
            />

            <ContentRail
              id="top-10"
              title="Top 10 in Singapore"
              subtitle="Most-watched dramas and variety hits this week"
              shows={top10Shows}
              variant="top10"
              myListIds={myListIds}
              progressMap={progressMap}
              onSelectShow={setSelectedShow}
              onPlayShow={handlePlayShow}
              onToggleMyList={toggleMyList}
            />

            <ContentRail
              id="fresh-releases"
              title="Fresh Releases & Simulcasts"
              subtitle="New episodes streaming with English & Chinese subtitles"
              shows={freshReleases}
              variant="episode"
              myListIds={myListIds}
              progressMap={progressMap}
              onSelectShow={setSelectedShow}
              onPlayShow={handlePlayShow}
              onToggleMyList={toggleMyList}
            />

            <ContentRail
              id="viu-originals"
              title="Viu Originals"
              subtitle="Exclusive productions crafted for Asian audiences"
              shows={viuOriginals}
              variant="poster"
              myListIds={myListIds}
              progressMap={progressMap}
              onSelectShow={setSelectedShow}
              onPlayShow={handlePlayShow}
              onToggleMyList={toggleMyList}
            />

            <ContentRail
              id="variety-hits"
              title="Korean Variety Hits"
              subtitle="Weekly laughs, music duels, and celebrity challenges"
              shows={kVarietyShows}
              variant="poster"
              myListIds={myListIds}
              progressMap={progressMap}
              onSelectShow={setSelectedShow}
              onPlayShow={handlePlayShow}
              onToggleMyList={toggleMyList}
            />

            <ContentRail
              id="asian-picks"
              title="C-Dramas, Thai & Anime Picks"
              subtitle="Curated stories from Mainland China, Bangkok, and Tokyo"
              shows={regionalHits}
              variant="poster"
              myListIds={myListIds}
              progressMap={progressMap}
              onSelectShow={setSelectedShow}
              onPlayShow={handlePlayShow}
              onToggleMyList={toggleMyList}
            />
          </div>
        )}
      </main>

      <Footer
        onSelectNav={handleSelectNav}
        onOpenPremium={() => setIsPremiumOpen(true)}
      />

      <ShowDetailModal
        show={selectedShow}
        isSaved={selectedShow ? myListIds.includes(selectedShow.id) : false}
        isPremiumMember={isPremiumMember}
        onClose={() => setSelectedShow(null)}
        onToggleMyList={toggleMyList}
        onPlayEpisode={handlePlayEpisode}
        onOpenPremium={() => {
          setSelectedShow(null);
          setIsPremiumOpen(true);
        }}
      />

      <VideoPlayerModal
        show={playerState?.show ?? null}
        episode={playerState?.episode ?? null}
        isPremiumMember={isPremiumMember}
        onClose={() => setPlayerState(null)}
        onSelectEpisode={(ep) =>
          playerState && setPlayerState({ show: playerState.show, episode: ep })
        }
        onProgressUpdate={handleProgressUpdate}
        onOpenPremium={() => {
          setPlayerState(null);
          setIsPremiumOpen(true);
        }}
      />

      <PremiumModal
        isOpen={isPremiumOpen}
        isPremiumMember={isPremiumMember}
        onClose={() => setIsPremiumOpen(false)}
        onActivatePremium={() => setIsPremiumMember(true)}
      />

      <SignInModal
        isOpen={isSignInOpen}
        signedInEmail={signedInEmail}
        onClose={() => setIsSignInOpen(false)}
        onSignIn={(email) => setSignedInEmail(email)}
        onSignOut={() => setSignedInEmail(null)}
      />
    </div>
  );
}
