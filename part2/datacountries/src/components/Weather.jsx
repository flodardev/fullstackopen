import { useEffect, useState } from "react"
import WeatherService from "../services/weather"

const Weather = ({country}) => {
    const [weather, setWeather] = useState(null)
    const lat = country.latlng[0]
    const lon = country.latlng[1]

    useEffect(()=>{
        WeatherService.getWeather(lat, lon)
        .then(response => {
            setWeather(response)
        })
    }, [country])

    return (
        <div>
            <h2>Weather in {country.name.common}</h2>

            {weather ? (
                <div>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
                    <p>Currently the weather is: {weather.weather[0].main}</p>
                    <p>Description: {weather.weather[0].description}</p>
                    <p>Temperature is {weather.main.temp} celcius</p>
                    <p>Feels like {weather.main.feels_like} celcius</p>
                    <p>Wind: {weather.wind.speed}</p>
                </div>
            ) : (
                <h3>Fetching weather data... please wait</h3>
            )}
        </div>
    )
}

export default Weather