'use client';

import { MovieSection } from '@/components/movie-section';
import { useMovieCategories } from '@/hooks/useTMDB';

export default function Home() {
  const { popular, topRated, upcoming, nowPlaying, isLoading, hasErrors } = useMovieCategories();

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Discover Movies
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore the latest and greatest films from around the world. Find your next favorite movie with our comprehensive catalog.
        </p>
      </section>

      {/* Global Error State */}
      {hasErrors && !isLoading && (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Having trouble loading movies? Make sure your TMDB API key is configured.
          </p>
          <p className="text-sm text-muted-foreground">
            Add your API key to the <code className="bg-muted px-1 rounded">.env.local</code> file.
          </p>
        </div>
      )}

      {/* Movie Sections */}
      <div className="space-y-12">
        <MovieSection
          title="Popular Movies"
          movies={popular.movies}
          isLoading={popular.isLoading}
          error={popular.error}
          showMoreLink="/popular"
          priority={true}
        />

        <MovieSection
          title="Top Rated"
          movies={topRated.movies}
          isLoading={topRated.isLoading}
          error={topRated.error}
          showMoreLink="/top-rated"
        />

        <MovieSection
          title="Upcoming"
          movies={upcoming.movies}
          isLoading={upcoming.isLoading}
          error={upcoming.error}
          showMoreLink="/upcoming"
        />

        <MovieSection
          title="Now Playing"
          movies={nowPlaying.movies}
          isLoading={nowPlaying.isLoading}
          error={nowPlaying.error}
          showMoreLink="/now-playing"
        />
      </div>
    </div>
  );
}