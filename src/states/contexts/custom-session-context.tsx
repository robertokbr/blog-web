import { createContext, useCallback, useEffect, useState } from "react";
import { Api } from "../../services/api";
import { UserDto } from "../../services/api/models/UserDto";
import { useToast } from "@chakra-ui/react";

export interface CustomSessionContextProps {
  data: { user: UserDto };
  validateToken(token: string): Promise<boolean>;
  logout(): void;
}

export const CustomSessionContext = createContext({} as CustomSessionContextProps);

const api = new Api("CustomSessionContext");

export function CustomSessionProvider({ children }) {
  const [data, setData] = useState<{ user: UserDto }>();

  const validateToken = useCallback(async (token: string) => {
    const data = await api.getMe(token);

    if (data) {
        setData({ user: data });
        Api.token = token;
        sessionStorage.setItem('token', token);
        return true;
      }

      sessionStorage.removeItem('token');
      return false;
  }, []);

  const logout = () => {
    sessionStorage.removeItem('token');
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) validateToken(token);
  }, [validateToken]);


  return (
    <CustomSessionContext.Provider value={{ data, validateToken, logout }}>
      {children}
    </CustomSessionContext.Provider>
  );
}
