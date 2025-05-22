import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList.jsx'
import CountryOverview from './components/CountryOverview.jsx'
import WeatherOverview from './components/WeatherOverview.jsx'

// NOTE env variables have to start with VITE_
const API_KEY = import.meta.env.VITE_WEATHER_KEY

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)

  // Get countries
  useEffect(() => {
    const countriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
    axios
      .get(countriesUrl)
      .then(res => setCountries(res.data))
  }, [])

  // Get weather
  useEffect(() => {
    if (city) {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      axios
	.get(weatherUrl)
	.then(res => setWeatherData(res.data))
    }
  }, [city])

  const handleSearch = (event) => setSearchQuery(event.target.value)

  const searchMatches = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase()))

  const singleMatch = searchMatches.length === 1

  if (singleMatch) {
    // Sometimes there are a few capitals
    const mainCapital = searchMatches[0].capital[0]
    if (city !== mainCapital) setCity(mainCapital)
  }

  return (
    <div>
      <div>Find countries: <input value={searchQuery}
				  onChange={handleSearch}/></div>

      {singleMatch ? (
	<div>
	  <CountryOverview country={searchMatches[0]} weatherData={weatherData} />
	  <WeatherOverview weatherData={weatherData} />
	</div>
      ) : (<CountryList countries={searchMatches} setSearchQuery={setSearchQuery}/>)}

    </div>
  )
}

export default App
