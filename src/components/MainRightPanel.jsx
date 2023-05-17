import { useContext, useRef, useEffect, useState } from 'react';
import { ContextLoggedUser, ContextMessages, ContextSelectedFriend } from '../AppContext';
import Chat from './Chat';
import ChatTitle from './ChatTitle';
import { BiSend } from 'react-icons/bi';
import logo from '../style/logo.svg';
import socket from '../services/socketio';

function MainRightPannel(props) {
	const { loggedUser } = useContext(ContextLoggedUser);
	const { selectedFriend } = useContext(ContextSelectedFriend);
	const { messages, setMessages } = useContext(ContextMessages);
	const [inputMessage, setInputMessage] = useState('');

	const chat = useRef();

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

	//scroll when message
	useEffect(() => {
		if (selectedFriend._id) chat.current.scrollTop = chat.current.scrollHeight;
	}, [messages]);

	useEffect(() => {
		(async () => {
			const res = await fetch(`${process.env.REACT_APP_API_URI}/messages/all/${selectedFriend.messagesCollection}`, {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem('user-token') || localStorage.getItem('user-token')}`,
				},
			});
			const mes = await res.json();
			setMessages(mes);
		})();
	}, [selectedFriend]);

	function inputOnChange(event) {
		setInputMessage(event.target.value);
	}

	function sendMessage() {
		if (inputMessage !== '') {
			setMessages((prevMessages) => [
				...prevMessages,
				{
					_id: 'localMes',
					message: inputMessage,
					user: loggedUser._id,
					createdAt: new Date().toISOString(),
				},
			]);
			socket.emit('message', {
				from: loggedUser._id,
				to: selectedFriend._id,
				collection: selectedFriend.messagesCollection,
				message: inputMessage,
			});
			setInputMessage('');
		}
	}

	if (selectedFriend._id) {
		return (
			<div className={`right_panel ${props.mobileShowPanel ? 'mobile_show' : 'mobile_no_show'}`}>
				<ChatTitle
					_id={selectedFriend._id}
					fname={selectedFriend.fname}
					lname={selectedFriend.lname}
					mobileMenuClick={props.mobileMenuClick}
				/>
				<Chat refprop={chat} />
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
	} else {
		return (
			<div className={`right_panel no_contact_selected ${props.mobileShowPanel ? 'mobile_show' : 'mobile_no_show'}`}>
				{<img src={logo} width={150} />}
			</div>
		);
	}
}

export default MainRightPannel;
