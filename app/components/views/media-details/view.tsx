import styles from './index.module.css';
import { Loader } from '~/components/ui/loader';
import { useMediaDetailsViewModel } from './view-model';
import { RatingMeter } from '~/components/ui/rating-meter';
import { ErrorSection } from '~/components/ui/error-section';
import { ToggleFavoriteButton } from '~/components/templates/favorite-button/view';

export function MediaDetailsView() {
  const {
    data,
    year,
    title,
    genres,
    mediaId,
    posterUrl,
    isLoading,
    isFavorite,
    isTvShowType,
    numberOfEpisodes,
    numberOfSeasons,
    backgroundImageUrl,
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
                <ToggleFavoriteButton
                  id={data.id}
                  isFavorite={isFavorite}
                  mediaType={isTvShowType ? 'tv' : 'movie'}
                />
                <div className={styles.ratingBox}>
                  <RatingMeter value={data.vote_average} size="lg" />
                  <div className={styles.ratingLabels}>
                    <div>User</div>
                    <div>Score</div>
                  </div>
                </div>
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
                  <li>
                    Status: <strong>{data.status}</strong>
                  </li>
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
                  <li>
                    Production countries:{' '}
                    <strong>
                      {' '}
                      {data.production_countries
                        .map((country) => country.iso_3166_1)
                        .join(', ')}
                    </strong>
                  </li>
                  <li>
                    Production companies:{' '}
                    <strong>
                      {data.production_companies
                        .map((company) => company.name)
                        .join(', ')}
                    </strong>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
