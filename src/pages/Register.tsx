import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/RegisterContext";
import Button from "../presentation/atomic/atoms/Button";
import Input from "../presentation/atomic/atoms/Input";

export default function Register() {
  const { createUser } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await createUser({ email, password: pass, name: name });
      navigate("/login");
    } catch (e: any) {
      setErr(e.message ?? "Falha ao cadastrar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-bg-decoration">
        <div className="decoration-circle decoration-circle-1"></div>
        <div className="decoration-circle decoration-circle-2"></div>
        <div className="decoration-circle decoration-circle-3"></div>
      </div>

      <div className="login-content">
        <div className="login-brand-section">
          <div className="brand-content">
            <div className="brand-icon-wrapper">
              <img
                src="https://aquamarine-hornet-945619.hostingersite.com/wp-content/uploads/2025/12/Vaccine-development-rafiki.png"
                alt="Logo"
                style={{ height: 500 }}
              />
            </div>

            <h1 className="brand-title">Consulta de Diabete</h1>
            <p className="brand-description">
              Acesse sua conta para acompanhar seus registros, manter seu
              histórico organizado e facilitar seu dia a dia.
            </p>
          </div>
        </div>

        <div className="login-form-section">
          <div className="login-card">
            <div className="login-header">
              <div className="login-logo-wrapper">
                <img
                  src="https://aquamarine-hornet-945619.hostingersite.com/wp-content/uploads/2025/10/59b67dc0-c292-4c60-92bb-9693854710d4-removebg-preview.png"
                  alt="Logo"
                  className="login-logo"
                />
              </div>
              <h2 className="login-title">Cadastra-se</h2>
              <p className="login-subtitle">
                Cadastre as credenciais para continuar
              </p>
            </div>

            <form onSubmit={onSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Nome
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">✏️</span>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="input input-with-icon"
                    required
                    autoComplete="name"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  E-mail
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">📧</span>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="input input-with-icon"
                    required
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Senha
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="••••••••"
                    className="input input-with-icon"
                    required
                    autoComplete="current-password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                    disabled={loading}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              {err && (
                <div className="error-message" role="alert">
                  <span className="error-icon">⚠️</span>
                  <span>{err}</span>
                </div>
              )}

              <Button
                variant="primary"
                type="submit"
                disabled={loading || !email || !pass || !name}
                size="md"
                className="btn-primary btn-login"
              >
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Cadastrando...
                  </>
                ) : (
                  <>
                    <span>Cadastrar</span>
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </Button>
            </form>

            <div className="login-footer">
              <Button
                variant="secondary"
                type="button"
                size="md"
                className="btn-secondary btn-register"
                onClick={() => navigate("/")}
              >
                <span> Já tem conta? Entre</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
