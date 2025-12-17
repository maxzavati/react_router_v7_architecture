import { Form } from 'react-router';
import styles from './index.module.css';
import Field from '~/components/ui/field';
import { Button } from '~/components/ui/button';
import { Loader } from '~/components/ui/loader';
import { useAuthLoginViewModel } from './view-model';
import { Message } from '~/components/ui/message';
import backgroundImage from '/public/movies.png';

export function AuthLoginView() {
  const { isSubmitting, isError } = useAuthLoginViewModel();

  return (
    <>
      {isSubmitting ? <Loader /> : null}
      <main className={styles.main}>
        <section>
          <img
            className={styles.backgroundImage}
            src={backgroundImage}
            alt="Movies background"
          />
        </section>
        <div className={styles.container}>
          <h1>Login</h1>
          <Form method="post" className={styles.form}>
            <Field name="username" label="Username" required />
            <Field name="password" label="Password" type="password" required />
            <Button type="submit">
              {isSubmitting ? 'Connecting...' : 'Connect'}
            </Button>
          </Form>
          {isError ? (
            <Message variant="error">
              An error occurred during login. Please try again.
            </Message>
          ) : null}
        </div>
      </main>
    </>
  );
}
