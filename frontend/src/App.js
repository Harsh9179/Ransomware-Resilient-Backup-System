import React from 'react';
import Backup from './components/Backup';
import Restore from './components/Restore';
import EnterData from './components/EnterData';
import Display from './components/Display';
import Status from './components/Status'; // Optional: Add a Status component if required
import './App.css'; // Import a CSS file for consistent styling

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Ransomware Resilient Backup System</h1>
        <p className="subtitle">Secure your data with seamless backup and restore functionalities</p>
      </header>
      <main className="app-content">
        <div className="section">
          <EnterData />
        </div>
        <div className="section">
          <Backup />
        </div>
        <div className="section">
          <Restore />
        </div>
        <div className="section">
          <Display />
        </div>
        <div className="section">
          <Status /> {/* Optional MongoDB Status Component */}
        </div>
      </main>
      <footer className="app-footer">
        <p>© 2024 Ransomware Resilient Backup System. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
