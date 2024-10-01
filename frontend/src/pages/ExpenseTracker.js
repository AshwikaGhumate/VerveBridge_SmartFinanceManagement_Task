import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import axios from "axios";

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);


  const userId = 1;

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await axios.get(`http://localhost:5000/api/transactions?user_id=${userId}`);
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses", error);
      }
    }

    fetchExpenses();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom align="center">Expense Tracker</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((row) => (
              <TableRow key={row.date}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>${row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ExpenseTracker;
