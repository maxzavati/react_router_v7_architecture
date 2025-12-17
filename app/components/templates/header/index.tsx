import { Form, Link, useNavigate, useRouteLoaderData } from 'react-router';
import styles from './index.module.css';
import { Button } from '~/components/ui/button';
import RouterIcon from '/public/router-logo.svg?react';

export function Header() {
  const { user } = useRouteLoaderData('root');
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <Link to="/">
        <RouterIcon />
      </Link>
      {user?.sessionId ? (
        <Form method="post">
          <Button type="submit" variant="ghost">
            Logout
          </Button>
        </Form>
      ) : (
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate('/auth/connect')}
        >
          Login
        </Button>
      )}
    </header>
  );
}
