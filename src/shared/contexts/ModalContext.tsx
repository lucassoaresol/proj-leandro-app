import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
  MouseEvent,
} from "react";
import { iChildren } from "../interfaces";

interface iModalContextData {
  anchorEl: HTMLElement | null;
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
  openMenu: boolean;
  openEditProfile: boolean;
  setOpenEditProfile: Dispatch<SetStateAction<boolean>>;
  openEditPassword: boolean;
  setOpenEditPassword: Dispatch<SetStateAction<boolean>>;
  handleOpenMenu: () => void;
  handleOpenEditProfile: () => void;
  handleOpenEditPassword: () => void;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ModalContext = createContext({} as iModalContextData);

export const ModalProvider = ({ children }: iChildren) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openMenu = useMemo(() => !!anchorEl, [anchorEl]);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openEditPassword, setOpenEditPassword] = useState(false);
  const handleOpenMenu = () => setAnchorEl(null);
  const handleOpenEditProfile = () => {
    setOpenEditProfile(!openEditProfile);
    setAnchorEl(null);
  };
  const handleOpenEditPassword = () => {
    setOpenEditPassword(!openEditPassword);
    setAnchorEl(null);
  };
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <ModalContext.Provider
      value={{
        anchorEl,
        handleClick,
        handleOpenEditPassword,
        handleOpenEditProfile,
        handleOpenMenu,
        openEditPassword,
        openEditProfile,
        openMenu,
        setAnchorEl,
        setOpenEditPassword,
        setOpenEditProfile,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
