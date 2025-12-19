import { Form } from 'react-router';
import styles from './index.module.css';
import Field from '~/components/ui/field';
import { useHomeViewModel } from './view-model';
import { Loader } from '~/components/ui/loader';
import { posterPath } from '~/apis/media/utils';
import { Button } from '~/components/ui/button';
import { MediaCard } from '~/components/media-card/view';
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

  if (isError) {
    return <ErrorSection message={errorMessage} />;
  }

  return (
    <>
      {isLoading ? <Loader /> : null}
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1>Discover your next favorite title</h1>
            <Form className={styles.searchForm} action="/search" method="get">
              <Field
                required
                name="query"
                type="search"
                id="home-search"
                className={styles.searchInput}
                placeholder="Search movies or TV shows…"
              />
              <Button type="submit">Search</Button>
            </Form>
          </div>
        </section>

        <div className={styles.container}>
          <MediaSection
            title="Popular Movies"
            seeAllHref="/movies/popular"
            items={popularMovies?.results}
            renderItem={(movie) => (
              <MediaCard
                key={movie.id}
                mediaId={movie.id}
                name={movie.title}
                mediaType="movie"
                link={`/movies/${movie.id}`}
                image={posterPath(movie.poster_path)}
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
                mediaId={movie.id}
                mediaType="movie"
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
                mediaId={show.id}
                name={show.name}
                mediaType="tv"
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
                mediaId={show.id}
                name={show.name}
                mediaType="tv"
                link={`/tv-shows/${show.id}`}
                image={posterPath(show.poster_path)}
              />
            )}
          />
        </div>
      </main>
    </>
  );
}
