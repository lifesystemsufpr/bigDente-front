
import { Link } from 'react-router-dom';

export function ForgotPassWordPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      
      {/* Lado Esquerdo - Branding (Focado em Segurança/Senha) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#002366] flex-col items-center justify-center p-12">
        
        {/* Ícone de Cadeado (Representando a Senha/Segurança) */}
        <div className="mb-8 p-6 bg-white/10 rounded-full shadow-lg">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="96" 
            height="96" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>

        <h2 className="text-white text-4xl font-bold mt-4 text-center">
          Recuperação de Acesso
        </h2>
      </div>

      {/* Lado Direito - Formulário de Redefinição */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-white p-8 lg:p-16">
        <div className="w-full max-w-md">
          
          <h1 className="text-3xl font-extrabold text-[#002366] text-center mb-2">
            Esqueceu a Senha?
          </h1>
          <p className="text-gray-500 text-center mb-8">
            Informe o seu e-mail e escolha uma nova senha para redefinir o seu acesso.
          </p>

          <form className="space-y-5">
            {/* Campo de E-mail */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="email">
                E-mail
              </label>
              <input 
                id="email"
                type="email" 
                placeholder="exemplo@clinica.com.br" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002366] focus:border-[#002366] outline-none transition-all bg-gray-50 focus:bg-white text-gray-900"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#002366] text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all shadow-md mt-8"
            >
              Redefinir Senha
            </button>
          </form>

          {/* LINK PARA VOLTAR AO LOGIN */}
          <div className="mt-8 text-center text-sm text-gray-600">
            Lembrou da sua senha?{' '}
            <Link to="/" className="text-[#002366] font-bold hover:underline">
              Voltar ao login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}