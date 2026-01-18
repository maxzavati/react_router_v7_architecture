import styles from './index.module.css';
import HeartIcon from '~/assets/icons/heart.svg?react';
import { useToggleFavoriteButtonViewModel } from './view-model';
import HeartFilledIcon from '~/assets/icons/heart-filled.svg?react';

interface ToggleFavoriteButtonProps {
  id: number;
  mediaType: 'movie' | 'tv';
  isFavorite?: boolean;
  className?: string;
}

export function ToggleFavoriteButton({
  id,
  mediaType,
  isFavorite = false,
  className,
}: ToggleFavoriteButtonProps) {
  const { sessionId, optimisticFavorite, isSubmitting, handleFavoriteAction } =
    useToggleFavoriteButtonViewModel({ id, mediaType, isFavorite });

  if (!sessionId) {
    return null;
  }

  return (
    <button
      type="button"
      disabled={isSubmitting}
      onClick={handleFavoriteAction}
      className={`${styles.button} ${className}`}
      aria-label={
        optimisticFavorite ? `Remove from favorites` : `Add to favorites`
      }
    >
      {isFavorite || optimisticFavorite ? <HeartFilledIcon /> : <HeartIcon />}
    </button>
  );
}
