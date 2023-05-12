import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  iChildren,
  iDepartment,
  iDepartmentPositionData,
  iDepartmentRequest,
  iPosition,
  iPositionRequest,
  iUser,
  iUserAdminRequest,
  iUserRequest,
} from "../interfaces";
import {
  apiUsingNow,
  apiUsingNowWithToken,
  postUserCreate,
  postUserCreateDepart,
  postUserCreatePosition,
} from "../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface iUserContextData {
  create: (data: iUserRequest) => Promise<void>;
  createUser: (data: iUserAdminRequest) => Promise<void>;
  createDepart: (data: iDepartmentRequest) => Promise<void>;
  createPosition: (data: iPositionRequest) => Promise<void>;
  userData: iUser | undefined;
  departments: iDepartmentPositionData[] | undefined;
  positions: iDepartmentPositionData[] | undefined;
  loadingDepartments: boolean;
  loadingPositions: boolean;
  openDepart: boolean;
  openPosition: boolean;
  openUser: boolean;
  handleOpenDepart: () => void;
  handleOpenPosition: () => void;
  handleOpenUser: () => void;
}

const UserContext = createContext({} as iUserContextData);

export const UserProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<iUser>();
  const [departments, setDepartments] = useState<iDepartmentPositionData[]>();
  const [positions, setPositions] = useState<iDepartmentPositionData[]>();
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [loadingPositions, setLoadingPositions] = useState(true);
  const [openDepart, setOpenDepart] = useState(false);
  const [openPosition, setOpenPosition] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const handleOpenDepart = () => setOpenDepart(!openDepart);
  const handleOpenPosition = () => setOpenPosition(!openPosition);
  const handleOpenUser = () => setOpenUser(!openUser);

  useEffect(() => {
    apiUsingNow.get<{ results: iDepartment[] }>("departments/").then((res) => {
      setDepartments(
        res.data.results.map((el) => {
          return { ...el, label: el.name };
        })
      );
      setLoadingDepartments(false);
    });
    apiUsingNow.get<{ results: iPosition[] }>("positions/").then((res) => {
      setPositions(
        res.data.results.map((el) => {
          return { ...el, label: el.name };
        })
      );
      setLoadingPositions(false);
    });
    apiUsingNowWithToken
      .get<{
        results: [iUser];
      }>("users/profile/")
      .then((res) => setUserData(res.data.results[0]));
  }, []);

  useEffect(() => {
    apiUsingNow.get<{ results: iDepartment[] }>("departments/").then((res) => {
      setDepartments(
        res.data.results.map((el) => {
          return { ...el, label: el.name };
        })
      );
      setLoadingDepartments(false);
    });
    apiUsingNow.get<{ results: iPosition[] }>("positions/").then((res) => {
      setPositions(
        res.data.results.map((el) => {
          return { ...el, label: el.name };
        })
      );
      setLoadingPositions(false);
    });
  }, [openUser]);

  const handleCreateUser = useCallback(async (data: iUserRequest) => {
    try {
      await postUserCreate(data);
      toast.success(
        "Conta criada com sucesso, aguarde até o Administrador autorizar seu acesso!"
      );
      navigate("/login");
    } catch {
      toast.error("Conta já criada, entre em contato com o suporte!");
    }
  }, []);

  const handleCreateDepart = useCallback(async (data: iDepartmentRequest) => {
    try {
      await postUserCreateDepart(data);
      toast.success("Departamento criado com sucesso!");
      setOpenDepart(false);
    } catch {
      toast.error("Departamento não foi possível ser criado no momento!");
      setOpenDepart(false);
    }
  }, []);

  const handleCreatePosition = useCallback(async (data: iPositionRequest) => {
    try {
      await postUserCreatePosition(data);
      toast.success("Cargo criado com sucesso!");
      setOpenPosition(false);
    } catch {
      toast.error("Cargo não foi possível ser criado no momento!");
      setOpenPosition(false);
    }
  }, []);

  const handleCreateUserAdmin = useCallback(async (data: iUserAdminRequest) => {
    try {
      await postUserCreate(data);
      toast.success("Conta criada com sucesso");
      setOpenUser(false);
    } catch {
      toast.error("Conta não foi possível ser criada no momento!");
      setOpenUser(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        create: handleCreateUser,
        createUser: handleCreateUserAdmin,
        userData,
        departments,
        loadingDepartments,
        loadingPositions,
        positions,
        handleOpenDepart,
        handleOpenPosition,
        handleOpenUser,
        openDepart,
        openPosition,
        openUser,
        createDepart: handleCreateDepart,
        createPosition: handleCreatePosition,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
