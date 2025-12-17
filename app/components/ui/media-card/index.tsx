import { Link } from 'react-router';
import styles from './index.module.css';
import HeartIcon from '~/assets/icons/heart.svg?react';
// import HeartFilledIcon from "~/assets/icons/heart-filled.svg?react";

interface ItemCardProps {
  image: string;
  name: string;
  link: string;
  onFavorite?: () => void;
}

export function MediaCard({ image, name, link, onFavorite }: ItemCardProps) {
  function handleFavoriteClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    onFavorite?.();
  }

  return (
    <article className={styles.article}>
      {onFavorite ? (
        <button
          type="button"
          className={styles.favoriteButton}
          onClick={handleFavoriteClick}
          aria-label={`Add ${name} to favorites`}
        >
          <HeartIcon />
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
