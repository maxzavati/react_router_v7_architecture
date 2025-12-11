import { Field } from "@base-ui-components/react/field";
import type React from "react";
import styles from "./index.module.css";

interface InputProps extends React.ComponentProps<typeof Field.Control> {
  label?: string;
  description?: string;
  errorMessage?: string;
}

export default function Input({
  label,
  description,
  errorMessage,
  className,
  ...controlProps
}: InputProps) {
  return (
    <Field.Root className={styles.Field}>
      {label ? (
        <Field.Label className={styles.Label}>{label}</Field.Label>
      ) : null}

      <Field.Control
        {...controlProps}
        className={[styles.Input, className].filter(Boolean).join(" ")}
      />

      {errorMessage ? (
        <Field.Error className={styles.Error} match="valueMissing">
          {errorMessage}
        </Field.Error>
      ) : null}

      {description ? (
        <Field.Description className={styles.Description}>
          {description}
        </Field.Description>
      ) : null}
    </Field.Root>
  );
}
