import { Link } from 'react-router';
import styles from './index.module.css';
import { RatingMeter } from '../rating-meter';
import { convertToDateString } from '~/utils/dates';
import { ToggleFavoriteButton } from '../../templates/favorite-button/view';

interface ItemCardProps {
  image: string;
  name: string;
  link: string;
  id: number;
  releaseDate: string;
  rating: number;
  mediaType: 'movie' | 'tv';
  isFavorite?: boolean;
}

export function MediaCard({
  name,
  image,
  link,
  id,
  releaseDate,
  mediaType,
  rating,
  isFavorite = false,
}: ItemCardProps) {
  return (
    <article className={styles.article}>
      <ToggleFavoriteButton
        id={id}
        mediaType={mediaType}
        isFavorite={isFavorite}
        className={styles.favoriteButton}
      />
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
