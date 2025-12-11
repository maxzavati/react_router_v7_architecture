import type { PropsWithChildren } from "react";
import styles from "./index.module.css";

export function DynamicGrid({ children }: PropsWithChildren) {
  return <div className={styles.grid}>{children}</div>;
}
