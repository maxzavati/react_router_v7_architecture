import { Form } from 'react-router';
import styles from './index.module.css';
import { Button } from '~/components/ui/button';
import backgroundImage from '/public/movies-bg-01.webp';
import { Message } from '~/components/ui/message';
import { useAuthConnectViewModel } from './view-model';

export function AuthConnectPageView() {
  const { isSubmitting, isError } = useAuthConnectViewModel();

  return (
    <>
      <main className={styles.main}>
        <section>
          <img
            className={styles.backgroundImage}
            src={backgroundImage}
            alt="Movies background"
          />
        </section>
        <div className={styles.container}>
          <h1>Let's Authorize</h1>
          <p>
            By authorizing you'll be able to save your favorite movies and TV
            shows.
          </p>
          <Form method="post">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Connecting...' : 'Connect'}
            </Button>
          </Form>
          {isError ? (
            <Message variant="error">
              An error occurred during connection. Please try again.
            </Message>
          ) : null}
        </div>
      </main>
    </>
  );
}
