'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMovieSearch } from '@/hooks/useTMDB';
import { MovieGrid } from '@/components/movie-grid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [page, setPage] = useState(1);

  const { movies, totalPages, totalResults, currentPage, isLoading, error } = useMovieSearch(activeQuery, page);

  // Reset page when search query changes
  useEffect(() => {
    setPage(1);
  }, [activeQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveQuery(searchQuery.trim());
      setPage(1);
    }
  };

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

  const clearSearch = () => {
    setSearchQuery('');
    setActiveQuery('');
    setPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Search Movies</h1>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex gap-3 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="search"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              autoFocus
            />
          </div>
          <Button type="submit" disabled={!searchQuery.trim()}>
            Search
          </Button>
          {activeQuery && (
            <Button type="button" variant="outline" onClick={clearSearch}>
              Clear
            </Button>
          )}
        </form>
      </div>

      {/* Search Results */}
      {activeQuery && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Search Results for &quot;{activeQuery}&quot;
          </h2>
          {!isLoading && totalResults > 0 && (
            <p className="text-muted-foreground">
              Found {totalResults.toLocaleString()} movies
            </p>
          )}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <p className="text-destructive mb-2">Search failed</p>
          <p className="text-muted-foreground text-sm">{error.message}</p>
        </div>
      )}

      {/* No Query State */}
      {!activeQuery && !isLoading && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Search for Movies</h3>
          <p className="text-muted-foreground">
            Enter a movie title in the search box above to find your favorite films.
          </p>
        </div>
      )}

      {/* No Results State */}
      {activeQuery && !isLoading && !error && movies.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No movies found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms or check for typos.
          </p>
          <Button variant="outline" onClick={clearSearch}>
            Clear Search
          </Button>
        </div>
      )}

      {/* Movies Grid */}
      {activeQuery && !error && (
        <>
          <MovieGrid 
            movies={movies} 
            isLoading={isLoading} 
            className="mb-8"
            skeletonCount={20}
          />

          {/* Pagination */}
          {!isLoading && movies.length > 0 && totalPages > 1 && (
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

      {/* Search Tips */}
      {!activeQuery && (
        <div className="max-w-2xl mx-auto mt-12">
          <h3 className="text-lg font-semibold mb-4">Search Tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Try searching for movie titles, actor names, or directors</li>
            <li>• Use specific keywords for better results</li>
            <li>• Check spelling and try alternative spellings</li>
            <li>• Browse our categories if you&apos;re looking for inspiration</li>
          </ul>
        </div>
      )}
    </div>
  );
}

function SearchPageFallback() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Search Movies</h1>
        
        {/* Search Form Skeleton */}
        <div className="flex gap-3 max-w-2xl">
          <div className="relative flex-1">
            <div className="h-10 bg-muted rounded-md animate-pulse" />
          </div>
          <div className="h-10 w-20 bg-muted rounded-md animate-pulse" />
        </div>
      </div>

      {/* Search Tips */}
      <div className="text-center py-12">
        <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Search for Movies</h3>
        <p className="text-muted-foreground">
          Loading search functionality...
        </p>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageFallback />}>
      <SearchContent />
    </Suspense>
  );
}