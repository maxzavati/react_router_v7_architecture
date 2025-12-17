import { Button as BaseButton } from '@base-ui-components/react/button';
import styles from './index.module.css';

type Variant = 'base' | 'ghost' | 'outline';

type ButtonProps = React.ComponentPropsWithoutRef<typeof BaseButton> & {
  variant?: Variant;
};

const variantClassMap: Record<Variant, string> = {
  base: styles.ButtonBase,
  ghost: styles.ButtonGhost,
  outline: styles.ButtonOutline,
};

export function Button({
  className,
  children,
  variant = 'base',
  ...props
}: ButtonProps) {
  const classes = [styles.Button, variantClassMap[variant], className ?? '']
    .filter(Boolean)
    .join(' ');

  return (
    <BaseButton {...props} className={classes}>
      {children}
    </BaseButton>
  );
}
