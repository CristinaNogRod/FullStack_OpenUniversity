import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const Weather = ({lat, lon, capital}) => {
    const [weatherData, setWeather] = useState()
    const [weatherIcon, setIcon] = useState()

    // GET weather data
    useEffect(() => {
        weatherService
        .getWeather(lat, lon)
        .then(data => {
            setWeather(data)
            console.log("sucessful GET weather")
        })
        .catch( () => {
            console.log("failed to get weather")
        })
    }, [capital])

    // GET weather Icon
    useEffect(() => {
        if (weatherData && weatherData.current && weatherData.current.weather && weatherData.current.weather[0] && weatherData.current.weather[0].icon) {
            const icon = weatherData.current.weather[0].icon
            weatherService
            .getWeatherIcon(icon)
            .then(data => {
                setIcon(data)
                console.log("sucessful GET weather icon")
            })
            .catch( () => {
                console.log("failed to get weather icon")
            })
        }
    }, [weatherData])


    return (  
        <div>
            <h3>Weather in {capital}</h3>
            {weatherData && (
                <>
                    <p>Temperature {weatherData.current.temp} Celsius</p>
                    {weatherIcon ? (
                            <img src={weatherIcon} alt="Weather icon" />
                        ) : (
                            <p>Loading...</p> 
                        )}
                    <p>Wind {weatherData.current.wind_speed} m/s</p>
                </>
            )}
        </div>
    );
}

export default Weather;