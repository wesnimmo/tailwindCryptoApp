import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';



const Navbar = ({setCurrency}) => {
    const [nav, setNav] = useState(false);
    const [currencies, setCurrencies] = useState([])

    const url = 'https://api.coingecko.com/api/v3/simple/supported_vs_currencies'


     const handleNav = () => {
        setNav(!nav)
    }

    const handleChange = (value) => {
        setCurrency(value)
    }

    useEffect(() => {
         axios.get(url).then(response => {
            setCurrencies(response.data);
        })
        //console.log('here is the currencies-->', currencies)
      }, [])

    return (
     <div className="rounded-div flex items-center justify-between h-20 font-bold">
       <Link to='/'>
         <h1 className='text-2xl'>Cryptobase</h1>
       </Link>
        <div className='hidden md:block'>
            <ThemeToggle/>
        </div>
           
         <div className='hidden md:block'>
             <form>
               <select
                    onChange={(e) => handleChange(e.target.value)}
                >
                    <option value="usd">USD</option>
                   {
                    currencies.map((currency) => {
                        return (
                        <option key={currency} value={currency}>{currency.toUpperCase()}</option>
                        )
                    })
                   }
                </select>
            </form>
        </div>
      
           
        {/* Menu Hamburger Icon */}
        <div onClick={handleNav} className='block md:hidden cursor-pointer z-10'>
            {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
        </div>
        {/* Mobile Menu */}
        <div 
            className={
                nav ? 'md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10'
                : 'fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300'
            }
        >
            <ul className='w-full p-4'>
                <li onClick={handleNav} className='border-b py-6'>
                   Home
                </li>
                <li onClick={handleNav} className='border-b py-6'>
                    Account
                </li>
                <li className='py-6'>
                    <h2>ThameToggle</h2>
                </li>
            </ul>
            <div className='flex flex-col w-full p-4'>
                <button onClick={handleNav} className='w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl'>Sign In</button>
                <button className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'>Sign Up</button>
            </div>
        </div>
    </div>
    )
}

export default Navbar
