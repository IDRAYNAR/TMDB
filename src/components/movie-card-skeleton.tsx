import { Card, CardContent } from '@/components/ui/card';

export function MovieCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Poster Skeleton */}
        <div className="relative aspect-[2/3] bg-muted animate-pulse" />
        
        {/* Content Skeleton */}
        <div className="p-4 space-y-3">
          {/* Title skeleton */}
          <div className="h-5 bg-muted rounded animate-pulse" />
          <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
          
          {/* Description skeleton */}
          <div className="space-y-2">
            <div className="h-3 bg-muted rounded animate-pulse" />
            <div className="h-3 bg-muted rounded animate-pulse" />
            <div className="h-3 bg-muted rounded w-5/6 animate-pulse" />
          </div>
          
          {/* Footer skeleton */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="h-3 bg-muted rounded w-20 animate-pulse" />
            <div className="h-3 bg-muted rounded w-16 animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}