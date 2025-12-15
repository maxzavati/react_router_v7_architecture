import { Form } from "react-router";
import { Button } from "~/components/ui/button";
import styles from "./index.module.css";
import { useAuthConnectViewModel } from "./view-model";
import { Message } from "~/components/ui/message";

export function AuthConnectPageView() {
  const { isSubmitting, isError } = useAuthConnectViewModel();

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>Let's Authorize</h1>
          <Form method="post">
            <Button type="submit">
              {isSubmitting ? "Connecting..." : "Connect"}
            </Button>
          </Form>
          {isError ? (
            <Message variant="error">
              An error occurred during connection. Please try again.
            </Message>
          ) : null}
        </div>
      </main>
    </>
  );
}
