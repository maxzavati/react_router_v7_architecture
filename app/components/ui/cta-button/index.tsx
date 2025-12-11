import { Button } from "@base-ui-components/react/button";
import styles from "./index.module.css";

export function CTAButton({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) {
  return (
    <Button {...props} className={`${styles.Button} ${className ?? ""}`}>
      {children}
    </Button>
  );
}
