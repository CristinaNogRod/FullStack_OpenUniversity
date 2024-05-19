const CountryName = ({name, showHandler}) => {
    return (
        <div>
            <span>{name}  </span>
            <button onClick={() => showHandler({name})}>show</button>
        </div>
    )
}

const CountryList = ({filteredCountries, showHandler}) => {
    const countryNames = filteredCountries.map(country => country.name.common)
    return (  
        <div>
            {countryNames.map(name => <CountryName key={name} name={name} showHandler={showHandler}/> )}
        </div>
    )
}
 
export default CountryList