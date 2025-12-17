import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('/auth/connect', 'routes/auth-connect.tsx'),
  route('/auth/login', 'routes/auth-login.tsx'),
  route('/:mediaType/:id', 'routes/media-details.tsx'),
] satisfies RouteConfig;
