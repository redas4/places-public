import { createContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [account, setAccount] = useState(null);

  const resetAccount = () => {
    console.log('Context is being reset')
    setAccount(null);
  };

  useEffect(() => {
    let isMounted = true;
  
    const fetchAccountProfile = async () => {
      try {
        const response = await axios.get('/profile');
  
        if (isMounted) {
          setAccount(response.data);
        }
      } catch (error) {
        console.error('Error fetching account profile:', error);
      }
    };
  
    if (!account) {
      fetchAccountProfile();
    }
  
    return () => {
      isMounted = false;
    };
  }, [account]);
  
  const contextValue = useMemo(() => ({ account, setAccount, resetAccount }), [account, setAccount]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}
