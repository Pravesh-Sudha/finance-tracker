import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TransactionForm = ({ setRefresh }) => {
  const [formData, setFormData] = useState({
    type: 'expense',
    category: '',
    description: '',
    amount: '',
    notes: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/transactions`, {
        ...formData,
        amount: parseFloat(formData.amount),
      });
      console.log('Transaction POST response:', response.data);
      setFormData({ type: 'expense', category: '', description: '', amount: '', notes: '' });
      setRefresh(prev => !prev);
      navigate('/');
    } catch (err) {
      console.error('Error adding transaction:', err.message, err.response?.data);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={formData.type}
          onChange={e => setFormData({ ...formData, type: e.target.value })}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input
          type="text"
          placeholder="Category (e.g., Food, Bills)"
          value={formData.category}
          onChange={e => setFormData({ ...formData, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={e => setFormData({ ...formData, amount: e.target.value })}
          step="0.01"
        />
        <textarea
          placeholder="Notes (optional)"
          value={formData.notes}
          onChange={e => setFormData({ ...formData, notes: e.target.value })}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit">Add Transaction</button>
          <button type="button" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;