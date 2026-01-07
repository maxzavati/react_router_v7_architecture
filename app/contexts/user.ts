import { createContext } from 'react-router';
import type { AccountDetailsResponse } from '~/apis/user/types';

interface User {
  sessionId: string | null;
  account: AccountDetailsResponse | null;
}

const defaultUser: User = {
  sessionId: null,
  account: null,
};

export const userContext = createContext<User>(defaultUser);
