import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Typography, Box, Container, Paper } from '@mui/material';
// import('dotenv').config();

function DnDChatbot() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
                        <Box key={index} sx={{ display: 'flex', justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start', mb: 1 }}>
                            <Box sx={{
                                bgcolor: msg.type === 'user' ? 'primary.main' : 'grey.300',
                                color: msg.type === 'user' ? 'common.white' : 'text.primary',
                                borderRadius: '16px',
                                p: 1,
                                maxWidth: '80%'
                            }}>
                                <Typography variant="body1">{msg.text}</Typography>
                            </Box>
                        </Box>
                    ))}
                    {isLoading && <CircularProgress size={24} />}
                </Box>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Type your message here..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    sx={{ mb: 2 }}
                    disabled={isLoading}
                />
                <Button variant="contained" fullWidth onClick={sendMessage} disabled={isLoading}>
                    Send
                </Button>
            </Paper>
        </Container>
    );
}

export default DnDChatbot;
