import { Users, Settings, Shield } from 'lucide-react';
import Footer from './Footer';

const LoggedInWelcome = ({ user, onContinue, onAdminClick }) => {
  // Verifica se o usuário atual é o administrador
  const isAdminUser = user && user.email === 'gabiru@inter.com';

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bem-vindo de volta!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {user?.email}
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-[#E5050F] mb-6">
              Sistema de Gestão de Atletas Alojados - Celeiro de Ases
            </h2>
            
            <p className="text-lg text-gray-700 mb-8">
              Você agora tem acesso ao sistema de gestão do alojamento. 
              Aqui você pode visualizar informações detalhadas dos atletas alojados.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <Users className="text-red-600 mr-2" size={24} />
                  <h3 className="text-lg font-semibold text-white-800">
                    Acesso aos Atletas
                  </h3>
                </div>
                <p className="text-red-700">
                  Visualize informações completas dos atletas organizadas por categoria: 
                  Sub20, Sub17, Sub16, Sub15 e Sub14.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <Shield className="text-red-600 mr-2" size={24} />
                  <h3 className="text-lg font-semibold text-white-800">
                    Dados Protegidos
                  </h3>
                </div>
                <p className="text-red-700">
                  Todas as informações são tratadas com segurança e conforme 
                  as diretrizes da LGPD.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onContinue}
                className="inline-flex items-center justify-center space-x-2 px-8 py-3 bg-[#E5050F] text-white rounded-lg hover:bg-[#C20C18] transition-colors text-lg font-semibold"
              >
                <Users size={24} />
                <span>Ver Atletas</span>
              </button>

              {isAdminUser && (
                <button
                  onClick={onAdminClick}
                  className="inline-flex items-center justify-center space-x-2 px-8 py-3 border-2 border-[#E5050F] text-[#E5050F] rounded-lg hover:bg-[#E5050F] hover:text-white transition-colors text-lg font-semibold"
                >
                  <Settings size={24} />
                  <span>Painel Admin</span>
                </button>
              )}
            </div>
          </div>
       
         <p><Footer />

          <div className="text-sm text-gray-500">
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoggedInWelcome;



