import { Link, useFetcher, useRouteLoaderData } from 'react-router';
import HeartIcon from '~/assets/icons/heart.svg?react';
import HeartFilledIcon from '~/assets/icons/heart-filled.svg?react';
import styles from './index.module.css';

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
  const { user } = useRouteLoaderData('root') as {
    user?: { sessionId: string | null };
  };
  const fetcher = useFetcher<{ favorite: boolean }>();

  const submittedFavorite = fetcher.formData?.get('favorite');
  const optimisticFavorite =
    typeof submittedFavorite === 'string'
      ? submittedFavorite === 'true'
      : (fetcher.data?.favorite ?? isFavorite);

  const isSubmitting = fetcher.state !== 'idle';

  function handleFavoriteClick() {
    fetcher.submit(
      {
        mediaId: mediaId.toString(),
        mediaType,
        favorite: (!optimisticFavorite).toString(),
      },
      { method: 'post' }
    );
  }

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
          {optimisticFavorite ? <HeartFilledIcon /> : <HeartIcon />}
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
