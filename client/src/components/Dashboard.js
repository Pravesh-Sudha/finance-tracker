import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = ({ refresh }) => {
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [updateAmounts, setUpdateAmounts] = useState({});
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/transactions`);
        const goalsRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/goals`);
        console.log('Transactions response:', transRes.data);
        console.log('Goals response:', goalsRes.data);
        setTransactions(Array.isArray(transRes.data) ? transRes.data : []);
        setGoals(Array.isArray(goalsRes.data) ? goalsRes.data : []);
      } catch (err) {
        console.error('Error fetching data:', err.message, err.response?.data, err.response?.status);
        setTransactions([]);
        setGoals([]);
      }
    };
    fetchData();
  }, [refresh]);

  // Clean up chart on component unmount or update
  useEffect(() => {
    return () => {
      if (chartRef.current?.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
    };
  }, []);

  const handleUpdateGoal = async (goalId) => {
    const amount = parseFloat(updateAmounts[goalId] || 0);
    if (amount <= 0) return;

    try {
      const goal = goals.find(g => g._id === goalId);
      const newAmount = (goal.currentAmount || 0) + amount;
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/goals/${goalId}`, {
        currentAmount: newAmount,
      });
      console.log('Update goal response:', response.data);
      setUpdateAmounts({ ...updateAmounts, [goalId]: '' });
      setGoals(goals.map(g => (g._id === goalId ? { ...g, currentAmount: newAmount } : g)));
    } catch (err) {
      console.error('Error updating goal:', err.message, err.response?.data, err.response?.status);
    }
  };

  // Compute expense data for pie chart
  const expenseCategories = Array.isArray(transactions)
    ? [...new Set(transactions.filter(t => t.type === 'expense').map(t => t.category))]
    : [];
  const expenseAmounts = expenseCategories.map(category =>
    transactions
      .filter(t => t.type === 'expense' && t.category === category)
      .reduce((sum, t) => sum + Number(t.amount), 0)
  );

  const expenseData = {
    labels: expenseCategories,
    datasets: [
      {
        data: expenseAmounts,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <nav style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Link to="/add-transaction">Add Transaction</Link> | <Link to="/add-goal">Add Goal</Link>
      </nav>
      <h3>Expenses by Category</h3>
      {expenseCategories.length > 0 ? (
        <div
          className="form-container"
          style={{ height: '350px', width: '350px', margin: '0 auto' }}
        >
          <Pie
            ref={chartRef}
            data={expenseData}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>No expenses to display.</p>
      )}
      <h3>Goals</h3>
      {goals.length > 0 ? (
        <div className="form-container">
          {goals.map(goal => (
            <div
              key={goal._id}
              style={{
                marginBottom: '15px',
                padding: '10px',
                borderBottom: '1px solid #eee',
              }}
            >
              {goal.currentAmount >= goal.targetAmount ? (
                <div className="goal-completion">
                  🎉 Goal Achieved: {goal.name}!
                </div>
              ) : null}
              <p style={{ margin: '5px 0' }}>
                {goal.name}: ${goal.currentAmount} / ${goal.targetAmount}
              </p>
              <progress
                value={goal.currentAmount}
                max={goal.targetAmount}
                style={{ width: '100%' }}
              ></progress>
              {goal.currentAmount < goal.targetAmount && (
                <div className="update-form">
                  <input
                    type="number"
                    placeholder="Add amount"
                    value={updateAmounts[goal._id] || ''}
                    onChange={e =>
                      setUpdateAmounts({ ...updateAmounts, [goal._id]: e.target.value })
                    }
                    step="0.01"
                    min="0"
                  />
                  <button
                    className="small"
                    onClick={() => handleUpdateGoal(goal._id)}
                  >
                    Add Funds
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>No goals set.</p>
      )}
    </div>
  );
};

export default Dashboard;