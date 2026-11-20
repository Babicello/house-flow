import { cx } from '../../lib/cx';
import userBody from '../../assets/illustrations/user/body.svg';
import userHead from '../../assets/illustrations/user/head.svg';
import styles from './Asset.module.css';

/**
 * Figma property `Type` of the "Assets" illustration set.
 * Only `user` is exported so far; add more as screens need them.
 */
export type AssetType = 'user';

export interface AssetProps {
  /** Figma `Type`. */
  type: AssetType;
  className?: string;
}

/** Assets — 48×48 spot illustration (Figma component set "Assets"). */
export function Asset({ type, className }: AssetProps) {
  return (
    <span className={cx(styles.asset, className)} aria-hidden>
      {type === 'user' && (
        <>
          <img className={styles.userBody} src={userBody} alt="" />
          <img className={styles.userHead} src={userHead} alt="" />
        </>
      )}
    </span>
  );
}
