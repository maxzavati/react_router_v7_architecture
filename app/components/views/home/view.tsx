import { Form } from 'react-router';
import styles from './index.module.css';
import Field from '~/components/ui/field';
import { posterPath } from '~/apis/utils';
import { useHomeViewModel } from './view-model';
import { Loader } from '~/components/ui/loader';
import { Button } from '~/components/ui/button';
import { MediaCard } from '~/components/ui/media-card/view';
import SearchIcon from '~/assets/icons/search.svg?react';
import { MediaSection } from '~/components/templates/media-section';

export function HomeView() {
  const { isLoading, trendingAll, topRatedMovies, topRatedTvShows } =
    useHomeViewModel();

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
              <Button type="submit" className={styles.searchButton}>
                <SearchIcon />
              </Button>
            </Form>
          </div>
        </section>

        <div className={styles.bgWrapper}>
          <MediaSection
            className={styles.container}
            title="Trending This Week"
            seeAllHref="/trending"
            items={trendingAll?.results}
            renderItem={(item) => {
              const cardMediaType = item.media_type === 'tv' ? 'tv' : 'movie';
              const linkSegment =
                cardMediaType === 'tv' ? 'tv-shows' : 'movies';

              return (
                <MediaCard
                  key={item.id}
                  id={item.id}
                  name={item.title || item.name || 'No title'}
                  mediaType={cardMediaType}
                  link={`/${linkSegment}/${item.id}`}
                  isFavorite={item.isFavorite}
                  image={posterPath(item.poster_path)}
                  rating={item.vote_average}
                  releaseDate={item.release_date || item.first_air_date || ''}
                />
              );
            }}
          />
        </div>

        <MediaSection
          className={styles.container}
          title="Top Rated Movies"
          seeAllHref="/movies/top-rated"
          items={topRatedMovies?.results}
          renderItem={(movie) => (
            <MediaCard
              key={movie.id}
              id={movie.id}
              name={movie.title}
              mediaType="movie"
              link={`/movies/${movie.id}`}
              isFavorite={movie.isFavorite}
              image={posterPath(movie.poster_path)}
              rating={movie.vote_average}
              releaseDate={movie.release_date}
            />
          )}
        />

        <div className={styles.bgWrapper}>
          <MediaSection
            className={styles.container}
            title="Top Rated TV Shows"
            seeAllHref="/tv-shows/top-rated"
            items={topRatedTvShows?.results}
            renderItem={(show) => (
              <MediaCard
                key={show.id}
                id={show.id}
                name={show.name}
                mediaType="tv"
                link={`/tv-shows/${show.id}`}
                isFavorite={show.isFavorite}
                image={posterPath(show.poster_path)}
                rating={show.vote_average}
                releaseDate={show.first_air_date}
              />
            )}
          />
        </div>
      </main>
    </>
  );
}
