import styles from './index.module.css';

export function Loader() {
  return (
    <div className={styles.loader} role="status" aria-live="polite">
      <div className={styles.bar} />
    </div>
  );
}
