import React from 'react'
import { Link } from 'react-router-dom';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import currencySetter from '../utilities/currencySetter'
import abbrCurrencySetter from '../utilities/abbrCurrencySetter'

const CoinItem = ({coin, currency}) => {
    return (
       <tr className="h-[80px] border-b overflow-hidden">
         <td>{coin.market_cap_rank}</td>
        <td>
            <Link to={`/coins/${coin.id}`}>
                <div className='flex items-center'>
                    <img className='w-6 mr-2 rounded-full' src={coin.image} alt={coin.id} />
                    <p className='hidden sm:table-cell'>{coin.name}</p>
                </div>
            </Link>
        </td>
        <td>{coin.symbol.toUpperCase()}</td>
        <td>{currencySetter(coin?.current_price.toFixed(2), currency)}</td>
        <td>
            {
                coin.price_change_percentage_24h > 0 ? (
                    <p className='text-green-600'>{coin.price_change_percentage_24h.toFixed(2)}%</p>
                ) : (
                    <p className='text-red-600'>{coin.price_change_percentage_24h.toFixed(2)}%</p>
                )
            }
        </td>
        <td className='w-[180px] hidden md:table-cell'>{abbrCurrencySetter(coin.total_volume.toFixed(2), currency)}</td>
        <td className='w-[180px] hidden sm:table-cell'>{abbrCurrencySetter(coin.market_cap.toFixed(2), currency)}</td>
        <td>
            <Sparklines data={coin.sparkline_in_7d.price}>
                <SparklinesLine color='teal' />
            </Sparklines>
            
        </td>
       </tr>
    )
}

export default CoinItem
