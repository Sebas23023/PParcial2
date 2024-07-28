// src/app/layout.tsx
import React from 'react';
import './globals.css'; // Asegúrate de que este archivo exista

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>GESTOR DE TAREAS</title>
      </head>
      <body>
        <header>
          <h1>GESTOR DE TAREAS</h1>
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; 2024 GESTOR DE TAREAS App</p>
        </footer>
      </body>
    </html>
  );
};

export default Layout;
