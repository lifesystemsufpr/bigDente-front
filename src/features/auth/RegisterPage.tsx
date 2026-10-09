import { Link } from 'react-router-dom';
export function RegisterPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <div className="hidden lg:flex lg:w-1/2 bg-[#002366] flex-col items-center justify-center p-12">
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
              <path d="M10 20.75c-1.4-1.03-2-2.74-2-4.35v-3.5c0-1.62-.6-3.33-2-4.35A3.5 3.5 0 0 1 8.5 2h7a3.5 3.5 0 0 1 2.5 6.55c-1.4 1.02-2 2.73-2 4.35v3.5c0 1.62-.6 3.33-2 4.35" />
              <path d="M12 11v9" />
            </svg>
        </div>

        <h2 className="text-white text-4xl font-bold mt-4 text-center">
          Crie uma Conta
        </h2>
        <p className="text-blue-200 mt-4 text-center max-w-md text-lg">
          Cadastre novos profissionais e organize o fluxo com diferentes níveis de acesso.
        </p>
      </div>
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-white p-8 lg:p-16">
        <div className="w-full max-w-md">
          
          <h1 className="text-3xl font-extrabold text-[#002366] text-center mb-2">
            Cadastro de Usuário
          </h1>
          <p className="text-gray-500 text-center mb-8">
            Preencha os dados abaixo para registrar um novo perfil.
          </p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="name">
                Nome Completo
              </label>
              <input 
                id="name"
                type="text" 
                placeholder="Ex: Dr. João Silva" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002366] focus:border-[#002366] outline-none transition-all bg-gray-50 focus:bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="email">
                E-mail
              </label>
              <input 
                id="email"
                type="email" 
                placeholder="exemplo@clinica.com.br" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002366] focus:border-[#002366] outline-none transition-all bg-gray-50 focus:bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="password">
                Senha
              </label>
              <input 
                id="password"
                type="password" 
                placeholder="••••••••" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002366] focus:border-[#002366] outline-none transition-all bg-gray-50 focus:bg-white"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#002366] text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all shadow-md mt-8"
            >
              Criar Conta
            </button>
          </form>
          <div className="mt-8 text-center text-sm text-gray-600">
            Já possui uma conta?{' '}
            <Link to="/" className="text-[#002366] font-bold hover:underline">
              Faça login aqui
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}