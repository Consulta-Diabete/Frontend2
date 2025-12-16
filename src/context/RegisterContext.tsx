import { createContext, useContext, useState, type ReactNode } from "react";
import type { RequestStatus } from "../model/request-status";
import type { CreateUserRequest } from "../model/user/create-user.request";
import { api } from "../service/axios";

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextProps {
  createUser: (data: CreateUserRequest) => Promise<void>;
  createUserRequestStatus: RequestStatus;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [createUserRequestStatus, setCreateUserRequestStatus] =
    useState<RequestStatus>({
      message: "",
      status: "idle",
    });

  const createUser = async (data: CreateUserRequest) => {
    setCreateUserRequestStatus({ message: "", status: "pending" });

    try {
      await api.post("/user/create", data);

      setCreateUserRequestStatus({ message: "", status: "succeeded" });

      console.log(data);
    } catch (error: any) {
      console.error("Error creating user:", error?.response);
      setCreateUserRequestStatus({
        message: error?.response?.data?.message || "Error creating user",
        status: "failed",
      });
      const message =
        error?.message || error?.code || "Erro inesperado. Tente novamente.";

      console.log(message);

      setCreateUserRequestStatus({
        status: "failed",
        message,
      });

      alert(message);
    }
  };

  return (
    <UserContext.Provider value={{ createUser, createUserRequestStatus }}>
      {children}
    </UserContext.Provider>
  );
};
