const fs = require("fs")
const { parseStringPromise } = require('xml2js')
const CountryEntry = require("./model/CountryEntry")



//Required to parse the XML Data and make it accessible to the server.
const fakeDatabase = async (filename, encoding = "utf8") => {

  const timezonesRawXML = fs.readFileSync(filename, encoding)
  let database = []

  try {
    const timezonesXML = await parseStringPromise(timezonesRawXML)
    database = parseXMLData(timezonesXML)    
  }
  catch (err) {
    console.error("Unable to parse timezone xml")
    throw new Error(err)
  }


  //This is a very basic search. Possibly look at implementing a 
  //fuzzy search for better UX
  function findTimezoneByCountry(term){
    if (database.length === 0) {
      console.error("Database is empty. Nothing to search")
    }
    const searchTerm = term ? term.toLowerCase() : ""

    return database.filter(x => {
      const countryName = x.country.toLowerCase()
      return countryName.substring(0, term.length) === searchTerm
    })
  }

  return {
    findTimezoneByCountry
  }

}

module.exports = fakeDatabase


//Required to get list of country names by removing the UTC infomation and 
//seperating countries by string. To give a list of countries from a specific
//time zone
const getCountryNames = timezone => {
  const countrylist = timezone.Name[0].replace(/UTC[-+]\d+:\d+/gm, '')
  const countryNames = countrylist.split(",")
  return countryNames
}

//Required To Parse The XML data. Its very messy so need to tidy this somehow.
//But I dont want to change the raw XML so this will do for now. 
const parseXMLData = rawXMLData => {
  const database = []
  const timezones = rawXMLData.TimeZones.TimeZone
  timezones.forEach(x => {
    const countryNames = getCountryNames(x)
    countryNames.forEach(country => {
      const entry = CountryEntry(country, x.Hours[0], x.Mins[0])

      if(entry.isValid()){
        database.push(entry.getEntry())
      }

    })
  })

  return database
}