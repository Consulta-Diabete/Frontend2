import { createContext, useContext, useState, type ReactNode } from "react";
import type { GlucoseResponse } from "../model/glucose/glucose.response";
import type { RequestStatus } from "../model/request-status";
import type { GlucoseByIdResponse } from "../model/glucose/glucose-by-id.response";
import type { GlucoseRequest } from "../model/glucose/glucose.request";
import { useAuth } from "./AuthContext";
import { api } from "../service/axios";

interface GlucoseProviderProps {
  children: ReactNode;
}

interface GlucoseContextProps {
  glucose: GlucoseByIdResponse | null;

  getCurrentUserGlucose: () => Promise<GlucoseResponse | void>;
  getGlucoseByIdRequestStatus: RequestStatus;

  createGlucose: (data: GlucoseRequest) => Promise<void>;
  createGlucoseRequestStatus: RequestStatus;
}

const GlucoseContext = createContext<GlucoseContextProps>(
  {} as GlucoseContextProps
);

export const useGlucose = () => {
  return useContext(GlucoseContext);
};

export const GlucoseProvider = ({ children }: GlucoseProviderProps) => {
  const [glucose, setGlucose] = useState<GlucoseByIdResponse | null>(null);

  const { sessionUser } = useAuth();

  const [getGlucoseByIdRequestStatus, setGetGlucoseByIdRequestStatus] =
    useState<RequestStatus>({ status: "idle" });

  const [createGlucoseRequestStatus, setCreateGlucoseRequestStatus] =
    useState<RequestStatus>({ status: "idle" });

  const getCurrentUserGlucose = async () => {
    setGetGlucoseByIdRequestStatus({
      status: "pending",
    });
    try {
      const response = await api.get(`/glucose/get`, {
        params: {
          // UserId: sessionUser?.id,
          userId: "a342b80c-ae92-4f07-b0f6-526e2216817c",
        },
      });
      setGlucose(response.data);
      setGetGlucoseByIdRequestStatus({
        status: "succeeded",
      });
      return response.data;
    } catch (error: any) {
      const message =
        error?.message || error?.code || "Erro inesperado. Tente novamente.";

      console.log(message);

      setGetGlucoseByIdRequestStatus({
        status: "failed",
        message,
      });

      alert(message);

      return;
    }
  };

  const createGlucose = async () => {
    setCreateGlucoseRequestStatus({ status: "pending" });

    try {
      await api.post("glucose/create");
      setCreateGlucoseRequestStatus({ status: "succeeded" });
    } catch (error: any) {
      const message =
        error?.message || error?.code || "Erro inesperado. Tente novamente.";
      setCreateGlucoseRequestStatus({ status: "failed", message });
      alert(message);
    }
  };

  return (
    <GlucoseContext.Provider
      value={{
        glucose,
        getCurrentUserGlucose,
        createGlucose,
        createGlucoseRequestStatus,
        getGlucoseByIdRequestStatus,
      }}
    >
      {children}
    </GlucoseContext.Provider>
  );
};
