const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//resposta do server
app.post('/generate', async (req, res) => {
    const { prompt } = req.body;
    try {
        const message = await model.generateContent(prompt);
        const response = await message.response;
        const text = await response.text();
        res.json({ response: text });
    } catch (error) {
        console.error('Falha ao gerar resposta:', error);
        res.status(500).json({ error: 'Falha ao gerar resposta' });
    }
});

app.listen(port, () => {
    console.log(`Servidor está rodando no http://localhost:${port}`);
});
