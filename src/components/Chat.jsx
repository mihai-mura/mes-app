function Chat(props) {
	//* add li's
	//* set key
	return <div className='chat'>{props.messages.map((message) => message)}</div>;
}

export default Chat;
