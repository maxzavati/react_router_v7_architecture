import styles from './index.module.css';
import { Loader } from '~/components/ui/loader';
import HeartIcon from '~/assets/icons/heart.svg?react';
import { useMediaDetailsViewModel } from './view-model';
import { RatingMeter } from '~/components/ui/rating-meter';
import { ErrorSection } from '~/components/ui/error-section';
import HeartFilledIcon from '~/assets/icons/heart-filled.svg?react';

export function MediaDetailsView() {
  const {
    user,
    data,
    year,
    title,
    genres,
    posterUrl,
    isLoading,
    isFavorite,
    isTvShowType,
    isSubmitting,
    numberOfEpisodes,
    numberOfSeasons,
    optimisticFavorite,
    backgroundImageUrl,
    handleFavoriteAction,
  } = useMediaDetailsViewModel();

  if (!data) {
    return <ErrorSection message="No data found." />;
  }

  return (
    <>
      {isLoading ? <Loader /> : null}
      <main className={styles.main}>
        <div
          className={styles.backdropContainer}
          style={{ backgroundImage: backgroundImageUrl }}
        >
          <div className={styles.backdropOverlay} />
          <div className={styles.backdropContent}>
            <img className={styles.poster} src={posterUrl} alt={title} />
            <div className={styles.info}>
              <h1>
                {title}{' '}
                {year ? <span className={styles.year}>({year})</span> : ''}
              </h1>

              {genres ? <p className={styles.genres}>{genres}</p> : null}

              <div className={styles.row}>
                <div className={styles.favoriteBox}>
                  {user?.sessionId ? (
                    <button
                      type="button"
                      className={styles.favoriteButton}
                      aria-label={
                        optimisticFavorite
                          ? `Remove from favorites`
                          : `Add to favorites`
                      }
                      disabled={isSubmitting}
                      onClick={handleFavoriteAction}
                    >
                      {isFavorite || optimisticFavorite ? (
                        <HeartFilledIcon />
                      ) : (
                        <HeartIcon />
                      )}
                    </button>
                  ) : null}
                </div>
                <RatingMeter value={data.vote_average} size="lg" />
              </div>

              <section>
                <h4>Overview</h4>
                {data.overview ? (
                  <p className={styles.overview}>{data.overview}</p>
                ) : null}
              </section>

              <section className="mt-1">
                <h4>Details</h4>
                <ul>
                  {isTvShowType ? (
                    <>
                      <li>
                        Number of episodes: <strong>{numberOfEpisodes}</strong>
                      </li>
                      <li>
                        Number of seasons: <strong>{numberOfSeasons}</strong>
                      </li>
                    </>
                  ) : null}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
