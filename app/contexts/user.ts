import { createContext } from 'react-router';
import type { AccountDetailsResponse } from '~/apis/user/types';

interface User {
  account: AccountDetailsResponse | null | undefined;
}

export const userContext = createContext<User | null>(null);
