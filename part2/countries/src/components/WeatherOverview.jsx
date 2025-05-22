const WeatherOverview = ({weatherData}) => {
  if (weatherData) {
    const icon = weatherData.weather[0].icon
    const iconAlt = weatherData.weather[0].description
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
    return (
      <div>
	<h2>Weather in {weatherData.name}</h2>
	<p>Temperature {weatherData.main.temp}°C</p>
	<img alt={iconAlt} src={iconUrl}/>
	<p>Wind {weatherData.wind.speed} m/s</p>
      </div>
    )
  }
}

export default WeatherOverview
