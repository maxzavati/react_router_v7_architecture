import type { ReactNode } from "react";
import styles from "./index.module.css";

type MessageVariant = "success" | "error" | "warning";

interface MessageProps {
  children: ReactNode;
  variant: MessageVariant;
}

export function Message({ children, variant }: MessageProps) {
  return <p className={styles[variant]}>{children}</p>;
}
