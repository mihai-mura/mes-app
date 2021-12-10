import Message from './Message';

function Chat(props) {
	//todo set get messages
	return (
		<div className='chat'>
			<Message message='Lorem ipsum dolor sit amet.' />
			<Message message='Lorem ipsum dolor sit amet.' right={true} />
			<Message message='Lorem ipsum dolor sit amet.' />
			<Message message='Lorem ipsum dolor sit amet.' right={true} />
			<Message message='Lorem ipsum dolor sit amet.' right={true} />
			<Message message='Lorem ipsum dolor sit amet.' right={true} />
			<Message message='Lorem ipsum dolor sit amet.' />
			<Message message='Lorem ipsum dolor sit amet.' />
			<Message message='Lorem ipsum dolor sit amet.' />
			<Message message='Lorem ipsum dolor sit amet.' />
			<Message message='Lorem ipsum dolor sit amet.' right={true} />
			<Message message='Lorem ipsum dolor sit amet.' right={true} />
			<Message message='Lorem ipsum dolor sit amet.' right={true} />
			<Message message='Lorem ipsum dolor sit amet.' />
			<Message message='Lorem ipsum dolor sit amet.' />
			<Message message='Lorem ipsum dolor sit amet.' right={true} />
			<Message message='Lorem ipsum dolor sit amet.' right={true} />
			<Message message='Lorem ipsum dolor sit amet.' />
			<Message message='Lorem ipsum dolor sit amet.' right={true} />
			<Message message='Lorem ipsum dolor sit amet.' />
			<Message message='Lorem ipsum dolor sit amet.' right={true} />
			<Message message='Lorem ipsum dolor sit amet.' right={true} />
			<Message message='Lorem ipsum dolor sit amet.' right={true} />
		</div>
	);
}

export default Chat;
