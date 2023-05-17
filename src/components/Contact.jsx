import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ContextSelectedFriend, ContextLoggedUser, ContextMessages } from '../AppContext';
import socket from '../services/socketio';

function Contact(props) {
	const { messages } = useContext(ContextMessages);
	const { selectedFriend, setSelectedFriend } = useContext(ContextSelectedFriend);
	const { loggedUser } = useContext(ContextLoggedUser);
	const [lastMessage, setLastMessage] = useState(null);

	//get last message
	useEffect(() => {
		(async () => {
			//initial set
			const res = await fetch(`${process.env.REACT_APP_API_URI}/messages/last/${props.messagesCollection}`, {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem('user-token') || localStorage.getItem('user-token')}`,
				},
			});
			const message = await res.json();

			if (message) {
				//format date
				let mesDate = new Date(message.createdAt);
				const today = new Date();

				//same day => only time
				if (
					mesDate.getDate() === today.getDate() &&
					mesDate.getMonth() === today.getMonth() &&
					mesDate.getFullYear() === today.getFullYear()
				) {
					message.createdAt = mesDate.toLocaleString([], {
						hour12: false,
						hour: '2-digit',
						minute: '2-digit',
					});
				} else if (mesDate.getFullYear() !== today.getFullYear()) {
					// different year => only year
					message.createdAt = mesDate.toLocaleString([], {
						year: 'numeric',
					});
				} else {
					message.createdAt = mesDate.toLocaleString([], {
						hour12: false,
						hour: '2-digit',
						minute: '2-digit',
						month: 'short',
						day: '2-digit',
					});
				}

				setLastMessage(message);
			}

			//listen for last message
			socket.on('last-message', (data) => {
				if (data.user === props._id) {
					data.createdAt = new Date(data.createdAt).toLocaleTimeString([], {
						hour12: false,
						hour: '2-digit',
						minute: '2-digit',
					});

					setLastMessage(data);
				}
			});
		})();

		return () => {
			socket.off('last-message');
		};
	}, []);

	//set last message from local
	useEffect(() => {
		if (messages.length) {
			const lastmes = messages[messages.length - 1];
			if (lastmes._id === 'localMes' && selectedFriend._id === props._id) {
				let mesDate = new Date(lastmes.createdAt);
				const today = new Date();

				//same day => only time
				if (
					mesDate.getDate() === today.getDate() &&
					mesDate.getMonth() === today.getMonth() &&
					mesDate.getFullYear() === today.getFullYear()
				) {
					lastmes.createdAt = mesDate.toLocaleString([], {
						hour12: false,
						hour: '2-digit',
						minute: '2-digit',
					});
				} else if (mesDate.getFullYear() !== today.getFullYear()) {
					// different year => only year

					lastmes.createdAt = mesDate.toLocaleString([], {
						year: 'numeric',
					});
				} else {
					lastmes.createdAt = mesDate.toLocaleString([], {
						hour12: false,
						hour: '2-digit',
						minute: '2-digit',
						month: 'short',
						day: '2-digit',
					});
				}

				setLastMessage(lastmes);
			}
		}
	}, [messages]);

	function onContactClick() {
		setSelectedFriend({
			_id: props._id,
			email: props.email,
			fname: props.fname,
			lname: props.lname,
			messagesCollection: props.messagesCollection,
		});

		//hide panel on click on mobile
		if (window.innerWidth < 800) props.setMobileShowPanel(false);
	}

	return (
		<div
			className={`${selectedFriend.email === props.email ? 'contact contact_selected' : 'contact'} ${
				lastMessage ? '' : 'no_last_message'
			}`}
			onClick={onContactClick}>
			<img className='profile_pic' src={`${process.env.REACT_APP_API_URI}/users/profilePic/${props._id}`} />

			<div>
				<h4>
					{props.fname} {props.lname}
				</h4>
				<p>
					{lastMessage
						? `${lastMessage.user === loggedUser._id ? 'You:' : `${props.fname}:`} ${
								lastMessage.message.length > 10
									? `${lastMessage.message.substring(0, 10)}...`
									: lastMessage.message
						  }`
						: ''}
				</p>
			</div>
			<p>{lastMessage ? lastMessage.createdAt : ''}</p>
		</div>
	);
}

export default Contact;
