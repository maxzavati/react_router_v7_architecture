import { Form } from "react-router";
import styles from "./index.module.css";
import Input from "~/components/ui/field";
import { useAuthLoginViewModel } from "./view-model";
import { CTAButton } from "~/components/ui/cta-button";

export function AuthLoginView() {
  const { isSubmitting } = useAuthLoginViewModel();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Login</h1>
        <Form method="post" className={styles.form}>
          <Input name="username" label="Username" required />
          <Input name="password" label="Password" type="password" required />
          <CTAButton type="submit">
            {isSubmitting ? "Connecting..." : "Connect"}
          </CTAButton>
        </Form>
      </div>
    </main>
  );
}
