import styles from './index.module.css';

interface RatingMeterProps {
  value: number;
  size?: 'sm' | 'lg';
  className?: string;
}

export function RatingMeter({
  value,
  size = 'sm',
  className = '',
}: RatingMeterProps) {
  const percent = Math.round((value ?? 0) * 10); // convert to %
  const circleDash = 283;
  const strokeDashoffset = circleDash - (percent / 100) * circleDash;

  let meterColor = 'good';
  if (percent < 50) meterColor = 'bad';
  else if (percent < 70) meterColor = 'neutral';

  const wrapperClassName =
    size === 'lg'
      ? `${styles.wrapper} ${styles.wrapperLarge}`
      : `${styles.wrapper} ${styles.wrapperSmall}`;

  const valueClassName =
    size === 'lg'
      ? `${styles.value} ${styles.valueLarge}`
      : `${styles.value} ${styles.valueSmall}`;

  return (
    <div
      className={`${wrapperClassName} ${className}`}
      aria-label={`Rating ${percent}%`}
    >
      <svg className={styles.svg} viewBox="0 0 100 100">
        <circle className={styles.track} cx="50" cy="50" r="45" />
        <circle
          className={`${styles.progress} ${styles[meterColor]}`}
          cx="50"
          cy="50"
          r="45"
          strokeDasharray={circleDash}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <span className={valueClassName}>{percent}</span>
    </div>
  );
}
