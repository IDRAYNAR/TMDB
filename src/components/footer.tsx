import Link from 'next/link';
import { Film, Github, ExternalLink } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center space-x-2">
              <Film className="h-6 w-6" />
              <span className="text-xl font-bold">TMDB Catalog</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Discover and explore movies using The Movie Database API. Built with Next.js and TypeScript.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold mb-3">Browse</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/popular" className="text-muted-foreground hover:text-foreground transition-colors">
                  Popular Movies
                </Link>
              </li>
              <li>
                <Link href="/top-rated" className="text-muted-foreground hover:text-foreground transition-colors">
                  Top Rated
                </Link>
              </li>
              <li>
                <Link href="/upcoming" className="text-muted-foreground hover:text-foreground transition-colors">
                  Upcoming
                </Link>
              </li>
              <li>
                <Link href="/now-playing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Now Playing
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold mb-3">Features</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search" className="text-muted-foreground hover:text-foreground transition-colors">
                  Movie Search
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground">Movie Details</span>
              </li>
              <li>
                <span className="text-muted-foreground">Cast & Crew</span>
              </li>
              <li>
                <span className="text-muted-foreground">Trailers & Videos</span>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-3">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://www.themoviedb.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  TMDB API
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  Source Code
                  <Github className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {currentYear} TMDB Catalog. Built with Next.js and Tailwind CSS.
          </div>
          
          <div className="text-sm text-muted-foreground">
            This product uses the TMDB API but is not endorsed or certified by{' '}
            <a 
              href="https://www.themoviedb.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              TMDB
            </a>
            .
          </div>
        </div>
      </div>
    </footer>
  );
}