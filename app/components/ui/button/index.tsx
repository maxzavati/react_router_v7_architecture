import { Button as BaseButton } from "@base-ui-components/react/button";
import styles from "./index.module.css";

export function Button({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseButton>) {
  return (
    <BaseButton {...props} className={`${styles.Button} ${className ?? ""}`}>
      {children}
    </BaseButton>
  );
}
