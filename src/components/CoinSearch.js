import React, { useState, useEffect, useContext } from 'react'
import CoinItem from './CoinItem'
import axios from 'axios'
import { CurrencyContext } from '../context/CurrencyContext'
import InfiniteScroll from "react-infinite-scroll-component";

const CoinSearch = () => {

    const {currency, setCurrency} = useContext(CurrencyContext)

    const [coins, setCoins] = useState([])

    const getCoins = async (perPage = 10) => {
        try{
            const {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=${perPage}&page=1&sparkline=true&price_change_percentage=%2724h%27`)
            setCoins(data)
            
        } catch (err) {
            console.log(err)
        }
    }
    
    useEffect(() => {
       getCoins()
    }, [currency])

    const [searchCoin, setSearchCoin] = useState('')
    console.log('Here is the CoinSearch Data-->', coins)
    
    return (
        <InfiniteScroll
            dataLength={coins.length}
            next={() => getCoins(coins.length + 10)}
            hasMore={coins && coins.length >= 100 ? false : true}
            loader={<h1 className="text-center">Loading...</h1>}
        > 
            <div className="rounded-div my-4">

                <div className='pt-6 pb-10 flex justify-center text-center'>
                    <div className='flex flex-col md:flex-row w-full'>
                        <h1 className='text-2xl font-bold my-1 mr-2 ml-8'>Search Crypto</h1>
                        <form>
                            <input onChange={(e) => setSearchCoin(e.target.value)} className='w-full bg-primary border border-input px-4 py-2 rounded-2xl shadow-xl' type='text' placeholder='Search a coin' />
                        </form>
                    </div>
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
                        {
                            coins.filter(value => {
                                if(searchCoin === '' ){
                                    return value
                                }else if (value.name.toLowerCase().includes(searchCoin.toLowerCase())){
                                    return value
                                }
                            }).sort((a,b) => a.market_cap_rank - b.market_cap_rank).map(coin=> (
                                <CoinItem coin={coin}/>
                                ))
                        }
                    </tbody>

                </table>

            </div>
        </InfiniteScroll>
    )
}

export default CoinSearch
