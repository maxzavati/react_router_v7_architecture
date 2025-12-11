import { Form } from "react-router";
import { CTAButton } from "~/components/ui/cta-button";
import styles from "./index.module.css";
import { useAuthConnectViewModel } from "./view-model";

export function AuthConnectPageView() {
  const { isSubmitting } = useAuthConnectViewModel();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Let's Authorize</h1>
        <Form method="post">
          <CTAButton type="submit">
            {isSubmitting ? "Connecting..." : "Connect"}
          </CTAButton>
        </Form>
      </div>
    </main>
  );
}
