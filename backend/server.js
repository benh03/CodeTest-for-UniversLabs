const express = require('express')
const path = require("path");
const cors = require('cors')
const fakeDatabase = require("./db/fakeDatabase")

const main = async () => {

  const app = express()
  app.use(cors())
  const port = 7200

  const database = await fakeDatabase(path.join('db/timezones.xml'))


  app.get('/', (req, res) => {
    const query = req.query.q ? req.query.q : ""
    const results = database.findTimezoneByCountry(query)
    results.sort((a, b) => a.country > b.country ? 1 : -1)
    return res.send(results)
  })


  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })

}

main()

