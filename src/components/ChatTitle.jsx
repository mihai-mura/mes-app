function ChatTitle(props) {
	return (
		<div className='chat_title'>
			<h4>
				{props.fname} {props.lname}
			</h4>
		</div>
	);
}

export default ChatTitle;
