import { Form, Link, useNavigate, useRouteLoaderData } from 'react-router';
import styles from './index.module.css';
import { Button } from '~/components/ui/button';
import RouterIcon from '/public/router-logo.svg?react';

export function Header() {
  const navigate = useNavigate();
  const { user } = useRouteLoaderData('root') || {};

  return (
    <header className={styles.header}>
      <Link to="/">
        <RouterIcon />
      </Link>
      <nav className={styles.nav}>
        {user?.sessionId ? (
          <>
            <Link to="/profile" className={styles.navLink}>
              Profile
            </Link>
            <Form method="post">
              <Button type="submit" variant="ghost">
                Logout
              </Button>
            </Form>
          </>
        ) : (
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate('/auth/connect')}
          >
            Login
          </Button>
        )}
      </nav>
    </header>
  );
}
