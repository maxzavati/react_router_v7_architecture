import styles from "./index.module.css";
import { useHomeViewModel } from "./view-model";
import { posterPath } from "~/apis/movies/utils";
import { ItemCard } from "~/components/ui/item-card";
import { Loader } from "~/components/ui/loader";
import { ScrollContainer } from "~/components/ui/scroll-container";

export function HomeView() {
  const { loaderData, isLoading } = useHomeViewModel();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h2>Popular Movies</h2>
        <ScrollContainer>
          {loaderData.popularMovies.results.length > 0
            ? loaderData.popularMovies.results.map((movie) => (
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
          {loaderData.upcomingMovies.results.length > 0
            ? loaderData.upcomingMovies.results.map((movie) => (
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
          {loaderData.popularTvShows.results.length > 0
            ? loaderData.popularTvShows.results.map((show) => (
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
          {loaderData.upcomingTvShows.results.length > 0
            ? loaderData.upcomingTvShows.results.map((show) => (
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
