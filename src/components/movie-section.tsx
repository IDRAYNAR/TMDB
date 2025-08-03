'use client';

import Link from 'next/link';
import { Movie } from '@/types/tmdb';
import { MovieCard } from './movie-card';
import { MovieCardSkeleton } from './movie-card-skeleton';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  isLoading?: boolean;
  error?: Error | null;
  showMoreLink?: string;
  className?: string;
  priority?: boolean;
}

export function MovieSection({ 
  title, 
  movies, 
  isLoading = false, 
  error = null, 
  showMoreLink,
  className = '',
  priority = false 
}: MovieSectionProps) {
  return (
    <section className={`space-y-4 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {showMoreLink && !isLoading && !error && (
          <Button variant="ghost" asChild>
            <Link href={showMoreLink} className="flex items-center gap-2">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <p className="text-destructive mb-2">Failed to load {title.toLowerCase()}</p>
          <p className="text-muted-foreground text-sm">{error.message}</p>
        </div>
      )}

      {/* Content */}
      {!error && (
        <div className="relative">
          {/* Horizontal Scroll Container */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
            {isLoading ? (
              // Loading Skeletons
              Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="flex-none w-[200px]">
                  <MovieCardSkeleton />
                </div>
              ))
            ) : (
              // Movie Cards
              movies.slice(0, 20).map((movie, index) => (
                <div key={movie.id} className="flex-none w-[200px]">
                  <MovieCard 
                    movie={movie} 
                    priority={priority && index < 5} // Prioritize first 5 images
                  />
                </div>
              ))
            )}
          </div>

          {/* Gradient Fade on Right */}
          {!isLoading && movies.length > 0 && (
            <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          )}
        </div>
      )}

      {/* No Results */}
      {!isLoading && !error && movies.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No movies found in this category.</p>
        </div>
      )}
    </section>
  );
}