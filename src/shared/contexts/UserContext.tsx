import {
  Dispatch,
  SetStateAction,
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
import { useAuthContext, useModalContext } from ".";
import { FieldValues } from "react-hook-form";

interface iUserContextData {
  create: (data: iUserRequest) => Promise<void>;
  createUser: (data: iUserAdminRequest) => Promise<void>;
  createDepart: (data: iDepartmentRequest) => Promise<void>;
  createPosition: (data: iPositionRequest) => Promise<void>;
  acceptUser: (data: iAcceptUserRequest) => void;
  editPassword: (id: number, data: iUserPasswordRequest) => Promise<void>;
  first: (id: number, data: iUserIsDefaultRequest) => Promise<void>;
  updateUser: (id: number, data: iUserUpdateRequest) => Promise<void>;
  updateAdminUser: (id: number, data: FieldValues) => Promise<void>;
  acceptUserData: iAcceptUser[] | undefined;
  departments: iDepartmentPositionData[] | undefined;
  positions: iDepartmentPositionData[] | undefined;
  loadingDepartments: boolean;
  loadingPositions: boolean;
  updateUserData: iUser | undefined;
  setUpdateUserData: Dispatch<SetStateAction<iUser | undefined>>;
}

const UserContext = createContext({} as iUserContextData);

export const UserProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setUserData, setLoading } = useAuthContext();
  const { setOpenEditProfile, setOpenEditPassword } = useModalContext();
  const [acceptUserData, setAcceptUserData] = useState<iAcceptUser[]>();
  const [departments, setDepartments] = useState<iDepartmentPositionData[]>();
  const [positions, setPositions] = useState<iDepartmentPositionData[]>();
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [loadingPositions, setLoadingPositions] = useState(true);
  const [updateUserData, setUpdateUserData] = useState<iUser>();

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
    apiUsingNow
      .get<{ results: iUser[] }>("users/?is_active=false&is_expired=false")
      .then((res) => {
        setAcceptUserData(
          res.data.results.map((el) => {
            return { ...el, label: el.username };
          })
        );
      });
  }, []);

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
      navigate("/user");
    } catch {
      toast.error("Departamento não foi possível ser criado no momento!");
      navigate("/user");
    }
  }, []);

  const handleCreatePosition = useCallback(async (data: iPositionRequest) => {
    try {
      await postUserCreatePosition(data);
      toast.success("Cargo criado com sucesso!");
      navigate("/user");
    } catch {
      toast.error("Cargo não foi possível ser criado no momento!");
      navigate("/user");
    }
  }, []);

  const handleCreateUserAdmin = useCallback(async (data: iUserAdminRequest) => {
    try {
      await postUserCreate(data);
      toast.success("Conta criada com sucesso");
      navigate("/user");
    } catch {
      toast.error("Conta não foi possível ser criada no momento!");
      navigate("/user");
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
      navigate("/user");
    } catch {
      toast.error("Conta não foi possível ser ativada no momento!");
      navigate("/user");
    }
  }, []);

  const handleFirstUser = useCallback(
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

  const handleUpdateAdminUser = useCallback(
    async (id: number, data: FieldValues) => {
      try {
        setLoading(true);
        const user = await patchUser(id, data);
        setUpdateUserData(user);
        toast.success("Sucesso ao alterar o estado do usuário");
      } catch {
        toast.error(
          "Não foi possível atualizar o estado do usuário no momento!"
        );
      } finally {
        setLoading(false);
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
        departments,
        loadingDepartments,
        loadingPositions,
        positions,
        createDepart: handleCreateDepart,
        createPosition: handleCreatePosition,
        acceptUserData,
        acceptUser: handleAcceptUser,
        first: handleFirstUser,
        updateUser: handleUpdateUser,
        editPassword: handlePasswordUser,
        updateUserData,
        setUpdateUserData,
        updateAdminUser: handleUpdateAdminUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
