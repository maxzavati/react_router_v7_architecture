import { createContext } from "react-router";

interface User {
  id: string;
  name: string;
}

export const userContext = createContext<User | null>(null);
