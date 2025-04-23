import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoalForm = ({ setRefresh }) => {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    targetDate: '',
    description: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/goals`, {
        ...formData,
        targetAmount: parseFloat(formData.targetAmount),
      });
      console.log('Goal POST response:', response.data);
      setFormData({ name: '', targetAmount: '', targetDate: '', description: '' });
      setRefresh(prev => !prev);
      navigate('/');
    } catch (err) {
      console.error('Error adding goal:', err.message, err.response?.data);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Goal</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Goal Name (e.g., Save for Laptop)"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Target Amount"
          value={formData.targetAmount}
          onChange={e => setFormData({ ...formData, targetAmount: e.target.value })}
          step="0.01"
        />
        <input
          type="date"
          value={formData.targetDate}
          onChange={e => setFormData({ ...formData, targetDate: e.target.value })}
        />
        <textarea
          placeholder="Description (optional)"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit">Add Goal</button>
          <button type="button" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default GoalForm;