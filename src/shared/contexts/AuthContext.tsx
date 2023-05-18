import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { iChildren, iLoginRequest, iUser } from "../interfaces";
import { apiUsingNow, postUser } from "../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useModalContext } from "./ModalContext";
import { Backdrop, CircularProgress, useTheme } from "@mui/material";

interface iAuthContextData {
  logout: () => void;
  isAuthenticated: boolean;
  login: (data: iLoginRequest) => Promise<void>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  userData: iUser | undefined;
  setUserData: Dispatch<SetStateAction<iUser | undefined>>;
}

const AuthContext = createContext({} as iAuthContextData);

export const AuthProvider = ({ children }: iChildren) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setAnchorEl } = useModalContext();
  const [accessToken, setAccessToken] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<iUser>();

  useEffect(() => {
    const accessToken = localStorage.getItem("@ProjLeandro:token");

    if (accessToken) {
      setAccessToken(accessToken);
    } else {
      setAccessToken(undefined);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      setLoading(true);
      apiUsingNow
        .get<iUser>("users/profile/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          apiUsingNow.defaults.headers.authorization = `Bearer ${accessToken}`;
          setUserData(res.data);
          setLoading(false);
        })
        .catch(() => {
          setAccessToken(undefined);
          setUserData(undefined);
          setLoading(false);
        });
    }
  }, [accessToken]);

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
    setAnchorEl(null);
    navigate("/login");
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
        setLoading,
        setUserData,
        userData,
      }}
    >
      {children}
      <Backdrop
        sx={{
          color: theme.palette.secondary.main,
          zIndex: theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
