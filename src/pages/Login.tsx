import { type FormEvent, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "../presentation/atomic/atoms/Button";
import Input from "../presentation/atomic/atoms/Input";

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await signIn({ email, password: pass, name: "" });
    } catch (e: any) {
      setErr(e.message ?? "Falha ao entrar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      {/* Decorative Background Elements */}
      <div className="login-bg-decoration">
        <div className="decoration-circle decoration-circle-1"></div>
        <div className="decoration-circle decoration-circle-2"></div>
        <div className="decoration-circle decoration-circle-3"></div>
      </div>

      {/* Split Layout */}
      <div className="login-content">
        {/* Left Side - Branding */}
        <div className="login-brand-section">
          <div className="brand-content">
            <div className="brand-icon-wrapper">
              <span className="brand-icon">💊</span>
            </div>
            <h1 className="brand-title">Sistema de Medicamentos</h1>
            <p className="brand-description">
              Gerencie seus medicamentos de forma simples, segura e eficiente
            </p>
            <div className="brand-features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Controle completo</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Interface intuitiva</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Acesso seguro</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-section">
          <div className="login-card">
            <div className="login-header">
              <div className="login-logo-wrapper">
                <img
                  src="https://aquamarine-hornet-945619.hostingersite.com/wp-content/uploads/2025/10/unnamed-removebg-preview.png"
                  alt="Logo"
                  className="login-logo"
                />
              </div>
              <h2 className="login-title">Bem-vindo De Volta!</h2>
              <p className="login-subtitle">
                Entre com suas credenciais para continuar
              </p>
            </div>

            <form onSubmit={onSubmit} className="login-form">
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
                disabled={loading || !email || !pass}
                size="md"
                className="btn-primary btn-login"
              >
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Entrando...
                  </>
                ) : (
                  <>
                    <span>Entrar</span>
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </Button>
            </form>

            <div className="login-footer">
              <a href="#" className="forgot-password-link">
                Esqueceu sua senha?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
