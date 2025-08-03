'use client';

import { Movie } from '@/types/tmdb';
import { MovieCard } from './movie-card';
import { MovieCardSkeleton } from './movie-card-skeleton';

interface MovieGridProps {
  movies: Movie[];
  isLoading?: boolean;
  className?: string;
  priority?: boolean;
  skeletonCount?: number;
}

export function MovieGrid({ 
  movies, 
  isLoading = false, 
  className = '', 
  priority = false,
  skeletonCount = 20 
}: MovieGridProps) {
  if (isLoading) {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 ${className}`}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No movies found.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 ${className}`}>
      {movies.map((movie, index) => (
        <MovieCard 
          key={movie.id} 
          movie={movie} 
          priority={priority && index < 10} // Prioritize first 10 images
        />
      ))}
    </div>
  );
}