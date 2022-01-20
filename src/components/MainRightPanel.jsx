import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { ContextMessages, ContextSelectedFriend } from '../AppContext';
import Chat from './Chat';
import ChatTitle from './ChatTitle';
import Message from './Message';
import { BiSend } from 'react-icons/bi';

function MainRightPannel(props) {
	const { selectedFriend } = useContext(ContextSelectedFriend);
	const [inputMessage, setInputMessage] = useState('');

	const { messages, setMessages } = useContext(ContextMessages);

	//enter button
	useEffect(() => {
		function listener(event) {
			if (event.code === 'Enter' || event.code === 'NumpadEnter') {
				sendMessage();
			}
		}
		document.addEventListener('keydown', listener);
		return () => {
			document.removeEventListener('keydown', listener);
		};
	});

	//! set initial messages
	useEffect(() => {
		setMessages([
			<Message message='Lorem ipsum dolor sit amet.' />,
			<Message message='Lorem ipsum dolor sit amet.' right={true} />,
			<Message message='Lorem ipsum dolor sit amet.' right={true} />,
			<Message message='Lorem ipsum dolor sit amet.' right={true} />,
			<Message message='Lorem ipsum dolor sit amet.' />,
			<Message message='Lorem ipsum dolor sit amet.' />,
			<Message message='Lorem ipsum dolor sit amet.' right={true} />,
		]);
	}, []);

	function inputOnChange(event) {
		setInputMessage(event.target.value);
	}

	//! message transition corection
	//! message send
	function sendMessage() {
		if (inputMessage !== '') {
			setMessages([<Message message={inputMessage} right={true} />, ...messages]);
			setInputMessage('');
		}
	}

	const panelClass = `right_panel ${props.mobileShowPanel ? 'mobile_show' : 'mobile_no_show'}`;

	return (
		<div className={panelClass}>
			<ChatTitle fname={selectedFriend.fname} lname={selectedFriend.lname} mobileMenuClick={props.mobileMenuClick} />
			<Chat messages={messages} />
			<div className='bottom_input'>
				<input
					className='message_input'
					type='text'
					name='message'
					id='message'
					placeholder='Message'
					onChange={inputOnChange}
					value={inputMessage}
					autoFocus
				/>
				<BiSend className='send_icon' onClick={sendMessage} />
			</div>
		</div>
	);
}

export default MainRightPannel;
