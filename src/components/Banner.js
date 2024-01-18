import React from 'react'
import Trending from './Trending'

const Banner = () => {
    return (
        <div className="h-[175px] flex flex-col items-center justify-center text-white bg-[url('../banner2.jpg')]">
            <h3 className="text-[23px] mb-5 font-bold">Trending Coins Yo</h3>
            {/* <p>Get all the info regarding your favorite crypto currency</p> */}
            <Trending/>
        </div>
    )
}

export default Banner
