const ErrorNotification = ({errorMessage}) => {

    if (errorMessage.statusCode === null) {
        return null
    } else if (errorMessage.statusCode === 404) {
        return (
            <div className="errorUpdatingMessage">
                <p>Error in updating {errorMessage.name}'s number, {errorMessage.name} was removed from the server.</p>
            </div>
        )
    }s
}

export default ErrorNotification