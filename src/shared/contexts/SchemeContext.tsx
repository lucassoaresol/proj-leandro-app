import { createContext, useCallback, useContext } from "react";
import { iChildren, iCriterionRequest, iSchemeRequest } from "../interfaces";
import { postCriterion, postScheme } from "../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface iSchemeContextData {
  createCriterion: (data: iCriterionRequest) => Promise<void>;
  createScheme: (data: iSchemeRequest) => Promise<void>;
}

const SchemeContext = createContext({} as iSchemeContextData);

export const SchemeProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();

  const handleCreateCriterion = useCallback(async (data: iCriterionRequest) => {
    try {
      await postCriterion(data);
      toast.success("Critério criada com sucesso!");
      navigate("/scheme");
    } catch {
      toast.error("Critério não foi possível ser criado no momento!");
    }
  }, []);

  const handleCreateScheme = useCallback(async (data: iSchemeRequest) => {
    try {
      await postScheme(data);
      toast.success("Plano criada com sucesso!");
      navigate("/scheme");
    } catch {
      toast.error("Plano não foi possível ser criado no momento!");
    }
  }, []);

  return (
    <SchemeContext.Provider
      value={{
        createCriterion: handleCreateCriterion,
        createScheme: handleCreateScheme,
      }}
    >
      {children}
    </SchemeContext.Provider>
  );
};

export const useSchemeContext = () => useContext(SchemeContext);
