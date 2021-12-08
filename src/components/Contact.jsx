function Contact(props) {
    return (
        <div className="contact">
            <h2>{props.fName.charAt(0)}{props.lName.charAt(0)}</h2>
            <div>
            <h4>{props.fName} {props.lName}</h4>
            <p>{props.message}</p>
            </div>
            <p>{props.messageTime}</p>
        </div>
    );
}

export default Contact;