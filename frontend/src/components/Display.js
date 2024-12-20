import React, { useState } from 'react';
import './Display.css'; // Import a CSS file for styling

const Display = () => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDisplay = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/display');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(JSON.stringify(result.data, null, 2)); // Format JSON data for display
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to display data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="display-container">
      <h2 className="title">Database Viewer</h2>
      <div className="display-controls">
        <button onClick={handleDisplay} disabled={loading} className="display-button">
          {loading ? 'Fetching Data...' : 'Display Data'}
        </button>
      </div>
      <div className="display-data">
        {data ? (
          <pre className="data-output">{data}</pre>
        ) : (
          <p className="no-data">No data to display. Click "Display Data" to fetch.</p>
        )}
      </div>
    </div>
  );
};

export default Display;
