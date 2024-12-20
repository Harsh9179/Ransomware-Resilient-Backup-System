import React, { useState } from 'react';
import './Backup.css'; // Import a CSS file for styling

const Backup = () => {
  const [timestamps, setTimestamps] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleBackup = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/backup', { method: 'POST' });
      const data = await response.json();
      alert(data.message);

      // Extract timestamps from the response and set state
      const parsedOutput = data.output.split('\n').filter(line => line.trim());
      const backupTimestamps = parsedOutput.filter(line => line.includes('T')).map(line => line.trim());
      setTimestamps(backupTimestamps);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create backup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="backup-container">
      <h2 className="title">Backup Management</h2>
      <div className="backup-controls">
        <button onClick={handleBackup} disabled={loading} className="backup-button">
          {loading ? 'Creating Backup...' : 'Create Backup'}
        </button>
      </div>
      <div className="backup-list">
        <h3 className="subtitle">Available Backups</h3>
        {timestamps.length > 0 ? (
          <ul>
            {timestamps.map((timestamp, index) => (
              <li key={index} className="timestamp">
                {timestamp}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-backups">No backups available yet.</p>
        )}
      </div>
    </div>
  );
};

export default Backup;
