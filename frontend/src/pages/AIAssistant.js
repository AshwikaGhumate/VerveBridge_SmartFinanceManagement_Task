import React, { useState } from "react";
import { Paper, Typography, TextField, Button, List, ListItem, CircularProgress } from "@mui/material";
import axios from "axios";

function AIAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (query) => {
    setMessages([...messages, { text: query, fromUser: true }]);
    setLoading(true);
    setInput("");

    try {
      const response = await axios.post("http://localhost:5000/api/ai_assistant", { query });
      const aiResponse = response.data.response; 
      setMessages((prevMessages) => [...prevMessages, { text: aiResponse, fromUser: false }]);
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages, { text: "Sorry, something went wrong.", fromUser: false }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        AI Assistant
      </Typography>
      <Paper sx={{ p: 2 }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              {msg.fromUser ? <b>You:</b> : <b>AI:</b>} {msg.text}
            </ListItem>
          ))}
        </List>
        {loading && <CircularProgress sx={{ mt: 2 }} />}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ask your financial query..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button variant="contained" color="primary" onClick={() => handleSendMessage(input)} sx={{ mt: 2 }}>
          Send
        </Button>
      </Paper>
    </div>
  );
}

export default AIAssistant;

