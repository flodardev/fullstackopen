const Form = ({handleInputChange}) => {
    return (
        <form className="countryform">
            Country: <input onChange={handleInputChange} type="text" name="country"/>
        </form>
    )
}

export default Form