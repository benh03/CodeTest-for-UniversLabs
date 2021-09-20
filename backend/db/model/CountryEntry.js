const CountryEntry = (name, hours, minutes) => {

  const countryName = name.trim()

  const isValid = () => countryName.length > 0 && !isNaN(hours) && !isNaN(minutes)  

  const getEntry = () => ({   
      country:countryName,
      hours:parseInt(hours),
      minutes:parseInt(minutes)    
  })

  return {
    getEntry,
    isValid
  }
}


module.exports = CountryEntry