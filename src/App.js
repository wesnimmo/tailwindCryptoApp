import React, { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import CoinPage from './pages/CoinPage';
import Home from './pages/Home';

function App() {

  const [currency, setCurrency] = useState('USD')
  
  const getCurrency = (value) => {
      setCurrency(value)
  }

  useEffect(() => {
    console.log('here is the currency-->', currency)
  }, [currency])

  return (
    <ThemeProvider>
      <Navbar setCurrency={getCurrency} />
       <Routes>
        <Route path="/" element={<Home currency={currency}  />} />
        <Route path="/coins/:coinId" element={<CoinPage currency={currency} />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
