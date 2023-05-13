import { useEffect } from "react";
import { useFormContext } from "react-hook-form-mui";
import { apiUsingNow } from "../../services";
import { useUserContext } from "../../contexts";

interface iValidateUsernameProps {
  isProfile?: boolean;
}

export const ValidateUsername = ({ isProfile }: iValidateUsernameProps) => {
  const { watch, setError, clearErrors } = useFormContext();
  const { userData } = useUserContext();
  const username = watch("username");

  useEffect(() => {
    apiUsingNow.get(`/users/username/${username}/`).then((res) => {
      const id = res.data.id;
      if (id) {
        if (isProfile) {
          if (userData?.id !== id) {
            setError("username", { message: "Username não está disponível" });
          }
        } else {
          setError("username", { message: "Username não está disponível" });
        }
      } else {
        clearErrors("username");
      }
    });
  }, [username]);
  return <></>;
};
