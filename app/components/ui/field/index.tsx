import { Field as BaseField } from "@base-ui-components/react/field";
import styles from "./index.module.css";

interface InputProps extends React.ComponentProps<typeof BaseField.Control> {
  label?: string;
  description?: string;
  errorMessage?: string;
}

export default function Field({
  label,
  description,
  errorMessage,
  className,
  ...controlProps
}: InputProps) {
  return (
    <BaseField.Root className={styles.Field}>
      {label ? (
        <BaseField.Label className={styles.Label}>{label}</BaseField.Label>
      ) : null}

      <BaseField.Control
        {...controlProps}
        className={[styles.Input, className].filter(Boolean).join(" ")}
      />

      {errorMessage ? (
        <BaseField.Error className={styles.Error} match="valueMissing">
          {errorMessage}
        </BaseField.Error>
      ) : null}

      {description ? (
        <BaseField.Description className={styles.Description}>
          {description}
        </BaseField.Description>
      ) : null}
    </BaseField.Root>
  );
}
