import styles from './index.module.css';
import RouterIcon from '~/assets/icons/router-logo-full.svg?react';
import TmdbIcon from '~/assets/icons/tmdb.svg?react';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>Powered by:</p>
        <div className={styles.icons}>
          <div>
            <RouterIcon />
          </div>
          <div>
            <TmdbIcon />
          </div>
        </div>
      </div>
    </footer>
  );
}
