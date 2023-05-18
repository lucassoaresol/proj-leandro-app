import { useAuthContext } from "../../shared/contexts";
import { DashboardAdmin } from "./DashboardAdmin";
import { DashboardCommon } from "./DashboardCommon";
import { DashboardManager } from "./DashboardManager";

export const Home = () => {
  const { userData } = useAuthContext();
  if (userData) {
    switch (userData.role) {
      case "Administrator":
        return <DashboardAdmin />;

      case "Manager":
        return <DashboardManager />;

      default:
        return <DashboardCommon />;
    }
  }
  return <></>;
};
