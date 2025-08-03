# TMDB Movie Catalog

A modern, responsive movie catalog application built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui. Discover, explore, and search for movies using The Movie Database (TMDB) API.

## 🎬 Features

- **Movie Discovery**: Browse popular, top-rated, upcoming, and now-playing movies
- **Detailed Movie Information**: View comprehensive movie details including cast, crew, trailers, and production information
- **Advanced Search**: Search for movies by title with pagination
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, accessible interface built with shadcn/ui components
- **Performance Optimized**: Fast loading with SWR data fetching and image optimization
- **Type Safety**: Fully typed with TypeScript for better development experience

## 🚀 Technologies Used

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Data Fetching**: [SWR](https://swr.vercel.app/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API**: [The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api)

## 📦 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── movie/[id]/        # Dynamic movie detail pages
│   ├── popular/           # Popular movies page
│   ├── top-rated/         # Top rated movies page
│   ├── upcoming/          # Upcoming movies page
│   ├── now-playing/       # Now playing movies page
│   ├── search/            # Search results page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/                # shadcn/ui components
│   ├── movie-card.tsx     # Movie card component
│   ├── movie-grid.tsx     # Movie grid layout
│   ├── movie-section.tsx  # Movie section with horizontal scroll
│   ├── header.tsx         # Navigation header
│   └── footer.tsx         # Site footer
├── hooks/                 # Custom React hooks
│   └── useTMDB.ts         # SWR hooks for TMDB API
├── lib/                   # Utility functions
│   ├── tmdb.ts            # TMDB API client and utilities
│   └── utils.ts           # General utilities
└── types/                 # TypeScript type definitions
    └── tmdb.ts            # TMDB API types
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- TMDB API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/IDRAYNAR/TMDB.git
   cd TMDB
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your TMDB API key:
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
   NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
   NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

4. **Get your TMDB API key**
   - Visit [The Movie Database](https://www.themoviedb.org/)
   - Create an account and go to your account settings
   - Navigate to the API section and request an API key
   - Copy your API key to the `.env.local` file

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Pages & Features

### Homepage (`/`)
- Hero section with welcome message
- Horizontal scrolling sections for different movie categories
- Quick navigation to detailed category pages

### Category Pages
- **Popular Movies** (`/popular`) - Most popular movies right now
- **Top Rated** (`/top-rated`) - Highest-rated movies of all time
- **Upcoming** (`/upcoming`) - Movies coming soon to theaters
- **Now Playing** (`/now-playing`) - Movies currently in theaters

### Movie Details (`/movie/[id]`)
- Full movie information including poster, backdrop, and metadata
- Cast and crew information with profile images
- Embedded YouTube trailers
- Similar movies recommendations
- Production details, budget, and revenue information

### Search (`/search`)
- Real-time movie search functionality
- Pagination for search results
- Search suggestions and tips
- URL-based search queries for shareable links

## 🎨 UI Components

### Core Components
- **MovieCard**: Individual movie display with poster, title, rating, and overview
- **MovieGrid**: Responsive grid layout for movie collections
- **MovieSection**: Horizontal scrolling section with "View All" links
- **Header**: Navigation with search functionality and mobile menu
- **Footer**: Site information and quick links

### Interactive Features
- Hover effects and smooth transitions
- Loading skeletons for better UX
- Error handling with user-friendly messages
- Responsive image loading with fallbacks
- Infinite scroll pagination

## 🔧 Configuration

### Tailwind CSS
The project uses a custom Tailwind configuration with:
- Custom scrollbar styles
- Line clamp utilities
- shadcn/ui design tokens
- Responsive breakpoints

### SWR Configuration
- Automatic revalidation on focus
- Error retry with exponential backoff
- Cache optimization for better performance
- Background updates for fresh data

## 🚀 Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

3. **Deploy**
   
   The app can be deployed to any platform that supports Next.js:
   - [Vercel](https://vercel.com/) (recommended)
   - [Netlify](https://netlify.com/)
   - [Railway](https://railway.app/)
   - Or any Docker-compatible platform

## 📄 API Reference

This application uses [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api) endpoints:

- `/movie/popular` - Popular movies
- `/movie/top_rated` - Top rated movies
- `/movie/upcoming` - Upcoming movies
- `/movie/now_playing` - Now playing movies
- `/movie/{id}` - Movie details
- `/movie/{id}/videos` - Movie trailers
- `/movie/{id}/credits` - Movie cast and crew
- `/movie/{id}/similar` - Similar movies
- `/search/movie` - Search movies

## 👨‍💻 Author

**IDRAYNAR**
- GitHub: [@IDRAYNAR](https://github.com/IDRAYNAR)
- Repository: [TMDB Movie Catalog](https://github.com/IDRAYNAR/TMDB)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide](https://lucide.dev/) for the icon set
- [Vercel](https://vercel.com/) for Next.js and hosting platform

## ⚠️ Disclaimer

This product uses the TMDB API but is not endorsed or certified by TMDB. All movie data and images are provided by The Movie Database.