import { useContext } from 'react';
import { ContextFriends, ContextSelectedFriend } from '../AppContext';
import Contact from './Contact';

function ContactsList() {
	const { friends } = useContext(ContextFriends);

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
