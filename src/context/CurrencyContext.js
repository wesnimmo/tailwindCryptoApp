import React, { useState, useEffect, createContext } from 'react'

const getInitialCurrency = () => {

    const localCurrency = window.localStorage.getItem('currency');
    // localCurrency !== null ? localCurrency : "USD";
    if(localCurrency !== null){
        return localCurrency
    } else{
        return 'USD'
    }

}

export const CurrencyContext = createContext();

export const CurrencyProvider = ({children}) => {

    const [currency, setCurrency] = useState(getInitialCurrency());

    const changeCurrency = (curr) => {

        window.localStorage.setItem('currency', curr)

    }

    useEffect(() => {

        changeCurrency(currency)

    }, [currency])

    return(
        <CurrencyContext.Provider value={{currency, setCurrency}} >
            {children}
        </CurrencyContext.Provider>
    )

}