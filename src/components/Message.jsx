function Message(props) {
	return (
		<div className={`message ${props.right ? 'message_right' : 'message_left'}`}>
			<p>{props.message}</p>
			<div className='message_time'>{props.time}</div>
		</div>
	);
}

export default Message;
