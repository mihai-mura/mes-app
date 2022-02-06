import { useContext, useState, useEffect } from 'react';
import { ContextLoggedUser, ContextMessages, ContextSelectedFriend } from '../AppContext';
import Message from './Message';

function Chat(props) {
	const { messages } = useContext(ContextMessages);
	const { loggedUser } = useContext(ContextLoggedUser);
	const { selectedFriend } = useContext(ContextSelectedFriend);
	const [smoothScroll, setSmoothScroll] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setSmoothScroll(true);
		}, 2000);
	}, [selectedFriend]);

	return (
		<div ref={props.refprop} className={`chat ${smoothScroll ? 'smooth_scroll' : ''}`}>
			{messages.map((item, index) => {
				return (
					<Message
						key={index}
						message={item.message}
						time={
							// checks if date is today
							item._id === 'localMes'
								? item.createdAt
								: new Date(item.createdAt).getDate() === new Date().getDate()
								? new Date(item.createdAt).toLocaleString([], {
										hour12: false,
										hour: '2-digit',
										minute: '2-digit',
								  })
								: new Date(item.createdAt).toLocaleString([], {
										hour12: false,
										month: 'short',
										day: '2-digit',
										hour: '2-digit',
										minute: '2-digit',
								  })
						}
						right={item.user === loggedUser._id ? true : false}
					/>
				);
			})}
		</div>
	);
}

export default Chat;
