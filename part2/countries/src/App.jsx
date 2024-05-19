import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import CountryInfo from './components/CountryInfo'
import CountryList from './components/CountryList'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [searchValue, setSearchValue] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])

  // GET all countries
  useEffect(() => {
    countriesService
      .getAll()
      .then(data => {
        setAllCountries(data)
        console.log("sucessful GET all", allCountries.length)
      })
      .catch( () => {
        console.log("failed to get countries")
      })
  }, [])

  // search handler
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchValue(searchTerm)

    const filtered = allCountries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm)
    )
    setFilteredCountries(filtered)
  }

  // show handler
  const showHandler = ({name}) => {
    const filtered = [allCountries.find(country => country.name.common === name)]
    setFilteredCountries(filtered)
  }

  // content to display depending on search
  let content;
  if (filteredCountries.length === 1) {
    content = <CountryInfo country={filteredCountries[0]} />
  } else if (filteredCountries.length > 10) {
    content = <p>Too many matches, specify another filter</p>
  } else {
    content = <CountryList filteredCountries={filteredCountries} showHandler={showHandler}/>
  }
  

  return (
    <>
      <div>
        find countries <input onChange={handleSearch} />
      </div>
      <br/>
      <div>
        {content}
      </div>
    </>
  )
}

export default App
