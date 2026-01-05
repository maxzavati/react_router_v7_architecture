import { Link } from 'react-router';
import styles from './index.module.css';
import ArrowRight from '~/assets/icons/arrow-right.svg?react';
import { ScrollContainer } from '~/components/ui/scroll-container';

interface MediaSectionProps<T> {
  title: string;
  items?: T[] | null;
  seeAllHref?: string;
  renderItem: (item: T) => React.ReactNode;
  className?: string;
}

export function MediaSection<T>({
  title,
  items,
  seeAllHref,
  renderItem,
  className,
}: MediaSectionProps<T>) {
  const list = Array.isArray(items) ? items : [];
  const hasItems = list.length > 0;

  return (
    <section className={`${styles.mediaSection} ${className || ''}`}>
      <div className={styles.sectionHeader}>
        <h2>{title}</h2>
        {seeAllHref ? (
          <Link to={seeAllHref} className={styles.seeAllLink}>
            See all
            <ArrowRight />
          </Link>
        ) : null}
      </div>
      {hasItems ? (
        <ScrollContainer>{list.map(renderItem)}</ScrollContainer>
      ) : (
        <p className={styles.emptyMessage}>No titles found.</p>
      )}
    </section>
  );
}
