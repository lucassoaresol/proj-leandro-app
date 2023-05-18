import { iChildren } from "../../interfaces";
import { BasePageDefault } from "./Default";
import { BasePageProfile } from "./Profile";

interface iBasePageProps extends iChildren {
  isProfile?: boolean;
  padding?: number;
  back?: string;
}

export const BasePage = ({
  isProfile,
  padding,
  back,
  children,
}: iBasePageProps) => {
  if (isProfile) {
    return <BasePageProfile back={back}>{children}</BasePageProfile>;
  }
  return <BasePageDefault padding={padding}>{children}</BasePageDefault>;
};
