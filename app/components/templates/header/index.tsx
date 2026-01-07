import styles from './index.module.css';
import { Link, useNavigate } from 'react-router';
import { Button } from '~/components/ui/button';
import { useHeaderViewModel } from './view-model';
import RouterIcon from '~/assets/icons/router-logo.svg?react';

export function Header() {
  const navigate = useNavigate();

  const { sessionId, isSubmitting, handleLogoutClick } = useHeaderViewModel();

  return (
    <header className={styles.header}>
      <Link to="/">
        <RouterIcon />
      </Link>
      <nav className={styles.nav}>
        {sessionId ? (
          <>
            <Link to="/profile" className={styles.navLink}>
              Profile
            </Link>
            <Button
              variant="ghost"
              disabled={isSubmitting}
              onClick={handleLogoutClick}
            >
              Logout
            </Button>
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
