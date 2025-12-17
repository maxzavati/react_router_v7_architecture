import styles from './index.module.css';
import { useHomeViewModel } from './view-model';
import { Loader } from '~/components/ui/loader';
import { posterPath } from '~/apis/media/utils';
import backgroundImage from '/public/movies.png';
import { MediaCard } from '~/components/ui/media-card';
import { ErrorSection } from '~/components/ui/error-section';
import { MediaSection } from '~/components/templates/media-section';

export function HomeView() {
  const {
    isLoading,
    isError,
    errorMessage,
    popularMovies,
    upcomingMovies,
    popularTvShows,
    upcomingTvShows,
  } = useHomeViewModel();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorSection message={errorMessage} />;
  }

  return (
    <main className={styles.main}>
      <section>
        <img
          className={styles.backgroundImage}
          src={backgroundImage}
          alt="Movies background"
        />
      </section>

      <MediaSection
        title="Popular Movies"
        seeAllHref="/movies/popular"
        items={popularMovies?.results}
        renderItem={(movie) => (
          <MediaCard
            key={movie.id}
            name={movie.title}
            link={`/movies/${movie.id}`}
            image={posterPath(movie.poster_path)}
            onFavorite={() => {}}
          />
        )}
      />

      <MediaSection
        title="Upcoming Movies"
        items={upcomingMovies?.results}
        seeAllHref="/movies/upcoming"
        renderItem={(movie) => (
          <MediaCard
            key={movie.id}
            name={movie.title}
            link={`/movies/${movie.id}`}
            image={posterPath(movie.poster_path)}
          />
        )}
      />

      <MediaSection
        title="Popular TV Shows"
        seeAllHref="/tv-shows/popular"
        items={popularTvShows?.results}
        renderItem={(show) => (
          <MediaCard
            key={show.id}
            name={show.name}
            link={`/tv-shows/${show.id}`}
            image={posterPath(show.poster_path)}
          />
        )}
      />

      <MediaSection
        title="Upcoming TV Shows"
        seeAllHref="/tv-shows/upcoming"
        items={upcomingTvShows?.results}
        renderItem={(show) => (
          <MediaCard
            key={show.id}
            name={show.name}
            link={`/tv-shows/${show.id}`}
            image={posterPath(show.poster_path)}
          />
        )}
      />
    </main>
  );
}
