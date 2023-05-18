import { iChildren } from "../interfaces";
import { AuthProvider } from "./AuthContext";
import { ModalProvider } from "./ModalContext";
import { SchemeProvider } from "./SchemeContext";
import { UserProvider } from "./UserContext";

const Providers = ({ children }: iChildren) => (
  <ModalProvider>
    <AuthProvider>
      <UserProvider>
        <SchemeProvider>{children}</SchemeProvider>
      </UserProvider>
    </AuthProvider>
  </ModalProvider>
);

export default Providers;
export { useAuthContext } from "./AuthContext";
export { useModalContext } from "./ModalContext";
export { useSchemeContext } from "./SchemeContext";
export { useUserContext } from "./UserContext";
