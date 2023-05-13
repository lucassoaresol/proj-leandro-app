import { useEffect } from "react";
import { useFormContext } from "react-hook-form-mui";
import { formatPhone } from "../../scripts";

export const ValidatePhone = () => {
  const { setValue, watch, setError, clearErrors } = useFormContext();
  const phone = watch("phone");

  useEffect(() => {
    if (typeof phone === "string") {
      setValue("phone", phone.replace(/\D/g, ""));
      if (phone.length < 10) {
        setError("phone", { message: "Precisa ter no mínimo 10 números" });
      } else {
        setValue("phone", formatPhone(phone));
        clearErrors("phone");
      }
    }
  }, [phone]);
  return <></>;
};
