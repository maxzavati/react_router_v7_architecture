import styles from './index.module.css';
import HeartIcon from '~/assets/icons/heart.svg?react';
import { useToggleFavoriteButtonViewModel } from './view-model';
import HeartFilledIcon from '~/assets/icons/heart-filled.svg?react';

interface ToggleFavoriteButtonProps {
  id: number;
  mediaType: 'movie' | 'tv';
  isFavorite?: boolean;
  className?: string;
  size?: 'small' | 'large';
}

export function ToggleFavoriteButton({
  id,
  mediaType,
  isFavorite = false,
  className,
  size = 'small',
}: ToggleFavoriteButtonProps) {
  const { sessionId, optimisticFavorite, isSubmitting, handleFavoriteAction } =
    useToggleFavoriteButtonViewModel({ id, mediaType, isFavorite });

  if (!sessionId) {
    return null;
  }

  const buttonClassName = [
    styles.button,
    size === 'large' ? styles.buttonLarge : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      disabled={isSubmitting}
      onClick={handleFavoriteAction}
      className={buttonClassName}
      aria-label={
        optimisticFavorite ? `Remove from favorites` : `Add to favorites`
      }
    >
      {isFavorite || optimisticFavorite ? <HeartFilledIcon /> : <HeartIcon />}
    </button>
  );
}
