import { Suspense } from 'react';
import { Await } from 'react-router';
import styles from './index.module.css';
import { posterPath } from '~/apis/utils';
import { Loader } from '~/components/ui/loader';
import { useProfileViewModel } from './view-model';
import { MediaCard } from '~/components/media-card/view';
import { ErrorSection } from '~/components/ui/error-section';
import { MediaSection } from '~/components/templates/media-section';

export function ProfileView() {
  const {
    isLoading,
    isError,
    errorMessage,
    accountDetails,
    avatarUrl,
    avatarFallback,
    favoriteMovies,
    favoriteTvShows,
  } = useProfileViewModel();

  if (isError) {
    return <ErrorSection message={errorMessage} />;
  }

  return (
    <>
      {isLoading ? <Loader /> : null}
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>
              {accountDetails ? `Welcome, ${accountDetails.name}!` : 'Welcome!'}
            </h1>
            <div
              className={styles.avatarCircle}
              style={{
                backgroundImage: avatarUrl ? `url(${avatarUrl})` : undefined,
              }}
            >
              {!avatarUrl ? avatarFallback : null}
            </div>
          </div>
        </section>

        <section className={styles.container}>
          <Suspense>
            <Await resolve={favoriteMovies}>
              {(data) => (
                <MediaSection
                  title="Favorite Movies"
                  seeAllHref="/movies/favorites"
                  items={data?.results}
                  renderItem={(movie) => (
                    <MediaCard
                      key={movie.id}
                      mediaId={movie.id}
                      name={movie.title}
                      mediaType="movie"
                      isFavorite={true}
                      releaseDate={movie.release_date}
                      link={`/movies/${movie.id}`}
                      image={posterPath(movie.poster_path)}
                      rating={movie.vote_average}
                    />
                  )}
                />
              )}
            </Await>
          </Suspense>

          <Suspense>
            <Await resolve={favoriteTvShows}>
              {(data) => (
                <MediaSection
                  title="Favorite TV Shows"
                  seeAllHref="/tv-shows/favorites"
                  items={data?.results}
                  renderItem={(tvShow) => (
                    <MediaCard
                      key={tvShow.id}
                      mediaId={tvShow.id}
                      name={tvShow.name}
                      mediaType="tv"
                      isFavorite={true}
                      releaseDate={tvShow.first_air_date}
                      link={`/tv-shows/${tvShow.id}`}
                      image={posterPath(tvShow.poster_path)}
                      rating={tvShow.vote_average}
                    />
                  )}
                />
              )}
            </Await>
          </Suspense>
        </section>
      </main>
    </>
  );
}
