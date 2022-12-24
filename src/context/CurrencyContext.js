import React, { useState, useEffect, createContext } from 'react';
import { getInitialCurrency } from '../utilities/initialValueGetter'



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