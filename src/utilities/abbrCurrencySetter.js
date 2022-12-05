
const currencySetter = (number, currency) => {
  
  return Intl.NumberFormat(
    'en', 
    { 
      style: 'currency', 
      notation: 'compact',
      //  twenty,
      currency: currency 
    }
  ).format(number);

}

export default currencySetter