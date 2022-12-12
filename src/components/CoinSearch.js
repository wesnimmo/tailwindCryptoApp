import React, { useState, useEffect, useContext } from 'react'
import CoinItem from './CoinItem'
import axios from 'axios'
import { CurrencyContext } from '../context/CurrencyContext'

const CoinSearch = () => {

    const {currency, setCurrency} = useContext(CurrencyContext)

    const [coins, setCoins] = useState([]) 
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=true&price_change_percentage='24h'`

    useEffect(() => {
        axios.get(url).then(res => {
            setCoins(res.data)
        })
    }, [currency])


    console.log('Here is the CoinSearch Data-->', coins)
    
    return (
        <div className="rounded-div my-4">

            <div className='flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right'>
                <h1 className='text-2xl font-bold my-2'>Search Crypto</h1>
                <form>
                    <input className='w-full bg-primary border border-input px-4 py-2 rounded-2xl shadow-xl' type="text" placeholder='Search a coin' />
                </form>
            </div>

            <table className="w-full border-collapse text-center">
                <thead>
                     <tr className='border-b'>
                        <th className='px-4'>#</th>
                        <th className='tetxt-left'>Coin</th>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>24h</th>
                        <th className='hidden md:table-cell'>24h Volume</th>
                        <th className='hidden sm:table-cell'>Mkt</th>
                        <th>Last 7 Days</th>
                    </tr>
                </thead>

                <tbody>
                     {coins.map(coin=> (
                      <CoinItem coin={coin}/>
                    ))}
                </tbody>

            </table>

        </div>
    )
}

export default CoinSearch
