function Message(props) {
	return (
		<div
			className={`message ${
				props.right !== undefined ? 'message_right' : ''
			}`}>
			<p>{props.message}</p>
		</div>
	);
}

export default Message;
