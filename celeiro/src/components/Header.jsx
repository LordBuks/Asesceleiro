import { useState } from 'react';
import { LogIn, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from './LoginForm';
import interLogo from '../assets/inter-logo.png';

const Header = ({ onAdminClick }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <img 
                src={interLogo} 
                alt="Sport Club Internacional" 
                className="h-12 w-12"
              />
              <h1 className="text-2xl font-bold text-[#E5050F]">CELEIRO</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <>
                  <button
                    onClick={onAdminClick}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#E5050F] text-white rounded-lg hover:bg-[#C20C18] transition-colors"
                  >
                    <Settings size={20} />
                    <span>Painel Admin</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <LogOut size={20} />
                    <span>Sair</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowLoginForm(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#E5050F] text-white rounded-lg hover:bg-[#C20C18] transition-colors"
                >
                  <LogIn size={20} />
                  <span>Admin</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {showLoginForm && (
        <LoginForm onClose={() => setShowLoginForm(false)} />
      )}
    </>
  );
};

export default Header;

