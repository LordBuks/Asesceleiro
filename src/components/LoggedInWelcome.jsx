import { Users, Settings, Shield, LogOut } from 'lucide-react';
import Footer from './Footer';

const LoggedInWelcome = ({ user, onContinue, onAdminClick, onLogout }) => {
  const isAdminUser = user && user.email === 'gabiru@inter.com';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <main className="flex-grow flex items-center justify-center px-3 sm:px-4 lg:px-6 py-3">
        <div className="w-full max-w-3xl text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Bem-vindo de volta!
          </h1>
          <p className="text-base text-gray-600 mb-3">
            {user?.email}
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-5 mb-3">
            <h2 className="text-lg font-semibold text-[#E5050F] mb-3">
              Sistema de Gestão de Atletas Alojados
            </h2>
            
            <p className="text-sm text-gray-700 mb-5">
              Você agora tem acesso ao sistema de gestão do alojamento. 
              Aqui você pode visualizar informações detalhadas dos atletas alojados.
            </p>

            <div className="grid md:grid-cols-2 gap-3 mb-5">
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <Users className="text-red-600 mr-2" size={18} />
                  <h3 className="text-sm font-semibold text-gray-800">
                    Acesso aos Atletas
                  </h3>
                </div>
                <p className="text-red-700 text-xs">
                  Visualize informações completas dos atletas organizadas por categoria: 
                  Sub20, Sub17, Sub16, Sub15 e Sub14.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <Shield className="text-red-600 mr-2" size={18} />
                  <h3 className="text-sm font-semibold text-gray-800">
                    Dados Protegidos
                  </h3>
                </div>
                <p className="text-red-700 text-xs">
                  Todas as informações são tratadas com segurança e conforme 
                  as diretrizes da LGPD.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={onContinue}
                className="inline-flex items-center justify-center space-x-2 px-5 py-2 bg-[#E5050F] text-white rounded-lg hover:bg-[#C20C18] transition-colors text-sm font-semibold"
              >
                <Users size={18} />
                <span>Ver Atletas</span>
              </button>

              {isAdminUser && (
                <button
                  onClick={onAdminClick}
                  className="inline-flex items-center justify-center space-x-2 px-5 py-2 border-2 border-[#E5050F] text-[#E5050F] rounded-lg hover:bg-[#E5050F] hover:text-white transition-colors text-sm font-semibold"
                >
                  <Settings size={18} />
                  <span>Painel Admin</span>
                </button>
              )}

              <button
                onClick={onLogout}
                className="inline-flex items-center justify-center space-x-2 px-5 py-2 border-2 border-gray-400 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
              >
                <LogOut size={18} />
                <span>Voltar para o Login</span>
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default LoggedInWelcome;

