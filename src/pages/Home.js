import React from 'react'
import Banner from '../components/Banner'
import CoinSearch from '../components/CoinSearch'

const Home = ({currency}) => {

    return (
        <div>
            <Banner currency={currency} />
            <CoinSearch currency={currency} />
        </div>
    )
}

export default Home
