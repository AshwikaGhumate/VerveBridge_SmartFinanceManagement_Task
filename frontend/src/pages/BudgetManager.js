import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import axios from "axios";

function BudgetManager() {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [budgets, setBudgets] = useState([]);

  const userId = 1;

  useEffect(() => {
    async function fetchBudgets() {
      try {
        const response = await axios.get(`http://localhost:5000/api/budget?user_id=${userId}`);
        setBudgets(response.data);
      } catch (error) {
        console.error("Error fetching budgets", error);
      }
    }

    fetchBudgets();
  }, []);

  const handleSetBudget = async () => {
    try {
      await axios.post('/api/budget', { user_id: userId, category, budget_limit: amount });
      setCategory("");
      setAmount("");
      const response = await axios.get(`/api/budget?user_id=${userId}`);
      setBudgets(response.data);
    } catch (error) {
      console.error("Error setting budget", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom align="center">Budget Manager</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Set Monthly Budget</Typography>
            <TextField
              fullWidth
              label="Category"
              variant="outlined"
              margin="normal"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <TextField
              fullWidth
              label="Amount"
              variant="outlined"
              margin="normal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSetBudget}>Set Budget</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>Your Budgets</Typography>
            {budgets.map((budget, index) => (
              <Typography key={index}>{budget.category}: ${budget.budget_limit}</Typography>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default BudgetManager;
