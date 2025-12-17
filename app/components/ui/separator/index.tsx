import styles from './index.module.css';

interface SeparatorProps {
  axis?: 'x' | 'y';
  className?: string;
}

export function Separator({ axis = 'x', className }: SeparatorProps) {
  return (
    <div className={`${styles[axis]} ${className ?? ''}`} role="presentation" />
  );
}
