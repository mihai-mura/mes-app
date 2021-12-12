import { useContext, useEffect } from 'react';
import { ContextFriends, ContextSelectedFriend } from '../AppContext';
import Contact from './Contact';

function ContactsList() {
	const { friends } = useContext(ContextFriends);
	const { setSelectedFriend } = useContext(ContextSelectedFriend);

	useEffect(() => {
		setSelectedFriend(friends[0].email);
	}, []);

	return (
		<ul className='contacts_list'>
			{friends.map((item) => (
				<li key={item.email}>
					<Contact
						email={item.email}
						fname={item.fname}
						lname={item.lname}
						lastMessage={item.message}
						lastMessageTime={item.messageTime}
					/>
				</li>
			))}
		</ul>
	);
}

export default ContactsList;
