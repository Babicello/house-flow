import { Link } from '../Link/Link';
import styles from './AppFooter.module.css';

const LINKS = [
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Drhouse.com', href: 'https://drhouse.com' },
];

/** Page footer: copyright + legal links. */
export function AppFooter() {
  return (
    <footer className={styles.footer}>
      <p className={`${styles.copyright} type-body-s`}>© {new Date().getFullYear()} DrHouse, Inc.</p>
      <nav className={styles.links} aria-label="Legal">
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} size="S" variant="default" className={styles.link}>
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
