import { Navigate, Route, Routes } from "react-router-dom";
import {
  AcceptUser,
  CreateCriterion,
  CreateDepart,
  CreatePosition,
  CreateScheme,
  CreateUser,
  First,
  Home,
  ListUser,
  Login,
  Register,
  Scheme,
  User,
} from "../pages";
import { useAuthContext } from "../shared/contexts";

const AppRoutes = () => {
  const { isAuthenticated, userData } = useAuthContext();

  if (isAuthenticated) {
    if (userData) {
      if (!userData.is_first_access) {
        return (
          <Routes>
            <Route path="/first" element={<First />} />
            <Route path="*" element={<Navigate to="/first" />} />
          </Routes>
        );
      }
      switch (userData.role) {
        case "Administrator":
          return (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user" element={<User />} />
              <Route
                path="/user/create"
                element={<CreateUser back="/user" />}
              />
              <Route
                path="/user/create/depart"
                element={<CreateDepart back="/user" />}
              />
              <Route
                path="/user/create/postion"
                element={<CreatePosition back="/user" />}
              />
              <Route
                path="/user/accept"
                element={<AcceptUser back="/user" />}
              />
              <Route path="/user/list" element={<ListUser back="/user" />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/scheme" element={<Scheme />} />
              <Route
                path="/scheme/create/criterion"
                element={<CreateCriterion back="/scheme" />}
              />
              <Route
                path="/scheme/create"
                element={<CreateScheme back="/scheme" />}
              />
            </Routes>
          );
        case "Manager":
          return (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/scheme" element={<Scheme />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          );
      }
    }
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
