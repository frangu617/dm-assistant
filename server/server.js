const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fetch = require('node-fetch'); // Make sure to install node-fetch if you haven't
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

const characterRoutes = require('./controllers/characterController.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('MongoDB connection error:', error));

app.use('/api/characters', characterRoutes);

// OpenAI ChatGPT Route
app.post('/api/chatgpt', async (req, res) => {
  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Ensure this matches your .env variable
      },
      body: JSON.stringify({
        model: "text-davinci-003", // or the latest model
        prompt: req.body.prompt,
        temperature: 0.7,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('OpenAI API request error:', error);
    res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
