import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import axios from 'axios'
import WeatherCard from './components/WheatherCard'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true) 
  const [hasError, setHasError] = useState(false) 
  const [setshowMessage, setSetshowMessage] = useState(false)  
  
  useEffect(() => {

    setTimeout(() => {
      setSetshowMessage(true)
    }, 3000)
   
    const success = pos => {
        
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        })
    }

    const error = () => {
      setHasError(true)
      setIsLoading(false)
    }
  
    navigator.geolocation.getCurrentPosition(success)

  }, [])
  
console.log (coords)

useEffect(() => {
  if (coords) {

    const API_KEY = '5fa1e356ea5d9c540b1f96ba6b7df9ea'
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}` 

    axios.get(url)
      .then(res => {
        setWeather(res.data)
        const celsius = (res.data.main.temp - 273.15).toFixed(1)
        const fahrenheit = (celsius * 9/5 +32).toFixed(1)
        setTemp({celsius,fahrenheit})
      })
      .catch( err => console.log(err))
      .finally(() => setIsLoading(false))
  }

}, [coords])


  return (
    <div className='app'>
      {
        isLoading
        ? (
        <div>
          <h1 style={{color: 'gray'}}> 🚵 loading...</h1>
          {
            setshowMessage && <p style={{color: 'gray'}}>Por favor activa la ubicación</p>
          }
          
        </div>
      )
        : (
          hasError
          ? <h1> 😵  Para obtener el clima de tu ciudad por favor permite la ubicacion</h1>
            : (   
          <WeatherCard 
          weather= {weather}
          temp = {temp}
        />
            )
         
        )
      }
       
       
       
      </div>
  )
}

export default App
