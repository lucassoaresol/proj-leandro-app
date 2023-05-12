import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { iChildren, iLoginRequest } from "../interfaces";
import { postUser } from "../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface iAuthContextData {
  logout: () => void;
  isAuthenticated: boolean;
  login: (data: iLoginRequest) => Promise<void>;
}

const AuthContext = createContext({} as iAuthContextData);

export const AuthProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    const accessToken = localStorage.getItem("@ProjLeandro:token");

    if (accessToken) {
      setAccessToken(accessToken);
    } else {
      setAccessToken(undefined);
    }
  }, []);

  const handleLogin = useCallback(async (data: iLoginRequest) => {
    try {
      const { access: token } = await postUser(data);
      localStorage.setItem("@ProjLeandro:token", token);
      setAccessToken(token);
      toast.success("Login realizado com sucesso");
      navigate("/");
    } catch {
      toast.error("Combinação de Username e Senha incorretos");
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("@ProjLeandro:token");
    setAccessToken(undefined);
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);