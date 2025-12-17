import { useActionData, useNavigation } from 'react-router';
import type { action as authLoginAction } from '~/routes/auth-login';

type ActionData = Awaited<ReturnType<typeof authLoginAction>>;

export function useAuthLoginViewModel() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();

  return {
    actionData,
    isError: !!actionData && !actionData.ok,
    isSubmitting: navigation.state == 'submitting',
  };
}
