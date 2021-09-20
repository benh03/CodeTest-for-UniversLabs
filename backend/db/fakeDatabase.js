const fs = require("fs")
const { parseStringPromise } = require('xml2js')





const fakeDatabase = async (filename, encoding = "utf8") => {

  const timezonesRawXML = fs.readFileSync(filename, encoding)
  const database = []

  try {
    const timezonesXML = await parseStringPromise(timezonesRawXML)
    const timezones = timezonesXML.TimeZones.TimeZone
    timezones.forEach(x => {
      const countrylist = x.Name[0].replace(/UTC[-+]\d+:\d+/gm, '')
      const countryNames = countrylist.split(",")


      countryNames.forEach(country => {
        const entry = CountryEntry(country, x.Hours[0], x.Mins[0])
        if(entry.isValid()){
          database.push(entry.getEntry())
        }
      })

    })
  }
  catch (err) {
    console.error("Unable to parse timezone xml")
    throw new Error(err)
  }

  const findTimezoneByCountry = term => {

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