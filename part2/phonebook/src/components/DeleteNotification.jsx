const DeleteNotification = ({deleteNotification}) => {

    if (deleteNotification === null) {
        return null
    }

    return (
        <div className="deleteMessage">
            <p>Removed {deleteNotification}'s number</p>
        </div>
    )
}

export default DeleteNotification