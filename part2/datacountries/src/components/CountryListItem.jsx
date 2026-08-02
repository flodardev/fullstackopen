import Country from "./Country";
import {useState} from "react"

const CountryListItem = ({country, handleShowButton}) => {
    const [show, setShow] = useState(false)

    const toggleShow = () => {
        setShow(show ? false : true)
    }

    return (
        <div>
            <>
                {country.name.common} <button onClick={toggleShow}>{show ? "Hide" : "Show"}</button>
            </>
            {show ? (
                <>
                    <Country country={country}/>
                </>
            ) : (
                null         
            )}
        </div>
    )
}

export default CountryListItem;