import { useContext } from 'react';
import Contact from './Contact';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { ContextFriends } from '../AppContext';

function ContactsList(props) {
	const { friends } = useContext(ContextFriends);

	//* add friend action
	return (
		<ul className='contacts_list'>
			<li className='add_friend' onClick={props.openSearchPopup}>
				<p>Add Friend</p>
				<AiOutlineUserAdd className='add_friend_icon' />
			</li>
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
