import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries.jsx'

const API_KEY = import.meta.env.VITE_WEATHER_KEY

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [expandedCountries, setExpandedCountries] = useState([])

  // Get countries
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(res => setCountries(res.data))
  }, [])

  const handleQuery = (event) => {
    setQuery(event.target.value)
    setExpandedCountries([])
  }

  const toggleCountryExpansion = (key) => {
    const copy = [...expandedCountries]
    const match = copy.find(code => code === key)
    if (match) return setExpandedCountries(copy.filter(code => code !== key))
    copy.push(key)
    setExpandedCountries(copy)
  }

  return (
    <div>
      <div>Find countries: <input value={query}
				  onChange={handleQuery}/></div>

      <Countries countries={countries}
		 expandedCountries={expandedCountries}
		 query={query} onClick={toggleCountryExpansion}/>

      </div>

  )
}

export default App
