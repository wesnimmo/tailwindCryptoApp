import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { FaTwitter, FaFacebook, FaReddit, FaGithub } from 'react-icons/fa';
import { AiFillCaretUp, AiOutlineCaretDown } from 'react-icons/ai'
import DOMPurify from 'dompurify'
import { useParams } from 'react-router-dom';
import currencySetter from '../utilities/currencySetter'
import { CurrencyContext } from '../context/CurrencyContext'


const CoinPage = () => {

    const {currency, setCurrency} = useContext(CurrencyContext)
    const [coin, setCoin] = useState({});
    const params = useParams()

    const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}?tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=true`

    useEffect(() => {
        axios.get(url).then(response => {
            setCoin(response.data)
            console.log('CoinPage Comp data-->', response.data)
        })
    }, [currency]);

    const priceChangeUp_24 = coin?.market_data?.price_change_percentage_24h > 0;
    const priceChangeUp_7d = coin?.market_data?.price_change_percentage_7d > 0;
    const priceChangeUp_14d = coin?.market_data?.price_change_percentage_14d > 0;
    const priceChangeUp_30d = coin?.market_data?.price_change_percentage_30d > 0;
    const priceChangeUp_60d = coin?.market_data?.price_change_percentage_60d > 0;
    const priceChangeUp_1y =  coin?.market_data?.price_change_percentage_1y > 0;
    
    return (
     <div className='rounded-div my-12 py-8'>

      <div className='flex py-8'>
        <img className='w-20 mr-8' src={coin.image?.large} alt='/' />
        <div>
          <p className='text-3xl font-bold'>{coin?.name} price</p>
          <p>({coin.symbol?.toUpperCase()} / {currency})</p>
        </div>
      </div>

      <div className='grid md:grid-cols-2 gap-8'>
        <div>
          <div className='flex justify-between'>
            {coin.market_data?.current_price[currency.toLowerCase()] ? (
              <p className='text-3xl font-bold'>{currencySetter(coin?.market_data.current_price[currency.toLowerCase()], currency)}</p>
            ) : null}
            <p>7 Day</p>
          </div>
          <div>
            <Sparklines data={coin.market_data?.sparkline_7d.price}>
              <SparklinesLine color='teal' />
            </Sparklines>
          </div>
          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>Market Cap</p>
              {coin?.market_data?.market_cap[currency.toLowerCase()] ? (
                <p>{currencySetter(coin?.market_data.market_cap[currency.toLowerCase()], currency)}</p>
              ) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Volume (24h)</p>
              {coin.market_data?.total_volume ? (
                <p>{currencySetter(coin.market_data.total_volume[currency.toLowerCase()], currency)}</p>
              ) : null}
            </div>
          </div>

          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>24h High</p>
              {coin.market_data?.high_24h[currency.toLowerCase()] ? (
                <p>{currencySetter(coin.market_data.high_24h[currency.toLowerCase()], currency)}</p>
              ) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>24h Low</p>
              {coin.market_data?.low_24h[currency.toLowerCase()] ? (
                <p>{currencySetter(coin.market_data.low_24h[currency.toLowerCase()], currency)}</p>
              ) : null}
            </div>
          </div>
        </div>
        <div>
          <p className='text-xl font-bold'>Market Stats</p>
          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>Market Rank</p>
              {coin.market_cap_rank}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Hashing Algorithm</p>
              {coin.hashing_algorithm ? <p>{coin.hashing_algorithm}</p> : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Trust Score</p>
              {coin.tickers ? <p>{coin.liquidity_score.toFixed(2)}</p> : null}
            </div>
          </div>
          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (24h)</p>
              <p className={priceChangeUp_24 ? 'text-green-600 flex items-center' : 'text-red-600 flex items-center'}>
                {coin?.market_data?.price_change_percentage_24h.toFixed(2)}%
                {priceChangeUp_24 ? <AiFillCaretUp/> : <AiOutlineCaretDown />}
              </p>
            </div>

            <div>
              <p className='text-gray-500 text-sm'>Price Change (7d)</p>
               <p className={priceChangeUp_7d ? 'text-green-600 flex items-center' : 'text-red-600 flex items-center'}>
                {coin?.market_data?.price_change_percentage_7d.toFixed(2)}%
                {priceChangeUp_7d ? <AiFillCaretUp/> : <AiOutlineCaretDown />}
              </p>
            </div>

            <div>
              <p className='text-gray-500 text-sm'>Price Change (14d)</p>
              <p className={priceChangeUp_14d ? 'text-green-600 flex items-center' : 'text-red-600 flex items-center'}>
                {coin?.market_data?.price_change_percentage_14d.toFixed(2)}%
                {priceChangeUp_14d ? <AiFillCaretUp/> : <AiOutlineCaretDown />}
              </p>
            </div>
          </div>
          <div className='flex justify-between py-4'>

            <div>
              <p className='text-gray-500 text-sm'>Price Change (30d)</p>
              <p className={priceChangeUp_30d ? 'text-green-600 flex items-center' : 'text-red-600 flex items-center'}>
                {coin?.market_data?.price_change_percentage_30d.toFixed(2)}%
                {priceChangeUp_30d ? <AiFillCaretUp/> : <AiOutlineCaretDown />}
              </p>
            </div>
            
            <div>
              <p className='text-gray-500 text-sm'>Price Change (60d)</p>
              <p className={priceChangeUp_60d ? 'text-green-600 flex items-center' : 'text-red-600 flex items-center'}>
                {coin?.market_data?.price_change_percentage_60d.toFixed(2)}%
                {priceChangeUp_60d ? <AiFillCaretUp/> : <AiOutlineCaretDown />}
              </p>
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (1y)</p>
              <p className={priceChangeUp_1y ? 'text-green-600 flex items-center' : 'text-red-600 flex items-center'}>
                {coin?.market_data?.price_change_percentage_1y.toFixed(2)}%
                {priceChangeUp_1y ? <AiFillCaretUp/> : <AiOutlineCaretDown />}
              </p>
            </div>
          </div>
          <div className='flex justify-around p-8 text-accent'>
            <FaTwitter />
            <FaFacebook />
            <FaReddit />
            <FaGithub />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className='py-4'>
        <p className='text-xl font-bold'>About {coin.name}</p>
        <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(coin.description ? coin.description.en : ''),}} ></p>
      </div>
    </div>
    )
}

export default CoinPage
