'use client';

import { useState } from 'react';
import { useTopRatedMovies } from '@/hooks/useTMDB';
import { MovieGrid } from '@/components/movie-grid';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TopRatedMoviesPage() {
  const [page, setPage] = useState(1);
  const { movies, totalPages, currentPage, isLoading, error } = useTopRatedMovies(page);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Top Rated Movies</h1>
        <p className="text-muted-foreground">
          Explore the highest-rated movies of all time, as voted by movie enthusiasts worldwide.
        </p>
      </div>

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <p className="text-destructive mb-2">Failed to load top rated movies</p>
          <p className="text-muted-foreground text-sm">{error.message}</p>
        </div>
      )}

      {/* Movies Grid */}
      {!error && (
        <>
          <MovieGrid 
            movies={movies} 
            isLoading={isLoading} 
            priority={page === 1}
            className="mb-8"
          />

          {/* Pagination */}
          {!isLoading && movies.length > 0 && (
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                onClick={handlePrevPage}
                disabled={page <= 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Page</span>
                <span className="font-medium">{currentPage}</span>
                <span>of</span>
                <span className="font-medium">{totalPages.toLocaleString()}</span>
              </div>

              <Button
                variant="outline"
                onClick={handleNextPage}
                disabled={page >= totalPages}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}