import { Avatar } from '../Avatar/Avatar';
import { Icon } from '../Icon/Icon';
import { Logo } from '../Logo/Logo';
import styles from './AppHeader.module.css';

export interface AppHeaderProps {
  /** Initials of the signed-in user. */
  userInitials: string;
  /** Full name of the signed-in user (used for the menu's accessible name). */
  userName: string;
  onUserMenuClick?: () => void;
}

/** Top bar: logo + account menu trigger. */
export function AppHeader({ userInitials, userName, onUserMenuClick }: AppHeaderProps) {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.logoLink}>
        <Logo />
      </a>
      <div className={styles.user}>
        <button
          type="button"
          className={styles.userButton}
          onClick={onUserMenuClick}
          aria-haspopup="menu"
          aria-label={`Account menu for ${userName}`}
        >
          <Avatar type="initials-alt" size="M" initials={userInitials} />
          <span className={styles.chevron}>
            <Icon name="chevron-down" />
          </span>
        </button>
      </div>
    </header>
  );
}
