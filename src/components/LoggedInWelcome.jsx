import { Users, Settings, Shield } from 'lucide-react';
import Footer from './Footer';

const LoggedInWelcome = ({ user, onContinue, onAdminClick }) => {
  const isAdminUser = user && user.email === 'gabiru@inter.com';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-2">
        <div className="w-full max-w-4xl text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo de volta!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {user?.email}
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
            <h2 className="text-xl font-semibold text-[#E5050F] mb-4">
              Sistema de Gestão de Atletas Alojados - Celeiro de Ases
            </h2>
            
            <p className="text-md text-gray-700 mb-6">
              Você agora tem acesso ao sistema de gestão do alojamento. 
              Aqui você pode visualizar informações detalhadas dos atletas alojados.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Users className="text-red-600 mr-2" size={20} />
                  <h3 className="text-md font-semibold text-white-800">
                    Acesso aos Atletas
                  </h3>
                </div>
                <p className="text-red-700 text-sm">
                  Visualize informações completas dos atletas organizadas por categoria: 
                  Sub20, Sub17, Sub16, Sub15 e Sub14.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Shield className="text-red-600 mr-2" size={20} />
                  <h3 className="text-md font-semibold text-white-800">
                    Dados Protegidos
                  </h3>
                </div>
                <p className="text-red-700 text-sm">
                  Todas as informações são tratadas com segurança e conforme 
                  as diretrizes da LGPD.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onContinue}
                className="inline-flex items-center justify-center space-x-2 px-6 py-2 bg-[#E5050F] text-white rounded-lg hover:bg-[#C20C18] transition-colors text-md font-semibold"
              >
                <Users size={20} />
                <span>Ver Atletas</span>
              </button>

              {isAdminUser && (
                <button
                  onClick={onAdminClick}
                  className="inline-flex items-center justify-center space-x-2 px-6 py-2 border-2 border-[#E5050F] text-[#E5050F] rounded-lg hover:bg-[#E5050F] hover:text-white transition-colors text-md font-semibold"
                >
                  <Settings size={20} />
                  <span>Painel Admin</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default LoggedInWelcome;


