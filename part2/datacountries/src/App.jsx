import { useEffect, useState } from 'react'
import axios from 'axios'
import Form from './components/Form'
import Countries from './components/Countries'
import Country from './components/Country'
import countryService from './services/countries'

function App() {
  const [countries, setCountries] = useState(null)
  const [filteredCountry, setFilteredCountry] = useState([])
  const [countryInput, setCountryInput] = useState(null)

  // on first render, get all countries data from api
  useEffect(() => {
    countryService.getAll()
      .then(response =>{
        setCountries(response)
        console.log("countries loaded")
      })
      .catch(error => console.log("error fetching all countries from server"))
  }, [])

  // handle input change
  const handleInputChange = (event) => {
    const value = event.target.value

    setCountryInput(value)

    //console.log(countries)
    setFilteredCountry(countries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase())))
  }

  return (
    <div className='main'>
      <h1>Data for Countries</h1>

      {!countries ? (
        <h2>Fetching data... please wait</h2>
      ) : (
        <>
          <Form handleInputChange={handleInputChange}/>
          <Countries filteredCountries={filteredCountry}/>
        </>
      )}
    </div>
  )
}

export default App
