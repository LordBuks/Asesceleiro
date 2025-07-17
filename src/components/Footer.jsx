import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-logo-container">
          <img 
            src="https://i.imgur.com/HIsH9X5.png" 
            alt="Logo Serviço Social" 
            className="footer-logo"
          />
        </div>
        <div className="footer-text">
          <p className="footer-title">
            <strong>Gerenciamento de Autorizações das Categorias de Base</strong>
          </p>
          <p className="footer-department">Departamento de Serviço Social</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

