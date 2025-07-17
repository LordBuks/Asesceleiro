import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Footer from './Footer';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // O redirecionamento será tratado pelo AuthContext
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Email ou senha incorretos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="logo-container">
          <img 
            src="https://i.imgur.com/aVevWWG.png" 
            alt="SC Internacional" 
            className="logo"
          />
        </div>
        <h1 className="system-title">Alojamento CTB</h1>
      </div>

      <div className="login-form-container">
        <div className="login-form-wrapper">
          <h2 className="login-title">Login</h2>
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Senha:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
          
          {/* Footer integrado no bloco de login */}
          <Footer />
        </div>
      </div>

      <footer className="login-footer">
        <p>© 2025 TechVamp Ltda. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Login;

