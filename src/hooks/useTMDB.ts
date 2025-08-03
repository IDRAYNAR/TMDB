import useSWR from 'swr';
import {
  getMoviesByCategory,
  getMovieDetails,
  getMovieVideos,
  getMovieCredits,
  searchMovies,
  getMovieRecommendations,
  getSimilarMovies
} from '@/lib/tmdb';
import { MoviesResponse, MovieDetails, VideosResponse, CreditsResponse, MovieCategory } from '@/types/tmdb';

// SWR Configuration
const defaultConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  errorRetryCount: 3,
  errorRetryInterval: 5000,
};

// Hook for fetching movies by category
export const useMoviesByCategory = (category: MovieCategory, page: number = 1) => {
  const { data, error, isLoading, mutate } = useSWR<MoviesResponse>(
    [`movies/${category}`, page],
    () => getMoviesByCategory(category, page),
    defaultConfig
  );

  return {
    movies: data?.results || [],
    totalPages: data?.total_pages || 0,
    totalResults: data?.total_results || 0,
    currentPage: data?.page || 1,
    isLoading,
    error,
    mutate
  };
};

// Hook for popular movies
export const usePopularMovies = (page: number = 1) => {
  return useMoviesByCategory('popular', page);
};

// Hook for top rated movies
export const useTopRatedMovies = (page: number = 1) => {
  return useMoviesByCategory('top_rated', page);
};

// Hook for upcoming movies
export const useUpcomingMovies = (page: number = 1) => {
  return useMoviesByCategory('upcoming', page);
};

// Hook for now playing movies
export const useNowPlayingMovies = (page: number = 1) => {
  return useMoviesByCategory('now_playing', page);
};

// Hook for movie details
export const useMovieDetails = (id: number | null) => {
  const { data, error, isLoading, mutate } = useSWR<MovieDetails>(
    id ? `movie/${id}` : null,
    () => id ? getMovieDetails(id) : null,
    defaultConfig
  );

  return {
    movie: data,
    isLoading,
    error,
    mutate
  };
};

// Hook for movie videos
export const useMovieVideos = (id: number | null) => {
  const { data, error, isLoading, mutate } = useSWR<VideosResponse>(
    id ? `movie/${id}/videos` : null,
    () => id ? getMovieVideos(id) : null,
    defaultConfig
  );

  return {
    videos: data?.results || [],
    isLoading,
    error,
    mutate
  };
};

// Hook for movie credits
export const useMovieCredits = (id: number | null) => {
  const { data, error, isLoading, mutate } = useSWR<CreditsResponse>(
    id ? `movie/${id}/credits` : null,
    () => id ? getMovieCredits(id) : null,
    defaultConfig
  );

  return {
    cast: data?.cast || [],
    crew: data?.crew || [],
    isLoading,
    error,
    mutate
  };
};

// Hook for movie search
export const useMovieSearch = (query: string, page: number = 1) => {
  const shouldFetch = query.trim().length > 0;
  
  const { data, error, isLoading, mutate } = useSWR<MoviesResponse>(
    shouldFetch ? [`search/movie`, query, page] : null,
    () => searchMovies(query, page),
    {
      ...defaultConfig,
      keepPreviousData: true,
    }
  );

  return {
    movies: data?.results || [],
    totalPages: data?.total_pages || 0,
    totalResults: data?.total_results || 0,
    currentPage: data?.page || 1,
    isLoading,
    error,
    mutate
  };
};

// Hook for movie recommendations
export const useMovieRecommendations = (id: number | null, page: number = 1) => {
  const { data, error, isLoading, mutate } = useSWR<MoviesResponse>(
    id ? [`movie/${id}/recommendations`, page] : null,
    () => id ? getMovieRecommendations(id, page) : null,
    defaultConfig
  );

  return {
    movies: data?.results || [],
    totalPages: data?.total_pages || 0,
    totalResults: data?.total_results || 0,
    currentPage: data?.page || 1,
    isLoading,
    error,
    mutate
  };
};

// Hook for similar movies
export const useSimilarMovies = (id: number | null, page: number = 1) => {
  const { data, error, isLoading, mutate } = useSWR<MoviesResponse>(
    id ? [`movie/${id}/similar`, page] : null,
    () => id ? getSimilarMovies(id, page) : null,
    defaultConfig
  );

  return {
    movies: data?.results || [],
    totalPages: data?.total_pages || 0,
    totalResults: data?.total_results || 0,
    currentPage: data?.page || 1,
    isLoading,
    error,
    mutate
  };
};

// Hook for multiple categories (useful for dashboard)
export const useMovieCategories = () => {
  const popular = usePopularMovies(1);
  const topRated = useTopRatedMovies(1);
  const upcoming = useUpcomingMovies(1);
  const nowPlaying = useNowPlayingMovies(1);

  return {
    popular,
    topRated,
    upcoming,
    nowPlaying,
    isLoading: popular.isLoading || topRated.isLoading || upcoming.isLoading || nowPlaying.isLoading,
    hasErrors: !!(popular.error || topRated.error || upcoming.error || nowPlaying.error)
  };
};