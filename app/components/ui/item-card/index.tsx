import { Link } from "react-router";
import styles from "./index.module.css";

interface ItemCardProps {
  image: string;
  name: string;
  link: string;
}

export function ItemCard({ image, name, link }: ItemCardProps) {
  return (
    <Link to={link}>
      <article className={styles.article}>
        <img className={styles.image} src={image} alt={name} />
        <div className={styles.content}>
          <h3>{name}</h3>
        </div>
      </article>
    </Link>
  );
}
