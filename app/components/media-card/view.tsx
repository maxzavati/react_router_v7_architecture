import { Link } from 'react-router';
import styles from './index.module.css';
import { RatingMeter } from '../rating-meter';
import { convertToDateString } from '~/utils/dates';
import { useMediaCardViewModel } from './view-model';
import HeartIcon from '~/assets/icons/heart.svg?react';
import HeartFilledIcon from '~/assets/icons/heart-filled.svg?react';

interface ItemCardProps {
  image: string;
  name: string;
  link: string;
  mediaId: number;
  releaseDate: string;
  rating: number;
  mediaType: 'movie' | 'tv';
  isFavorite?: boolean;
}

export function MediaCard({
  name,
  image,
  link,
  mediaId,
  releaseDate,
  mediaType,
  rating,
  isFavorite = false,
}: ItemCardProps) {
  const { sessionId, optimisticFavorite, isSubmitting, handleFavoriteClick } =
    useMediaCardViewModel({ mediaId, mediaType, isFavorite });

  return (
    <article className={styles.article}>
      {sessionId ? (
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
      <img className={styles.image} src={image} alt={name} />
      <div className={styles.content}>
        <Link to={link} className={styles.link}>
          {name}
        </Link>
        {releaseDate ? (
          <small className={styles.date}>
            {convertToDateString(releaseDate)}
          </small>
        ) : null}
        <RatingMeter value={rating} className={styles.rating} />
      </div>
    </article>
  );
}
