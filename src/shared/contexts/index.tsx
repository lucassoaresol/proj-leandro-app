import { iChildren } from "../interfaces";
import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";

const Providers = ({ children }: iChildren) => (
  <AuthProvider>
    <UserProvider>{children}</UserProvider>
  </AuthProvider>
);

export default Providers;
export { useAuthContext } from "./AuthContext";
export { useUserContext } from "./UserContext";
