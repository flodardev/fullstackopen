import Weather from "./Weather"

const Country = ({country}) => {

    const name = country.name.common
    const flagUrl = country.flags.svg
    const flagAlt = country.flags.alt
    const capital = country.capital[0]
    const area = country.area
    const languages = Object.entries(country.languages).map(([key, value]) => (
        {
            key: key,
            name: value
        }
    ))

    return (
        <div className="countryInfo">
            <h2>{name}</h2>
            <img className="flagImg" src={flagUrl} alt={flagAlt} />
            <p>Capital: {capital}</p>
            <p>Area: {area}</p>
            <h2>Languages spoken:</h2>
            <ul>
                {languages.map(language => <li key={language.key}>{language.name}</li>)}
            </ul>
            <Weather country={country}/>
        </div>
    )
}
export default Country