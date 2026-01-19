import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useNavigate,
} from 'react-router';
import type { Route } from './+types/root';
import { authMiddleware } from './middlewares/auth';
import { userContext } from './contexts/user';
import './styles/reset.css';
import './styles/app.css';
import { Footer } from './components/templates/footer';
import { Header } from './components/templates/header';
import { timingMiddleware } from './middlewares/timing';
import { logoutAction } from './actions/logout';
import { getSession } from './session.server';

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
  timingMiddleware,
];

export async function loader({ context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  return { user };
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const sessionId = session.get('sessionId');

  const formData = await request.formData();

  if (formData.get('intent') === 'logout') {
    return logoutAction({ sessionId: sessionId ?? null, session });
  }
}

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <div className="root">{children}</div>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  // let stack: string | undefined;

  const navigate = useNavigate();

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    // stack = error.stack;
  }

  return (
    <main>
      <h1>{message}</h1>
      <p>{details}</p>
      <div>
        <button onClick={() => navigate(-1)}>Go back</button>
        <form method="get">
          <button type="submit">Reload</button>
        </form>
      </div>
      {/* {stack ? (
        <pre>
          <code>{stack}</code>
        </pre>
      ) : null} */}
    </main>
  );
}
