import './App.css';
import { useState, useEffect } from 'react'
import debounce from './libs/debounce'
import DropdownSearch from './components/DropdownSearch/DropdownSearch'

function App() {

  const [timezones, setTimezones] = useState([])
  const [searchValue, setSearchValue] = useState("")
  

  const handleOnChange = (event) => {
    const value = event.target.value
    setSearchValue(value)
    _getTimezoneByNameLimited(value)
  }

  const _getTimezoneByNameLimited = debounce((val) => getTimezoneByName(val), 500)

  const getTimezoneByName = async value => {
    const response = await fetch(`http://localhost:7200/?q=${value}`)
    const responseJson = await response.json()
    setTimezones(responseJson)
  }

  useEffect(()=> {    
    getTimezoneByName("")
  }, [])


  return (
    <div className="App">
      <DropdownSearch onChange={handleOnChange} value={searchValue} timezones={timezones}/>   
    </div>
  );
}

export default App;


