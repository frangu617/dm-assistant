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
        const trimmedInput = userInput.trim();
        if (!trimmedInput) return;

        const userMessage = { role: 'user', content: trimmedInput };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setUserInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chatgpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: trimmedInput }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const botMessage = { role: 'bot', content: data.choices[0].message.content };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Failed to send message:', error);
            setMessages((prevMessages) => [...prevMessages, { role: 'bot', content: 'Sorry, something went wrong.' }]);
        }

        setIsLoading(false);
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
