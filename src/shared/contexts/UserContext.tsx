import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  iAcceptUser,
  iAcceptUserRequest,
  iChildren,
  iDepartment,
  iDepartmentPositionData,
  iDepartmentRequest,
  iPosition,
  iPositionRequest,
  iUser,
  iUserAdminRequest,
  iUserIsDefaultRequest,
  iUserPasswordRequest,
  iUserRequest,
  iUserUpdateRequest,
} from "../interfaces";
import {
  apiUsingNow,
  patchUser,
  postUserCreate,
  postUserCreateDepart,
  postUserCreatePosition,
} from "../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthContext, useModalContext, useModalProfileContext } from ".";

interface iUserContextData {
  create: (data: iUserRequest) => Promise<void>;
  createUser: (data: iUserAdminRequest) => Promise<void>;
  createDepart: (data: iDepartmentRequest) => Promise<void>;
  createPosition: (data: iPositionRequest) => Promise<void>;
  acceptUser: (data: iAcceptUserRequest) => void;
  editPassword: (id: number, data: iUserPasswordRequest) => Promise<void>;
  isDefaultUser: (id: number, data: iUserIsDefaultRequest) => Promise<void>;
  updateUser: (id: number, data: iUserUpdateRequest) => Promise<void>;
  userData: iUser | undefined;
  acceptUserData: iAcceptUser[] | undefined;
  departments: iDepartmentPositionData[] | undefined;
  positions: iDepartmentPositionData[] | undefined;
  loadingDepartments: boolean;
  loadingPositions: boolean;
}

const UserContext = createContext({} as iUserContextData);

export const UserProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { accessToken } = useAuthContext();
  const { setOpenEditProfile, setOpenEditPassword } = useModalProfileContext();
  const {
    openUser,
    openAcceptUser,
    setOpenDepart,
    setOpenPosition,
    setOpenUser,
    setOpenAcceptUser,
  } = useModalContext();
  const [userData, setUserData] = useState<iUser>();
  const [acceptUserData, setAcceptUserData] = useState<iAcceptUser[]>();
  const [departments, setDepartments] = useState<iDepartmentPositionData[]>();
  const [positions, setPositions] = useState<iDepartmentPositionData[]>();
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [loadingPositions, setLoadingPositions] = useState(true);

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
  }, []);

  useEffect(() => {
    if (accessToken) {
      apiUsingNow
        .get<iUser>("users/profile/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => setUserData(res.data));
    }
  }, [accessToken]);

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

  useEffect(() => {
    if (accessToken) {
      apiUsingNow
        .get<{ results: iUser[] }>("users/?is_active=false&is_expired=false", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          setAcceptUserData(
            res.data.results.map((el) => {
              return { ...el, label: el.username };
            })
          );
        });
    }
  }, [accessToken, openAcceptUser]);

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

  const handleAcceptUser = useCallback(({ users }: iAcceptUserRequest) => {
    try {
      users.forEach(async (el) => {
        const data = new FormData();
        data.append("is_active", "true");
        await patchUser(el, data);
      });

      toast.success("Conta ativada com sucesso");
      setOpenAcceptUser(false);
    } catch {
      toast.error("Conta não foi possível ser ativada no momento!");
      setOpenAcceptUser(false);
    }
  }, []);

  const handleIsDefaultUser = useCallback(
    async (id: number, data: iUserIsDefaultRequest) => {
      try {
        const user = await patchUser(id, data);
        toast.success("Conta ativada com sucesso");
        setUserData(user);
        navigate("/");
      } catch {
        toast.error("Conta não foi possível ser ativada no momento!");
      }
    },
    []
  );

  const handleUpdateUser = useCallback(
    async (id: number, data: iUserUpdateRequest) => {
      try {
        const user = await patchUser(id, data);
        toast.success("Dados alterado com sucesso");
        setUserData(user);
        setOpenEditProfile(false);
      } catch {
        toast.error("Não foi possível atualizar os dados no momento!");
        setOpenEditProfile(false);
      }
    },
    []
  );

  const handlePasswordUser = useCallback(
    async (id: number, data: iUserPasswordRequest) => {
      try {
        await patchUser(id, data);
        toast.success("Senha alterada com sucesso");
        setOpenEditPassword(false);
      } catch {
        toast.error("Senha atual incorreta!");
        setOpenEditPassword(false);
      }
    },
    []
  );

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
        createDepart: handleCreateDepart,
        createPosition: handleCreatePosition,
        acceptUserData,
        acceptUser: handleAcceptUser,
        isDefaultUser: handleIsDefaultUser,
        updateUser: handleUpdateUser,
        editPassword: handlePasswordUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
