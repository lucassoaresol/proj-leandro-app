import { Navigate, Route, Routes } from "react-router-dom";
import { Home, IsDefault, Login, Register, User } from "../pages";
import { useAuthContext, useUserContext } from "../shared/contexts";

const AppRoutes = () => {
  const { isAuthenticated } = useAuthContext();
  const { userData } = useUserContext();
  if (isAuthenticated) {
    if (userData?.is_default) {
      return (
        <Routes>
          <Route path="/is_default" element={<IsDefault />} />
          <Route path="*" element={<Navigate to="/is_default" />} />
        </Routes>
      );
    }
    return (
      <Routes>
        <Route path="/user" element={<User />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
