import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import currencySetter from '../utilities/currencySetter'

const Trending = ({currency}) => {

    const [trending, setTrending] = useState([]) 
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage='24h'`

    console.log('This is the trending api data-->', trending)
    
    useEffect(() => {
       axios.get(url).then(res => {
           setTrending(res.data)
       })
    }, [currency]);

    const responsive = {
        0: {items: 4},
        580: {items: 4},
        1024: {items: 6}
      };

      const items = trending.map((coin) => {
        let profit = coin?.price_change_percentage_24h >= 0;

        return(
            <Link 
                to={`/coins/${coin.id}`}
                className='flex flex-col items-center justify-center cursor-pointer text-white uppercase'
            >
                    <img 
                        src={coin?.image}
                        alt={coin.name}
                        height="40"
                        width="40" 
                    />
                     <span>
                      {coin?.symbol}
                      &nbsp;
                      <span
                        style={{
                          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                      </span>
                    </span>
                    <span style={{ fontSize: 22, fontWeight: 500 }}>
                       {currencySetter(coin?.current_price.toFixed(2), currency)}
                    </span>
            </Link>
        )

      })

    return (
        <div className='h-[50%] flex items-center w-full'>
            <AliceCarousel 
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
        </div>
    )
}

export default Trending
