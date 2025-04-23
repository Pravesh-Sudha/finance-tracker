const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Goal = require('../models/Goal');

// Get all transactions
router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions || []);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ message: err.message });
  }
});

// Create a transaction
router.post('/transactions', async (req, res) => {
  const transaction = new Transaction({
    type: req.body.type,
    category: req.body.category,
    description: req.body.description,
    amount: req.body.amount,
    notes: req.body.notes,
  });

  try {
    const newTransaction = await transaction.save();
    console.log('Transaction saved:', newTransaction);
    res.status(201).json(newTransaction);
  } catch (err) {
    console.error('Error saving transaction:', err);
    res.status(400).json({ message: err.message });
  }
});

// Get all goals
router.get('/goals', async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals || []);
  } catch (err) {
    console.error('Error fetching goals:', err);
    res.status(500).json({ message: err.message });
  }
});

// Create a goal
router.post('/goals', async (req, res) => {
  const goal = new Goal({
    name: req.body.name,
    targetAmount: req.body.targetAmount,
    currentAmount: req.body.currentAmount || 0,
    targetDate: req.body.targetDate,
    description: req.body.description,
  });

  try {
    const newGoal = await goal.save();
    console.log('Goal saved:', newGoal);
    res.status(201).json(newGoal);
  } catch (err) {
    console.error('Error saving goal:', err);
    res.status(400).json({ message: err.message });
  }
});

// Update a goal
router.put('/goals/:id', async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    if (req.body.currentAmount !== undefined) {
      goal.currentAmount = req.body.currentAmount;
    }

    const updatedGoal = await goal.save();
    console.log('Goal updated:', updatedGoal);
    res.json(updatedGoal);
  } catch (err) {
    console.error('Error updating goal:', err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;