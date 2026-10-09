import { Link } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../core/services/authService";
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export function LoginPage() {

  const [loginValue, setLoginValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(loginValue, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">

      { }
      <div className="hidden lg:flex lg:w-1/2 bg-[#002366] flex-col items-center justify-center p-12">
        <div className="bg-white p-6 rounded-xl shadow-2xl mb-8">
          <img
            src="/image_9ba6df.png"
            alt="Logo da Instituição"
            className="w-full max-w-sm object-contain"
          />
        </div>
        <h2 className="text-white text-3xl font-bold mt-4 text-center">
          Sistema BigDente
        </h2>
      </div>

      { }
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-white p-8 lg:p-16">
        <div className="w-full max-w-md">

          { }
          <div className="flex justify-center mb-6">
            <div className="bg-[#002366] p-4 rounded-full shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 20.75c-1.4-1.03-2-2.74-2-4.35v-3.5c0-1.62-.6-3.33-2-4.35A3.5 3.5 0 0 1 8.5 2h7a3.5 3.5 0 0 1 2.5 6.55c-1.4 1.02-2 2.73-2 4.35v3.5c0 1.62-.6 3.33-2 4.35" />
                <path d="M12 11v9" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-[#002366] text-center mb-2">
            Bem-vindo(a)
          </h1>
          <p className="text-gray-500 text-center mb-8">
            Insira suas credenciais para acessar sua conta.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                placeholder="exemplo@clinica.com.br"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002366] focus:border-[#002366] outline-none transition-all bg-gray-50 focus:bg-white text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="password">
                Senha
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002366] focus:border-[#002366] outline-none transition-all bg-gray-50 focus:bg-white text-gray-900"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                 {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 rounded text-[#002366] focus:ring-[#002366] border-gray-300"
                />
                Lembrar-me
              </label>
              <Link
                to="/redefinir-senha"
                className="text-[#002366] hover:underline font-semibold"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#002366] text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all shadow-md mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Entrando..." : "Entrar no Sistema"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}