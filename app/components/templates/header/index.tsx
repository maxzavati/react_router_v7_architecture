import { Form, Link } from "react-router";
import styles from "./index.module.css";
import RouterIcon from "/public/router-logo.svg?react";
import { Button } from "~/components/ui/button";

export function Header() {
  return (
    <header className={styles.header}>
      <Link to="/">
        <RouterIcon />
      </Link>
      <Form method="post">
        <Button type="submit">Logout</Button>
      </Form>
    </header>
  );
}
