import React, { useState } from 'react';
import './EnterData.css'; // Import CSS for styling

const EnterData = () => {
  const [entries, setEntries] = useState([{ name: '', age: '' }]);
  const [loading, setLoading] = useState(false);

  const handleAddEntry = () => {
    setEntries([...entries, { name: '', age: '' }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index][field] = value;
    setEntries(updatedEntries);
  };

  const handleEnterData = async () => {
    setLoading(true);
    try {
      for (const entry of entries) {
        const response = await fetch('http://127.0.0.1:5000/enter-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entry),
        });
        const data = await response.json();
        console.log(data.message);
      }
      alert('All data entered successfully.');
      setEntries([{ name: '', age: '' }]); // Reset form after successful submission
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to enter data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enter-data-container">
      <h2 className="title">Enter Data</h2>
      <div className="entries">
        {entries.map((entry, index) => (
          <div key={index} className="entry">
            <input
              type="text"
              placeholder="Name"
              value={entry.name}
              onChange={(e) => handleInputChange(index, 'name', e.target.value)}
              className="input-field"
            />
            <input
              type="number"
              placeholder="Age"
              value={entry.age}
              onChange={(e) => handleInputChange(index, 'age', e.target.value)}
              className="input-field"
            />
          </div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={handleAddEntry} className="add-button">+</button>
        <button onClick={handleEnterData} disabled={loading} className="submit-button">
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default EnterData;
