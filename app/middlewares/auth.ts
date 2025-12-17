import type { Route } from '../+types/root';
import { userContext } from '~/contexts/user';
import { sessionIdCookie } from '~/apis/auth/utils';
import { redirect, type DataStrategyResult } from 'react-router';

// Server-side Authentication Middleware
export async function authMiddleware({ request, context }: Route.ActionArgs) {
  const pathname = new URL(request.url).pathname;
  const cookieHeader = request.headers.get('Cookie');
  const sessionId: string | undefined =
    await sessionIdCookie.parse(cookieHeader);

  context.set(userContext, { sessionId });

  if (pathname.startsWith('/auth')) {
    if (sessionId) {
      throw redirect('/');
    }
    return;
  }

  if (pathname.startsWith('/profile') && !sessionId) {
    throw redirect('/auth/connect');
  }
}

// Client-side timing middleware
export async function timingMiddleware(
  { context }: Route.ActionArgs,
  next: () => Promise<Record<string, DataStrategyResult>>
) {
  const start = performance.now();
  await next();
  const duration = performance.now() - start;
  console.log(`Navigation took ${duration}ms`);
}
