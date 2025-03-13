import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from 'hooks/agenda/Layout/useUser';

interface UserContextType {
  userId: string | undefined;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { intraId } = useUser() || {};
  const [userId, setUserId] = useState(intraId);

  useEffect(() => {
    setUserId(intraId);
  }, [intraId]);

  return (
    <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>
  );
};

export const useUserId = () => useContext(UserContext);
