import { createContext, useContext, useEffect, useState } from "react";

type User = { name: string; email: string; token: string };
type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem("app.auth");
    if (cached) setUser(JSON.parse(cached));
  }, []);

  async function login(email: string, password: string) {
    // mock de auth: aqui você poderá trocar por chamada para sua API
    await new Promise((r) => setTimeout(r, 500));
    if (!email || !password) throw new Error("Informe e-mail e senha.");
    const u: User = {
      name: email.split("@")[0],
      email,
      token: crypto.randomUUID(),
    };
    localStorage.setItem("app.auth", JSON.stringify(u));
    setUser(u);
  }

  function logout() {
    localStorage.removeItem("app.auth");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
