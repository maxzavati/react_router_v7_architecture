import type { PropsWithChildren } from "react";
import styles from "./index.module.css";

type ScrollDirection = "horizontal" | "vertical" | "both";

interface ScrollContainerProps extends PropsWithChildren {
  scrollDirection?: ScrollDirection;
  className?: string;
}

export function ScrollContainer({
  children,
  className,
  scrollDirection = "horizontal",
}: ScrollContainerProps) {
  const classes = [
    styles.container,
    styles[`direction-${scrollDirection}`],
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}
