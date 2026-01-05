import { Link } from 'react-router';
import styles from './index.module.css';
import { useMediaCardViewModel } from './view-model';
import HeartIcon from '~/assets/icons/heart.svg?react';
import HeartFilledIcon from '~/assets/icons/heart-filled.svg?react';

interface ItemCardProps {
  image: string;
  name: string;
  link: string;
  mediaId: number;
  mediaType: 'movie' | 'tv';
  isFavorite?: boolean;
}

export function MediaCard({
  name,
  image,
  link,
  mediaId,
  mediaType,
  isFavorite = false,
}: ItemCardProps) {
  const { user, optimisticFavorite, isSubmitting, handleFavoriteClick } =
    useMediaCardViewModel({ mediaId, mediaType, isFavorite });

  return (
    <article className={styles.article}>
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
      <img className={styles.image} src={image} alt={name} />
      <div className={styles.content}>
        <Link to={link} className={styles.link}>
          {name}
        </Link>
      </div>
    </article>
  );
}
