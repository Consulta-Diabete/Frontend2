import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AuthRequest } from "../model/auth/auth-request";
import type { RequestStatus } from "../model/request-status";
import type { AuthTokenDTO } from "../model/auth/auth-token-response-dto";
import {
  getItemAsync,
  setItemAsync,
  deleteItemAsync,
} from "../utils/useStorageState";
import { api } from "../service/axios";
import type { AuthTokenResponse } from "../model/auth/auth-token.response";
import { decodeJwt } from "../service/jwt-decode";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  signIn: (data: AuthRequest) => Promise<void>;
  signOut: () => void;
  sessionUser: AuthTokenDTO | null;
  requestStatus: RequestStatus;
  session?: string | null;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [sessionUser, setSessionUser] = useState<AuthTokenDTO | null>(null);
  const [session, setSession] = useState<string | null>(null);

  const [requestStatus, setRequestStatus] = useState<RequestStatus>({
    message: "",
    status: "idle",
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [storedToken, storedUserJson] = await Promise.all([
          getItemAsync("token"),
          getItemAsync("user"),
        ]);

        if (!mounted) return;

        if (storedToken) {
          setSession(storedToken);
          api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
        } else {
          delete api.defaults.headers.common.Authorization;
        }

        if (storedUserJson) {
          try {
            const parsed = JSON.parse(storedUserJson) as AuthTokenDTO;
            setSessionUser(parsed);
          } catch {
            setSessionUser(null);
          }
        } else {
          setSessionUser(null);
        }
      } catch {
        setSession(null);
        setSessionUser(null);
        delete api.defaults.headers.common.Authorization;
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const signIn = async (data: AuthRequest) => {
    setRequestStatus({ status: "pending", message: "" });
    console.log("entrei 1");

    try {
      const response = await api.post("/auth/login", data);
      console.log("entrei 2 " + response);

      setRequestStatus({ status: "succeeded", message: "" });

      const token: string | undefined = response?.data?.token;

      console.log("🔐 TOKEN RECEBIDO:", token);
      if (!token) throw new Error("Token não retornado pelo servidor.");

      const decoded = decodeJwt<AuthTokenResponse>(token);
      console.log("🧩 TOKEN DECODED:", decoded);

      if (!decoded?.user?.id) throw new Error("Payload do token inválido.");

      const userDto: AuthTokenDTO = { id: decoded.user.id };

      setSessionUser(userDto);
      setSession(token);

      await Promise.all([
        setItemAsync("token", token),
        setItemAsync("user", JSON.stringify(userDto)),
      ]);

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      setRequestStatus({ status: "idle", message: "" });
    } catch (error: any) {
      console.log("deu erroooo aquiiii");

      const message =
        error?.message || error?.code || "Erro inesperado. Tente novamente.";
      setRequestStatus({ status: "failed", message });
      alert(message);
      setRequestStatus({ status: "idle", message: "" });
      throw error;
    }
  };

  const signOut = () => {
    setSessionUser(null);
    setSession(null);

    deleteItemAsync("token");
    deleteItemAsync("user");

    delete api.defaults.headers.common.Authorization;
  };

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, sessionUser, requestStatus, session }}
    >
      {children}
    </AuthContext.Provider>
  );
};
