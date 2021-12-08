function Message(props) {


    return (
        <div className={`message ${props.className !== null ? props.className : ''}`}>
            <p>Lorem ipsum dolor sit amet.</p>
        </div>
    );
}

export default Message;