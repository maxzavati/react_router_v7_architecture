import { useActionData, useNavigation } from "react-router";
import type { action as authConnectAction } from "~/routes/auth-connect";

type ActionData = Awaited<ReturnType<typeof authConnectAction>>;

export function useAuthConnectViewModel() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();

  return {
    actionData,
    isError: !!actionData && !actionData.ok,
    isSubmitting: navigation.state == "submitting",
  };
}
