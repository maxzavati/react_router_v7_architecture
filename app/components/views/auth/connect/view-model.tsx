import { useActionData, useNavigation } from 'react-router';
import type { action } from '~/routes/auth-connect';

export function useAuthConnectViewModel() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  return {
    actionData,
    isSubmitting: navigation.state == 'submitting',
  };
}
