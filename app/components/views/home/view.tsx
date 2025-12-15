import styles from "./index.module.css";
import { useHomeViewModel } from "./view-model";
import { posterPath } from "~/apis/movies/utils";
import { ItemCard } from "~/components/ui/item-card";
import { Loader } from "~/components/ui/loader";
import { ScrollContainer } from "~/components/ui/scroll-container";
import { ErrorSection } from "~/components/ui/error-section";

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
      <section className={styles.section}>
        <h2>Popular Movies</h2>
        <ScrollContainer>
          {popularMovies?.results?.length
            ? popularMovies.results.map((movie) => (
                <ItemCard
                  key={movie.id}
                  name={movie.title}
                  link={`/movies/${movie.id}`}
                  image={posterPath(movie.poster_path)}
                />
              ))
            : null}
        </ScrollContainer>
      </section>

      <section className={styles.section}>
        <h2>Upcoming Movies</h2>
        <ScrollContainer>
          {upcomingMovies?.results?.length
            ? upcomingMovies.results.map((movie) => (
                <ItemCard
                  key={movie.id}
                  name={movie.title}
                  link={`/movies/${movie.id}`}
                  image={posterPath(movie.poster_path)}
                />
              ))
            : null}
        </ScrollContainer>
      </section>

      <section className={styles.section}>
        <h2>Popular TV Shows</h2>
        <ScrollContainer>
          {popularTvShows?.results?.length
            ? popularTvShows.results.map((show) => (
                <ItemCard
                  key={show.id}
                  name={show.name}
                  link={`/tv-shows/${show.id}`}
                  image={posterPath(show.poster_path)}
                />
              ))
            : null}
        </ScrollContainer>
      </section>

      <section className={styles.section}>
        <h2>Upcoming TV Shows</h2>
        <ScrollContainer>
          {upcomingTvShows?.results?.length
            ? upcomingTvShows.results.map((show) => (
                <ItemCard
                  key={show.id}
                  name={show.name}
                  link={`/tv-shows/${show.id}`}
                  image={posterPath(show.poster_path)}
                />
              ))
            : null}
        </ScrollContainer>
      </section>
    </main>
  );
}
