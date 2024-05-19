import axios from 'axios'
const baseUrl = "https://api.openweathermap.org/data/3.0"
const api_key = import.meta.env.VITE_SOME_KEY


const getWeather = (lat, lon) => {
    const request = axios.get(`${baseUrl}/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`)//&appid=${apiKey}
    return request.then(response => response.data)
}

const getWeatherIcon = ({icon}) => {
    const icon1 = "10d"
    const request = axios.get(`https://openweathermap.org/img/wn/${icon1}@2x.png`)
    return request.then(response => response.data)
}

export default {getWeather, getWeatherIcon} 