import styles from './index.module.css';
import { useNavigate } from 'react-router';
import { Button } from '~/components/ui/button';
import ArrowLeftIcon from '~/assets/icons/arrow-left.svg?react';
import ReloadIcon from '~/assets/icons/reload.svg?react';
import backgroundImage from '/movies-bg-01.webp';

interface ErrorBoundaryViewProps {
  message: string;
  details?: string;
  // stack?: string;
}

export function ErrorBoundaryView({
  message,
  details,
}: ErrorBoundaryViewProps) {
  const navigate = useNavigate();

  return (
    <main className={styles.main}>
      <section>
        <img
          className={styles.backgroundImage}
          src={backgroundImage}
          alt="Movies background"
        />
      </section>

      <section className={styles.container}>
        <h1>{message}</h1>
        <p>{details}</p>
        <div className={styles.actions}>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeftIcon />
            Go back
          </Button>
          <form method="get">
            <Button variant="outline" type="submit">
              <ReloadIcon />
              Reload
            </Button>
          </form>
        </div>
      </section>

      {/* {stack ? (
        <pre>
          <code>{stack}</code>
        </pre>
      ) : null} */}
    </main>
  );
}
