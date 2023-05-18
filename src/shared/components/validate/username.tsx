import { useEffect } from "react";
import { useFormContext } from "react-hook-form-mui";
import { apiUsingNow } from "../../services";
import { useAuthContext } from "../../contexts";
import { Button } from "@mui/material";

interface iValidateUsernameProps {
  isProfile?: boolean;
}

export const ValidateUsername = ({ isProfile }: iValidateUsernameProps) => {
  const { watch, setError, clearErrors, formState } = useFormContext();
  const { userData } = useAuthContext();
  const username = watch("username");
  const { isValid } = formState;

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
  return (
    <Button variant="contained" type="submit" disabled={!isValid} fullWidth>
      Enviar
    </Button>
  );
};
