'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMovieDetails, useMovieVideos, useMovieCredits, useSimilarMovies } from '@/hooks/useTMDB';
import { 
  getPosterUrl, 
  getBackdropUrl, 
  getProfileUrl, 
  formatReleaseDate, 
  formatRuntime, 
  formatVoteAverage 
} from '@/lib/tmdb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MovieSection } from '@/components/movie-section';
import { 
  Calendar, 
  Clock, 
  Star, 
  ExternalLink, 
  Users, 
  Building2,
  ArrowLeft
} from 'lucide-react';

interface MovieDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function MovieDetailsPage({ params }: MovieDetailsPageProps) {
  const { id } = use(params);
  const movieId = parseInt(id);
  
  const { movie, isLoading: movieLoading, error: movieError } = useMovieDetails(movieId);
  const { videos, isLoading: videosLoading } = useMovieVideos(movieId);
  const { cast, crew, isLoading: creditsLoading } = useMovieCredits(movieId);
  const { movies: similarMovies, isLoading: similarLoading } = useSimilarMovies(movieId);

  const isLoading = movieLoading || videosLoading || creditsLoading;

  // Find trailer
  const trailer = videos.find(video => 
    video.type === 'Trailer' && 
    video.site === 'YouTube'
  ) || videos.find(video => video.site === 'YouTube');

  // Get key crew members
  const director = crew.find(person => person.job === 'Director');
  const producers = crew.filter(person => person.job === 'Producer').slice(0, 3);

  if (movieError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-destructive mb-2">Failed to load movie details</p>
          <p className="text-muted-foreground text-sm">{movieError.message}</p>
          <Button asChild className="mt-4">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading || !movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-64 md:h-96 bg-muted rounded-lg mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
            <div className="space-y-4">
              <div className="h-64 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Backdrop Header */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        {movie.backdrop_path && (
          <Image
            src={getBackdropUrl(movie.backdrop_path)}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <Button variant="secondary" size="sm" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="bg-background rounded-lg p-6 shadow-lg mb-8">
              {/* Title and Basic Info */}
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
                {movie.tagline && (
                  <p className="text-lg text-muted-foreground italic mb-4">{movie.tagline}</p>
                )}
                
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatReleaseDate(movie.release_date)}</span>
                  </div>
                  {movie.runtime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatRuntime(movie.runtime)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{formatVoteAverage(movie.vote_average)} ({movie.vote_count.toLocaleString()} votes)</span>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre) => (
                    <Badge key={genre.id} variant="secondary">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Overview */}
              {movie.overview && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">{movie.overview}</p>
                </div>
              )}

              {/* Trailer */}
              {trailer && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Trailer</h2>
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <iframe
                      src={`https://www.youtube.com/embed/${trailer.key}`}
                      title={trailer.name}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Cast */}
              {cast.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Cast</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {cast.slice(0, 12).map((actor) => (
                      <div key={actor.id} className="text-center">
                        <div className="relative aspect-[2/3] mb-2 rounded-lg overflow-hidden bg-muted">
                          {actor.profile_path ? (
                            <Image
                              src={getProfileUrl(actor.profile_path)}
                              alt={actor.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <Users className="w-12 h-12 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <p className="font-medium text-sm">{actor.name}</p>
                        <p className="text-xs text-muted-foreground">{actor.character}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Poster */}
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                  <Image
                    src={getPosterUrl(movie.poster_path)}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </CardContent>
            </Card>

            {/* Movie Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {director && (
                  <div>
                    <p className="text-sm font-medium">Director</p>
                    <p className="text-sm text-muted-foreground">{director.name}</p>
                  </div>
                )}
                
                {producers.length > 0 && (
                  <div>
                    <p className="text-sm font-medium">Producers</p>
                    <p className="text-sm text-muted-foreground">
                      {producers.map(p => p.name).join(', ')}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium">Status</p>
                  <p className="text-sm text-muted-foreground">{movie.status}</p>
                </div>

                <div>
                  <p className="text-sm font-medium">Original Language</p>
                  <p className="text-sm text-muted-foreground">{movie.original_language.toUpperCase()}</p>
                </div>

                {movie.budget > 0 && (
                  <div>
                    <p className="text-sm font-medium">Budget</p>
                    <p className="text-sm text-muted-foreground">${movie.budget.toLocaleString()}</p>
                  </div>
                )}

                {movie.revenue > 0 && (
                  <div>
                    <p className="text-sm font-medium">Revenue</p>
                    <p className="text-sm text-muted-foreground">${movie.revenue.toLocaleString()}</p>
                  </div>
                )}

                {movie.homepage && (
                  <Button asChild className="w-full">
                    <a 
                      href={movie.homepage} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Official Website
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <div className="mt-12">
            <MovieSection
              title="Similar Movies"
              movies={similarMovies}
              isLoading={similarLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
}