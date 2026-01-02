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
    trendingAll,
    topRatedMovies,
    topRatedTvShows,
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
            title="Trending This Week"
            seeAllHref="/trending"
            items={trendingAll?.results}
            renderItem={(item) => (
              <MediaCard
                key={item.id}
                mediaId={item.id}
                name={
                  'movie' in item
                    ? item.title || item.name || ''
                    : item.name || ''
                }
                mediaType="movie"
                link={`/movies/${item.id}`}
                isFavorite={item.isFavorite}
                image={posterPath(item.poster_path)}
              />
            )}
          />

          <MediaSection
            title="Top Rated Movies"
            seeAllHref="/movies/top-rated"
            items={topRatedMovies?.results}
            renderItem={(movie) => (
              <MediaCard
                key={movie.id}
                mediaId={movie.id}
                name={movie.title}
                mediaType="movie"
                link={`/movies/${movie.id}`}
                isFavorite={movie.isFavorite}
                image={posterPath(movie.poster_path)}
              />
            )}
          />

          <MediaSection
            title="Top Rated TV Shows"
            seeAllHref="/tv-shows/top-rated"
            items={topRatedTvShows?.results}
            renderItem={(show) => (
              <MediaCard
                key={show.id}
                mediaId={show.id}
                name={show.name}
                mediaType="tv"
                link={`/tv-shows/${show.id}`}
                isFavorite={show.isFavorite}
                image={posterPath(show.poster_path)}
              />
            )}
          />
        </div>
      </main>
    </>
  );
}
