import { useFetcher } from 'react-router';
import { useGetUserOnClientSide } from '~/hooks/use-get-user';

export function useHeaderViewModel() {
  const sessionId = useGetUserOnClientSide();

  const fetcher = useFetcher<{ favorite: boolean }>();

  const isSubmitting = fetcher.state !== 'idle';

  function handleLogoutClick() {
    fetcher.submit(
      {
        intent: 'logout',
      },
      { method: 'post' }
    );
  }

  return {
    sessionId,
    isSubmitting,
    handleLogoutClick,
  };
}
