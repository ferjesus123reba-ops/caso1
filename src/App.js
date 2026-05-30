import React from 'react';
import MatriculaForm from './components/MatriculaForm';
import './App.css';

export default function App() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo-mark">SM</div>
          <div>
            <span className="header-title">Sistema de Matrícula</span>
            <span className="header-sub">Plataforma académica</span>
          </div>
        </div>
        <div className="header-badge">2025 — II</div>
      </header>

      <main className="app-main">
        <div className="page-intro">
          <h1 className="page-title">Registro de estudiante</h1>
          <p className="page-desc">
            Completa el formulario para registrar un nuevo alumno. Los campos marcados con
            <span className="req-star"> *</span> son obligatorios.
          </p>
        </div>
        <MatriculaForm />
      </main>

      <footer className="app-footer">
        <span>© 2025 Sistema de Matrícula</span>
        <span>Versión 1.0.0</span>
      </footer>
    </div>
  );
}
