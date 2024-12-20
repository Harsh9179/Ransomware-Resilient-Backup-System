import React, { useEffect, useState } from 'react';
import './Status.css'; // Import CSS for styling

const Status = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/status');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setStatus(data.status);
      } catch (err) {
        setError('Failed to fetch MongoDB status. Please try again later.');
        console.error('Error fetching MongoDB status:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, []);

  return (
    <div className="status-container">
      <h2 className="title">MongoDB Status</h2>
      {loading ? (
        <p className="loading">Fetching status...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <pre className="status-output">{status}</pre>
      )}
    </div>
  );
};

export default Status;
