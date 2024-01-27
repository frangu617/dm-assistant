import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Typography, Box, Container, Paper } from '@mui/material';
// import('dotenv').config();

function DnDChatbot() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {
        const trimmedInput = userInput.trim();
        if (!trimmedInput) return;

        const newMessages = [...messages, { type: 'user', text: trimmedInput }];
        setMessages(newMessages);
        setUserInput('');

        setIsLoading(true);

        // Call to ChatGPT API
        const data = {
            model: "text-davinci-003", // Use the latest model
            prompt: trimmedInput,
            temperature: 0.7,
            max_tokens: 150,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        };

        try {
            const response = await fetch('https://api.openai.com/v1/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_CHATGPT_API_KEY}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                // Handle HTTP errors
                console.error('API request failed with status', response.status);
                setMessages(prevMessages => [...prevMessages, { type: 'bot', text: 'Error contacting the API.' }]);
                setIsLoading(false);
                return;
              }

            const responseData = await response.json();
            setMessages(prevMessages => [...prevMessages, { type: 'bot', text: responseData.choices[0].text }]);
        } catch (error) {
            console.error('Error fetching ChatGPT response:', error);
            setMessages(prevMessages => [...prevMessages, { type: 'bot', text: 'Sorry, I encountered an error.' }]);
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
