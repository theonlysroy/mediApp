import {createContext, useContext, useState} from 'react';

interface AuthContextProps {
  token: string | null;
  login: (accessToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  token: null,
  login: () => {},
  logout: () => {},
});

const AuthProvider: React.FC<{children: any}> = ({children}) => {
  const [token, setToken] = useState<string | null>('token');

  const login = (accessToken: string) => {
    try {
      setToken(accessToken);
    } catch (error: any) {
      console.log('Login error ==>', error.message);
    }
  };

  const logout = async () => {
    try {
      setToken(null);
    } catch (error: any) {
      console.log('Logout error ==>', error.message);
    }
  };

  // const isLoggedIn = async () => {
  //   try {
  //   } catch (error: any) {
  //     console.log('Logged in checking error ==>', error.message);
  //   }
  // };

  const values = {token, login, logout};
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext<AuthContextProps>(AuthContext);
