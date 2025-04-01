import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('RON');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState('');

  const currencies = ['USD', 'EUR', 'RON', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'SEK', 'PLN'];

  const createSparkle = (x, y) => {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 800);
  };

  const triggerSparkles = (event) => {
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const offsetX = (Math.random() - 0.5) * 150;
        const offsetY = (Math.random() - 0.5) * 150;
        createSparkle(event.clientX + offsetX, event.clientY + offsetY);
      }, i * 40);
    }
  };

  const handleConvert = async (event) => {
    triggerSparkles(event);

    try {
      const response = await axios.post('http://localhost:5000/convert', {
        amount: parseFloat(amount),
        fromCurrency,
        toCurrency,
      });

      if (response.data.convertedAmount) {
        setConvertedAmount(parseFloat(response.data.convertedAmount).toFixed(2));
        setError('');
      } else {
        setError('No conversion result. Please try again.');
        setConvertedAmount(null);
      }
    } catch (err) {
      setError('Conversion error. Please try again.');
      setConvertedAmount(null);
    }
  };

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <div>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </label>
      </div>

      <div>
        <label>
          From Currency:
          <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          To Currency:
          <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button onClick={handleConvert}>Convert</button>

      {convertedAmount !== null && (
        <div>
          <h2>Converted Amount</h2>
          <p>{convertedAmount} {toCurrency}</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default App;