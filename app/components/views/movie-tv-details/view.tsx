import styles from "./index.module.css";
import { Loader } from "~/components/ui/loader";
import { useMovieTvDetailsViewModel } from "./view-model";
import { ErrorSection } from "~/components/ui/error-section";

const TMDB_IMAGE_BASE = import.meta.env.VITE_IMAGE_BASE;

export function MovieTvDetailsView() {
  const { isLoading, isError, errorMessage, mediaType, data } =
    useMovieTvDetailsViewModel();

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data) {
    return <ErrorSection message={errorMessage} />;
  }

  const posterUrl = data.poster_path
    ? `${TMDB_IMAGE_BASE}/w500${data.poster_path}`
    : "";

  const backdropStyle = data.backdrop_path
    ? {
        backgroundImage: `url(${TMDB_IMAGE_BASE}/w1280${data.backdrop_path})`,
      }
    : undefined;

  const title =
    mediaType == "movie" ? data.title : (data.name ?? data.original_name);

  return (
    <main className={styles.main}>
      <div className={styles.backdropContainer} style={backdropStyle}>
        <div className={styles.backdropOverlay} />
        <div className={styles.backdropContent}>
          <img className={styles.poster} src={posterUrl} alt={title} />
          <div className={styles.details}>
            <h1>{title}</h1>
            {data.overview ? (
              <p className={styles.overview}>{data.overview}</p>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
