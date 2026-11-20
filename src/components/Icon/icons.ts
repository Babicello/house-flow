import arrowLeft from '../../assets/icons/arrow-left.svg';
import check from '../../assets/icons/check.svg';
import chevronDown from '../../assets/icons/chevron-down.svg';
import chevronDown20 from '../../assets/icons/chevron-down-20.svg';
import chevronRightLarge from '../../assets/icons/chevron-right-large.svg';
import file02 from '../../assets/icons/file-02.svg';
import home02 from '../../assets/icons/home-02.svg';
import markerPin06 from '../../assets/icons/marker-pin-06.svg';
import shieldTick from '../../assets/icons/shield-tick.svg';
import trash01 from '../../assets/icons/trash-01.svg';
import userCircle from '../../assets/icons/user-circle.svg';
import xClose from '../../assets/icons/x-close.svg';

/**
 * Icon registry. `size` is the root width/height of the SVG exported from Figma
 * and is the icon's intrinsic size — do not override it.
 */
export const icons = {
  'arrow-left': { src: arrowLeft, size: 16 },
  check: { src: check, size: 20 },
  'chevron-down': { src: chevronDown, size: 16 },
  'chevron-down-20': { src: chevronDown20, size: 20 },
  'chevron-right-large': { src: chevronRightLarge, size: 16 },
  'trash-01': { src: trash01, size: 16 },
  'file-02': { src: file02, size: 24 },
  'x-close': { src: xClose, size: 24 },
  'home-02': { src: home02, size: 24 },
  'marker-pin-06': { src: markerPin06, size: 24 },
  'shield-tick': { src: shieldTick, size: 24 },
  'user-circle': { src: userCircle, size: 24 },
} as const;

export type IconName = keyof typeof icons;
