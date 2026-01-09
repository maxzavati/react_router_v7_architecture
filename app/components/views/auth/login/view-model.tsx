import { useActionData, useNavigation } from 'react-router';
import type { action } from '~/routes/auth-login';

export function useAuthLoginViewModel() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  return {
    actionData,
    isSubmitting: navigation.state == 'submitting',
  };
}
