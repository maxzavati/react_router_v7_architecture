import { Form } from 'react-router';
import styles from './index.module.css';
import { Button } from '../button';

export function ErrorSection({ message }: { message: string }) {
  return (
    <section className={styles.section}>
      <h2>{message}</h2>
      <Form method="get">
        <p>Please retry again or come back later.</p>
        <Button className={styles.retryButton} type="submit">
          Retry
        </Button>
      </Form>
    </section>
  );
}
