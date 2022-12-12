import React, { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import { CurrencyProvider } from './context/CurrencyContext'
import CoinPage from './pages/CoinPage';
import Home from './pages/Home';

function App() {

  // const [currency, setCurrency] = useState('USD')
  
  // const getCurrency = (value) => {
  //     setCurrency(value)
  // }

  // useEffect(() => {
  //   console.log('here is the currency-->', currency)
  // }, [currency])

  return (
    <ThemeProvider>
      <CurrencyProvider>
        <Navbar/>
         <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/coins/:coinId" element={<CoinPage/>} />
        </Routes>
      </CurrencyProvider>
    </ThemeProvider>
  );
}

export default App;
