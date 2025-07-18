import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import CategoryMenu from './components/CategoryMenu';
import PlayerGrid from './components/PlayerGrid';
import PlayerModal from './components/PlayerModal';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import WelcomeScreen from './components/WelcomeScreen'; // Importar WelcomeScreen
import LoggedInWelcome from './components/LoggedInWelcome'; // Importar LoggedInWelcome
import { usePlayers } from './hooks/usePlayers';
import './App.css';

function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState('Sub20');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showWelcomeBack, setShowWelcomeBack] = useState(true); // Novo estado para controlar a tela de boas-vindas

  const { currentUser, loading: authLoading } = useAuth();

  const { players, loading: playersLoading, error, getPlayersByCategory } = usePlayers();

  const filteredPlayers = getPlayersByCategory(selectedCategory);

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlayer(null);
  };

  const handleAdminClick = () => {
    setShowAdminPanel(true);
    setShowWelcomeBack(false); // Esconde a tela de boas-vindas ao ir para o Admin
  };

  const handleBackToPublic = () => {
    setShowAdminPanel(false);
    setShowWelcomeBack(false); // Esconde a tela de boas-vindas ao voltar para o público
  };

  const handleContinueToMain = () => {
    setShowWelcomeBack(false); // Esconde a tela de boas-vindas e mostra o conteúdo principal
  };

  // Se o usuário não estiver logado e a autenticação não estiver carregando, exibe a tela de boas-vindas ou login
  if (!currentUser && !authLoading) {
    return <Login />;
  }

  // Se a autenticação ou os jogadores estiverem carregando, exibe a tela de carregamento
  if (authLoading || playersLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E5050F] mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se o usuário estiver logado e a tela de boas-vindas estiver ativa, exibe LoggedInWelcome
  if (currentUser && showWelcomeBack) {
    return (
      <LoggedInWelcome 
        user={currentUser} 
        onContinue={handleContinueToMain} 
        onAdminClick={handleAdminClick} 
      />
    );
  }

  // Se o usuário estiver logado e showAdminPanel for verdadeiro, exibe o painel administrativo
  if (currentUser && showAdminPanel) {
    return <AdminPanel onBackToPublic={handleBackToPublic} />;
  }

  // Se o usuário estiver logado e showWelcomeBack for falso, exibe o conteúdo principal do site
  if (currentUser && !showWelcomeBack) {
    return (
      <div className="min-h-screen bg-gray-50 overflow-auto">
        <Header onAdminClick={handleAdminClick} />
        <CategoryMenu 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        {error && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              <p>⚠️ Usando dados de demonstração. {error}</p>
            </div>
          </div>
        )}
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transform scale-[0.60] origin-top-left w-[150%] h-[150%] overflow-visible">
          <PlayerGrid 
            players={filteredPlayers}
            onPlayerClick={handlePlayerClick}
          />
        </main>

        <PlayerModal 
          player={selectedPlayer}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    );
  }

  // Fallback para o conteúdo principal se nenhuma das condições acima for atendida (não deve acontecer com a lógica correta)
  return null;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

