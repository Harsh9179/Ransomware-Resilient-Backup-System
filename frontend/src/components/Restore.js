import React, { useState } from 'react';
import './Restore.css'; // Import CSS for styling

const Restore = () => {
  const [timestamp, setTimestamp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRestore = async () => {
    if (!timestamp.trim()) {
      alert('Please enter a valid timestamp.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/restore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ timestamp }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to restore backup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="restore-container">
      <h2 className="title">Restore Data</h2>
      <div className="restore-input">
        <input
          type="text"
          placeholder="Enter Timestamp (e.g., 2024-11-30T15:30:00)"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="restore-button">
        <button onClick={handleRestore} disabled={loading} className="button">
          {loading ? 'Restoring...' : 'Restore Backup'}
        </button>
      </div>
    </div>
  );
};

export default Restore;
