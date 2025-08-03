import { MoviesResponse, MovieDetails, VideosResponse, CreditsResponse, MovieCategory, TMDBError } from '@/types/tmdb';

// TMDB API Configuration
const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

if (!TMDB_API_KEY) {
  console.warn('TMDB API key is not configured. Please add NEXT_PUBLIC_TMDB_API_KEY to your environment variables.');
}

// Helper function to build API URLs
const buildApiUrl = (endpoint: string, params?: Record<string, string | number>) => {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', TMDB_API_KEY || '');
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });
  }
  
  return url.toString();
};

// Generic fetch function with error handling
const fetchFromTMDB = async <T>(url: string): Promise<T> => {
  if (!TMDB_API_KEY) {
    throw new Error('TMDB API key is not configured');
  }

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData: TMDBError = await response.json();
      throw new Error(`TMDB API Error: ${errorData.status_message || 'Unknown error'}`);
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch data from TMDB');
  }
};

// Image URL builders
export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/placeholder-movie.svg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getPosterUrl = (path: string | null, size: 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'): string => {
  return getImageUrl(path, size);
};

export const getBackdropUrl = (path: string | null, size: 'w300' | 'w780' | 'w1280' | 'original' = 'w1280'): string => {
  return getImageUrl(path, size);
};

export const getProfileUrl = (path: string | null, size: 'w45' | 'w185' | 'h632' | 'original' = 'w185'): string => {
  return getImageUrl(path, size);
};

// API Functions
export const getMoviesByCategory = async (category: MovieCategory, page: number = 1): Promise<MoviesResponse> => {
  const url = buildApiUrl(`/movie/${category}`, { page });
  return fetchFromTMDB<MoviesResponse>(url);
};

export const getPopularMovies = async (page: number = 1): Promise<MoviesResponse> => {
  return getMoviesByCategory('popular', page);
};

export const getTopRatedMovies = async (page: number = 1): Promise<MoviesResponse> => {
  return getMoviesByCategory('top_rated', page);
};

export const getUpcomingMovies = async (page: number = 1): Promise<MoviesResponse> => {
  return getMoviesByCategory('upcoming', page);
};

export const getNowPlayingMovies = async (page: number = 1): Promise<MoviesResponse> => {
  return getMoviesByCategory('now_playing', page);
};

export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  const url = buildApiUrl(`/movie/${id}`);
  return fetchFromTMDB<MovieDetails>(url);
};

export const getMovieVideos = async (id: number): Promise<VideosResponse> => {
  const url = buildApiUrl(`/movie/${id}/videos`);
  return fetchFromTMDB<VideosResponse>(url);
};

export const getMovieCredits = async (id: number): Promise<CreditsResponse> => {
  const url = buildApiUrl(`/movie/${id}/credits`);
  return fetchFromTMDB<CreditsResponse>(url);
};

export const searchMovies = async (query: string, page: number = 1): Promise<MoviesResponse> => {
  const url = buildApiUrl('/search/movie', { query, page });
  return fetchFromTMDB<MoviesResponse>(url);
};

export const getMovieRecommendations = async (id: number, page: number = 1): Promise<MoviesResponse> => {
  const url = buildApiUrl(`/movie/${id}/recommendations`, { page });
  return fetchFromTMDB<MoviesResponse>(url);
};

export const getSimilarMovies = async (id: number, page: number = 1): Promise<MoviesResponse> => {
  const url = buildApiUrl(`/movie/${id}/similar`, { page });
  return fetchFromTMDB<MoviesResponse>(url);
};

// Utility functions
export const formatReleaseDate = (dateString: string): string => {
  if (!dateString) return 'TBA';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
};

export const formatRuntime = (minutes: number | null): string => {
  if (!minutes) return 'N/A';
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${remainingMinutes}m`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
};

export const formatVoteAverage = (voteAverage: number): string => {
  return voteAverage.toFixed(1);
};

export const getYearFromDate = (dateString: string): string => {
  if (!dateString) return '';
  return new Date(dateString).getFullYear().toString();
};