'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/tmdb';
import { getPosterUrl, formatVoteAverage, getYearFromDate } from '@/lib/tmdb';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar, ImageOff } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  priority?: boolean;
  className?: string;
}

export function MovieCard({ movie, priority = false, className = '' }: MovieCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const posterUrl = getPosterUrl(movie.poster_path);
  const year = getYearFromDate(movie.release_date);
  const rating = formatVoteAverage(movie.vote_average);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <Link href={`/movie/${movie.id}`} className={`group block ${className}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02]">
        <CardContent className="p-0">
          {/* Movie Poster */}
          <div className="relative aspect-[2/3] bg-muted overflow-hidden">
            {!imageError ? (
              <>
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
                    imageLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  priority={priority}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {imageLoading && (
                  <div className="absolute inset-0 bg-muted animate-pulse" />
                )}
              </>
            ) : (
              <div className="absolute inset-0 bg-muted flex items-center justify-center">
                <ImageOff className="w-12 h-12 text-muted-foreground" />
              </div>
            )}
            
            {/* Rating Badge */}
            {movie.vote_average > 0 && (
              <div className="absolute top-2 right-2">
                <Badge 
                  variant="secondary" 
                  className="bg-black/70 text-white border-0 backdrop-blur-sm"
                >
                  <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                  {rating}
                </Badge>
              </div>
            )}

            {/* Release Year Badge */}
            {year && (
              <div className="absolute top-2 left-2">
                <Badge 
                  variant="outline" 
                  className="bg-black/70 text-white border-white/20 backdrop-blur-sm"
                >
                  <Calendar className="w-3 h-3 mr-1" />
                  {year}
                </Badge>
              </div>
            )}
          </div>

          {/* Movie Info */}
          <div className="p-4">
            <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {movie.title}
            </h3>
            
            {movie.overview && (
              <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                {movie.overview}
              </p>
            )}

            {/* Additional Info */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <div className="flex items-center text-xs text-muted-foreground">
                <span>Popularity: {movie.popularity.toFixed(0)}</span>
              </div>
              
              {movie.vote_count > 0 && (
                <div className="text-xs text-muted-foreground">
                  {movie.vote_count.toLocaleString()} votes
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}