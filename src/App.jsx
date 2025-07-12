import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import CategoryMenu from './components/CategoryMenu';
import PlayerGrid from './components/PlayerGrid';
import PlayerModal from './components/PlayerModal';
import AdminPanel from './components/AdminPanel';
import { usePlayers } from './hooks/usePlayers';
import './App.css';

function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState('Sub20');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const { players, loading, error, getPlayersByCategory } = usePlayers();

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
  };

  const handleBackToPublic = () => {
    setShowAdminPanel(false);
  };

  if (showAdminPanel) {
    return <AdminPanel onBackToPublic={handleBackToPublic} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E5050F] mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando jogadores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

