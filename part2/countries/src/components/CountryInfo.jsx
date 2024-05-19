import Weather from "./Weather"

const Language = ({language}) => {
    return (  
        <li>
            <span>{language}</span>
        </li>
    );
}

const Languages = ({languages}) => {
    const boldStyle = { fontWeight: 'bold' }
    return (  
        <div>
            <p style={boldStyle}> languages:  </p>
            <ul>
                {Object.keys(languages).map(code => (
                    <Language key={code} code={code} language={languages[code]} />
                ))}
            </ul>
        </div>
    );
}


const CountryInfo = ({country}) => {
    return (  
        <div>
            <h2> {country.name.common} </h2>
            <p> capital {country.capital[0]} </p>
            <p> area {country.area} </p>

            <Languages languages={country.languages}/>

            <img src={country.flags.png} />

            <Weather lat={country.latlng[0]} lon={country.latlng[1]} capital={country.capital[0]} />
            
        </div>
    )
}
 
export default CountryInfo;