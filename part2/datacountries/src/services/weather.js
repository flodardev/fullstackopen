import axios from "axios"
const apiKey = import.meta.env.VITE_API_KEY

const getWeather = (lat, lon) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${"metric"}&appid=${apiKey}`
    console.log("getting weather info")

    const request = axios.get(apiUrl)
    return request.then(response => response.data)
}

export default { getWeather }