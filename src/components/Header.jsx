import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const Header = ({ onToggleAdmin, showAdminPanel }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      await logout();
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo-section">
            <img 
              src="/assets/inter-logo.png" 
              alt="SC Internacional" 
              className="header-logo"
            />
            <div className="header-titles">
              <h1 className="main-title">Celeiro de Ases</h1>
              <p className="subtitle">Sistema de Gestão de Atletas</p>
            </div>
          </div>
        </div>

        <div className="header-right">
          <div className="user-info">
            <span className="user-email">{user?.email}</span>
            <div className="header-actions">
              <button 
                onClick={onToggleAdmin}
                className={`admin-button ${showAdminPanel ? 'active' : ''}`}
                title="Painel Administrativo"
              >
                ⚙️ Admin
              </button>
              <button 
                onClick={handleLogout}
                className="logout-button"
                title="Sair do sistema"
              >
                🚪 Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

