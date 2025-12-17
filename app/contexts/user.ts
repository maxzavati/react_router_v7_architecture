import { createContext } from 'react-router';

interface User {
  sessionId: string | undefined;
}

export const userContext = createContext<User | null>(null);
