import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
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

  return (
    <div className="app">
      <Header 
        onToggleAdmin={() => setShowAdminPanel(!showAdminPanel)}
        showAdminPanel={showAdminPanel}
      />
      
      {showAdminPanel ? (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      ) : (
        <main className="main-content">
          <CategoryMenu 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          
          <PlayerGrid 
            players={filteredPlayers}
            loading={loading}
            error={error}
            onPlayerClick={handlePlayerClick}
          />
        </main>
      )}
      
      {isModalOpen && selectedPlayer && (
        <PlayerModal 
          player={selectedPlayer}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <AppContent />
      </ProtectedRoute>
    </AuthProvider>
  );
}

export default App;

