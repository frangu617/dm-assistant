import React, { useState } from 'react';
import { TextField, Button, Box, Container, Paper, Typography } from '@mui/material';
import OpenAI from 'openai';

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const sendMessage = async () => {
        if (!userInput.trim()) return;  // Prevent sending empty messages
        setIsLoading(true);
        const userMessage = { text: userInput, type: 'user' };
        setMessages(messages => [...messages, userMessage]);  // Add user message to chat
    
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userInput }),
            });
    
            const data = await response.json();
            const botMessage = { text: data, type: 'bot' };
            setMessages(messages => [...messages, botMessage]);  // Add bot response to chat
        } catch (error) {
            console.error('Error sending message:', error);
            // Optionally handle errors, e.g., by showing an error message in the UI
        } finally {
            setIsLoading(false);
            setUserInput('');  // Clear input field
        }
    };
    
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };
    
    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 2, height: '500px', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
                    {messages.map((msg, index) => (
                        <Typography key={index} sx={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                            <Box sx={{
                                display: 'inline-block',
                                borderRadius: '16px',
                                p: 1,
                                bgcolor: msg.role === 'user' ? 'primary.main' : 'grey.300',
                                color: msg.role === 'user' ? 'common.white' : 'text.primary',
                                m: 1,
                            }}>
                                {msg.content}
                            </Box>
                        </Typography>
                    ))}
                </Box>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Type your message here..."
                    value={userInput}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    sx={{ mb: 2 }}
                    disabled={isLoading}
                />
                <Button variant="contained" fullWidth onClick={sendMessage} disabled={isLoading || !userInput.trim()}>
                    Send
                </Button>
            </Paper>
        </Container>
    );
}

export default Chatbot;
