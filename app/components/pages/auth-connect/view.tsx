import { CTAButton } from "~/components/ui/cta-button";
import { Form, useNavigation } from "react-router";
import styles from "./index.module.css";
import type { CreateRequestTokenResponse } from "~/apis/auth/endpoints";

export function AuthConnectPageView({
  actionData,
}: {
  actionData: CreateRequestTokenResponse | null;
}) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

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
