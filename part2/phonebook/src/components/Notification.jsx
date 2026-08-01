const Notification = ({notificationMessage}) => {

    if (notificationMessage.newPerson === null && notificationMessage.updatePerson === null) {
        return null
    } else if (notificationMessage.newPerson !== null && notificationMessage.updatePerson === null) {
        return (
            <div className="successMessage">
                <p>Added {notificationMessage.newPerson} to the phonebook</p>
            </div>
        )
    } else {
        return (
            <div className="successMessage">
                <p>Updated {notificationMessage.updatePerson}'s number</p>
            </div>
        )
    }
}

export default Notification