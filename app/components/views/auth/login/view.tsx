import { Form } from 'react-router';
import styles from './index.module.css';
import Field from '~/components/ui/field';
import { Button } from '~/components/ui/button';
import { Loader } from '~/components/ui/loader';
import { useAuthLoginViewModel } from './view-model';
import { Message } from '~/components/ui/message';
import backgroundImage from '/movies-bg-03.webp';

export function AuthLoginView() {
  const { actionData, isSubmitting } = useAuthLoginViewModel();

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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Connecting...' : 'Connect'}
            </Button>
          </Form>
          {actionData?.errorMessage ? (
            <Message variant="error">{actionData.errorMessage}</Message>
          ) : null}
        </div>
      </main>
    </>
  );
}
