import { iChildren } from "../interfaces";
import { AuthProvider } from "./AuthContext";
import { ModalProvider } from "./ModalContext";
import { ModalProfileProvider } from "./ModalProfileContext";
import { UserProvider } from "./UserContext";

const Providers = ({ children }: iChildren) => (
  <ModalProfileProvider>
    <ModalProvider>
      <AuthProvider>
        <UserProvider>{children}</UserProvider>
      </AuthProvider>
    </ModalProvider>
  </ModalProfileProvider>
);

export default Providers;
export { useAuthContext } from "./AuthContext";
export { useModalContext } from "./ModalContext";
export { useModalProfileContext } from "./ModalProfileContext";
export { useUserContext } from "./UserContext";
