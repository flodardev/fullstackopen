import CountryListItem from "./CountryListItem"
import Country from "./Country"

const Countries = ({filteredCountries, handleShowButton}) => {

    // show the list of countries when there is <= 10 filtered
    if (filteredCountries.length > 10) {
        return (
            <div>
                match results: {filteredCountries.length} ; result has too many match, please be more specific
            </div>           
        )
    } else if (filteredCountries.length === 1) {
        return <Country country={filteredCountries[0]}/>
    } else {
        return (
            <div>
                {filteredCountries.map(country => <CountryListItem key={country.name.common} country={country}/>)}
            </div>
        )
    }


    // each list item has a button to show their details
    // if the list has only 1 country then show the one country and their details
}

export default Countries