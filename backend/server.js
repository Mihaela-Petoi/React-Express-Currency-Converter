const express = require('express');
const axios = require('axios');
const cors = require('cors');
const WebSocket = require('ws');
require('dotenv').config();

const app = express();
const port = 5000;

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

const wss = new WebSocket.Server({ noServer: true });

app.server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

wss.on('connection', (ws) => {
  console.log('A new WebSocket connection has been established');

  ws.on('message', (message) => {
    console.log('Received message:', message);

    ws.send(JSON.stringify({ message: 'Server received your message' }));
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error('API_KEY is not set in the .env file');
  process.exit(1);
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello! Your Node.js application is working!');
});

app.post('/convert', async (req, res) => {
  const { amount, fromCurrency, toCurrency } = req.body;

  if (!amount || !fromCurrency || !toCurrency) {
    return res.status(400).json({ error: 'Missing required fields (amount, fromCurrency, toCurrency)' });
  }

  try {
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`;
    const response = await axios.get(url);

    if (response.data.conversion_rates[toCurrency]) {
      const rate = response.data.conversion_rates[toCurrency];
      const convertedAmount = amount * rate;

      res.json({
        originalAmount: amount,
        fromCurrency,
        toCurrency,
        conversionRate: rate,
        convertedAmount,
      });

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            message: `Converted ${amount} ${fromCurrency} to ${convertedAmount} ${toCurrency}`,
            originalAmount: amount,
            fromCurrency,
            toCurrency,
            conversionRate: rate,
            convertedAmount,
          }));
        }
      });
    } else {
      return res.status(400).json({ error: 'Currency not supported' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong with the API request' });
  }
});
