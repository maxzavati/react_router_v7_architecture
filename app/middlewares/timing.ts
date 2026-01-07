import type { Route } from '../+types/root';

import { type DataStrategyResult } from 'react-router';

export async function timingMiddleware(
  { context }: Route.ActionArgs,
  next: () => Promise<Record<string, DataStrategyResult>>
) {
  const start = performance.now();
  await next();
  const duration = performance.now() - start;
  console.log(`Navigation took ${duration}ms`);
}
