import styles from './index.module.css';
import { Loader } from '~/components/ui/loader';
import { useMediaDetailsViewModel } from './view-model';
import { RatingMeter } from '~/components/rating-meter';
import { ErrorSection } from '~/components/ui/error-section';
import { extractYear } from '~/utils/dates';
import HeartIcon from '~/assets/icons/heart.svg?react';
import HeartFilledIcon from '~/assets/icons/heart-filled.svg?react';

const TMDB_IMAGE_BASE = import.meta.env.VITE_IMAGE_BASE_URL;

export function MediaDetailsView() {
  const {
    isLoading,
    isError,
    errorMessage,
    mediaType,
    data,
    user,
    isSubmitting,
    isFavorite,
    optimisticFavorite,
    handleFavoriteClick,
  } = useMediaDetailsViewModel();

  if (isError || !data) {
    return <ErrorSection message={errorMessage} />;
  }

  const posterUrl = data.poster_path
    ? `${TMDB_IMAGE_BASE}/w500${data.poster_path}`
    : '';

  const backdropStyle = data.backdrop_path
    ? {
        backgroundImage: `url(${TMDB_IMAGE_BASE}/w1280${data.backdrop_path})`,
      }
    : undefined;

  const title =
    mediaType == 'movie' ? data.title : (data.name ?? data.original_name);

  const year =
    mediaType === 'movie'
      ? data.release_date
        ? extractYear(data.release_date)
        : ''
      : data.first_air_date
        ? extractYear(data.first_air_date)
        : '';

  const genres = data.genres?.map((genre) => genre.name).join(', ') ?? '';

  return (
    <>
      {isLoading ? <Loader /> : null}
      <main className={styles.main}>
        <div className={styles.backdropContainer} style={backdropStyle}>
          <div className={styles.backdropOverlay} />
          <div className={styles.backdropContent}>
            <img className={styles.poster} src={posterUrl} alt={title} />
            <div className={styles.details}>
              <h1>
                {title} {year ? `(${year})` : ''}
              </h1>
              {genres ? <p className={styles.genres}>{genres}</p> : null}
              {user?.sessionId ? (
                <button
                  type="button"
                  className={styles.favoriteButton}
                  aria-label={
                    optimisticFavorite
                      ? `Remove ${name} from favorites`
                      : `Add ${name} to favorites`
                  }
                  disabled={isSubmitting}
                  onClick={handleFavoriteClick}
                >
                  {isFavorite || optimisticFavorite ? (
                    <HeartFilledIcon />
                  ) : (
                    <HeartIcon />
                  )}
                </button>
              ) : null}
              {data.overview ? (
                <p className={styles.overview}>{data.overview}</p>
              ) : null}
              <RatingMeter value={data.vote_average} size="lg" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
