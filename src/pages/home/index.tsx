import { BasePage } from "../../shared/components";
import { useUserContext } from "../../shared/contexts";
import { DashboardAdmin } from "./DashboardAdmin";
import { DashboardCommon } from "./DashboardCommon";
import { DashboardManager } from "./DashboardManager";

export const Home = () => {
  const { userData } = useUserContext();
  if (userData) {
    switch (userData.role) {
      case "Administrator":
        return (
          <BasePage>
            <DashboardAdmin />
          </BasePage>
        );

      case "Manager":
        return (
          <BasePage>
            <DashboardManager />
          </BasePage>
        );

      default:
        return (
          <BasePage>
            <DashboardCommon />
          </BasePage>
        );
    }
  }
  return <></>;
};
