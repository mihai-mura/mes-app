import { useContext } from 'react';
import Contact from './Contact';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { ContextFriends } from '../AppContext';

function ContactsList(props) {
	const { friends } = useContext(ContextFriends);

	//! last message
	return (
		<ul className='contacts_list'>
			<li className='add_friend' onClick={props.openSearchPopup}>
				<p>Add Friend</p>
				<AiOutlineUserAdd className='add_friend_icon' />
			</li>
			{friends.map((item, index) => (
				<li key={index}>
					<Contact
						_id={item._id}
						email={item.email}
						fname={item.firstName}
						lname={item.lastName}
						messagesCollection={item.messagesCollection}
						setMobileShowPanel={props.setMobileShowPanel}
					/>
				</li>
			))}
		</ul>
	);
}

export default ContactsList;
