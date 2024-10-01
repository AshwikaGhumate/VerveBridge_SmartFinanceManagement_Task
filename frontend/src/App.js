import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

import Dashboard from "./pages/Dashboard";
import ExpenseTracker from "./pages/ExpenseTracker";
import BudgetManager from "./pages/BudgetManager";
import Goals from "./pages/Goals";
import AIAssistant from "./pages/AIAssistant";
import Layout from "./components/Layout";


function App() {
  return (
    <ThemeProvider theme={theme}>  
      <CssBaseline />  
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/expenses" element={<ExpenseTracker />} />
            <Route path="/budget" element={<BudgetManager />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;


























