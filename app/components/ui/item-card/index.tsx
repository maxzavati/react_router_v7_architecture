import styles from "./index.module.css";

interface ItemCardProps {
  image: string;
  name: string;
}

export function ItemCard({ image, name }: ItemCardProps) {
  return (
    <article className={styles.article}>
      <img className={styles.image} src={image} alt="Item image" />
      <div className={styles.content}>
        <h3>{name}</h3>
      </div>
    </article>
  );
}
