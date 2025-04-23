import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TransactionForm from './components/TransactionForm';
import GoalForm from './components/GoalForm';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <Router>
      <div className="App">
        <h1>Minimalist Finance Tracker</h1>
        <Routes>
          <Route path="/" element={<Dashboard refresh={refresh} />} />
          <Route path="/add-transaction" element={<TransactionForm setRefresh={setRefresh} />} />
          <Route path="/add-goal" element={<GoalForm setRefresh={setRefresh} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;