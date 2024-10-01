import React, { useEffect, useState } from "react";
import {Grid,Paper,Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,} from "@mui/material";
import axios from "axios";
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS,LineElement,PointElement,LinearScale,CategoryScale,Title,Tooltip,Legend,} from 'chart.js';


ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

function Dashboard() {
  const userId = 1; 

  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expenseChartData, setExpenseChartData] = useState({});
  const [savings, setSavings] = useState(0); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const budgetResponse = await axios.get(`http://localhost:5000/api/budget?user_id=${userId}`);
        setBudgets(budgetResponse.data);

        const expenseResponse = await axios.get(`http://localhost:5000/api/transactions?user_id=${userId}`);
        setExpenses(expenseResponse.data);

        const goalResponse = await axios.get(`http://localhost:5000/api/goals?user_id=${userId}`);
        setGoals(goalResponse.data);

        
        const totalBudget = budgetResponse.data.reduce((acc, budget) => acc + parseFloat(budget.budget_limit), 0);
        const totalExpenses = expenseResponse.data.reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
        setSavings(totalBudget - totalExpenses); 

        const labels = expenseResponse.data.map(row => row.date);
        const amounts = expenseResponse.data.map(row => parseFloat(row.amount)); // Convert to float
        setExpenseChartData({
          labels: labels,
          datasets: [
            {
              label: 'Expenses',
              data: amounts,
              fill: false,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.1,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom align="center">Dashboard</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center", height: 140 }}>
            <Typography variant="h6" gutterBottom align="center">Current Budgets</Typography>
            {budgets.map((budget, index) => (
              <Typography key={index} align="center">{budget.category}: ${budget.budget_limit}</Typography>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center", height: 140 }}>
            <Typography variant="h6" gutterBottom align="center">Savings</Typography>
            <Typography variant="h4" align="center">${savings.toFixed(2)}</Typography> {/* Display savings */}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center", height: 140 }}>
            <Typography variant="h6" gutterBottom align="center">Financial Goals</Typography>
            {goals.map((goal, index) => (
              <Typography key={index} align="center">{goal.goal_name}: ${goal.target_amount}</Typography>
            ))}
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ display: "flex", flexDirection: "column", height: 300, marginTop: '20px', padding: '20px', justifyContent: "center",alignItems: "center", }}>
        <Typography variant="h6" gutterBottom align="center">Expenses Over Time</Typography>
        <Line data={expenseChartData} options={{ responsive: true }} />
      </Paper>

      
      <Paper sx={{ display: "flex", flexDirection: "column", height: 'auto', marginTop: '20px', padding: '20px' }}>
        <Typography variant="h6" gutterBottom align="center">Expenses</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">{row.category}</TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">${parseFloat(row.amount).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default Dashboard;



