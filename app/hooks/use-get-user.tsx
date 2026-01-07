import { useRouteLoaderData } from 'react-router';

export function useGetUserOnClientSide() {
  const routeData = useRouteLoaderData('root');
  return routeData?.user?.sessionId ?? null;
}
