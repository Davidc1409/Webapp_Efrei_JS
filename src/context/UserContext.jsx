import { createContext, useContext, useState } from 'react';

export const UserContext = createContext(null);

export const useAuth = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userInfo) => {
    setUser(userInfo);
    localStorage.setItem('user', JSON.stringify({ ...userInfo}));

  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');

  };

  const getUserInfos = () => {
    if (user) {
      return user;
    } else {
      const storeUser = localStorage.getItem('user');
      if (storeUser) {
        setUser(JSON.parse(storeUser));
        return storeUser;
      }
    }
  };

  const isAuthenticated = !!user;

  return (
    <UserContext.Provider value={{ user, login, logout, isAuthenticated, getUserInfos }}>
      {children}
    </UserContext.Provider>
  );
};
