function Chat(props) {
	//* add li's
	return <div className='chat'>{props.messages.map((message) => message)}</div>;
}

export default Chat;
