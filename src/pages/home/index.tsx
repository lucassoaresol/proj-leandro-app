import { useUserContext } from "../../shared/contexts";
import { Dashboard } from "./Dashboard";
import { DashboardAdmin } from "./DashboardAdmin";
import { DashboardManager } from "./DashboardManager";

export const Home = () => {
  const { userData } = useUserContext();
  if (userData) {
    switch (userData.role) {
      case "Administrator":
        return <DashboardAdmin />;

      case "Manager":
        return <DashboardManager />;

      default:
        return <Dashboard />;
    }
  }
  return <></>;
};
