import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import axios from "axios";

function Goals() {
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [goals, setGoals] = useState([]);

  const userId = 1;

  useEffect(() => {
    async function fetchGoals() {
      try {
        const response = await axios.get(`http://localhost:5000/api/goals?user_id=${userId}`);
        setGoals(response.data);
      } catch (error) {
        console.error("Error fetching goals", error);
      }
    }

    fetchGoals();
  }, []);

  const handleSetGoal = async () => {
    try {
      await axios.post('/api/goals', { user_id: userId, goal_name: goalName, target_amount: targetAmount });
      setGoalName("");
      setTargetAmount("");
      const response = await axios.get(`/api/goals?user_id=${userId}`);
      setGoals(response.data);
    } catch (error) {
      console.error("Error setting goal", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom align="center">Financial Goals</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Set New Goal</Typography>
            <TextField
              fullWidth
              label="Goal Name"
              variant="outlined"
              margin="normal"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Target Amount"
              variant="outlined"
              margin="normal"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSetGoal}>Set Goal</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Your Goals</Typography>
            {goals.map((goal, index) => (
              <Typography key={index}>{goal.goal_name}: ${goal.target_amount}</Typography>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Goals;


