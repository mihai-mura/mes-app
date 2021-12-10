import { useState } from 'react';
import Contact from './Contact';

function ContactsList() {
	const [friends, setFriends] = useState([
		{
			id: 0,
			fname: 'Mihai',
			lname: 'Mura',
			message: 'Last message...',
			messageTime: '19:21',
		},
		{
			id: 1,
			fname: 'Darius',
			lname: 'Tente',
			message: 'Last message...',
			messageTime: '14:56',
		},
		{
			id: 2,
			fname: 'Darius',
			lname: 'Tente',
			message: 'Last message...',
			messageTime: '14:56',
		},
		{
			id: 3,
			fname: 'Darius',
			lname: 'Tente',
			message: 'Last message...',
			messageTime: '14:56',
		},
		{
			id: 4,
			fname: 'Darius',
			lname: 'Tente',
			message: 'Last message...',
			messageTime: '14:56',
		},
		{
			id: 5,
			fname: 'Darius',
			lname: 'Tente',
			message: 'Last message...',
			messageTime: '14:56',
		},
		{
			id: 6,
			fname: 'Darius',
			lname: 'Tente',
			message: 'Last message...',
			messageTime: '14:56',
		},
		{
			id: 7,
			fname: 'Darius',
			lname: 'Tente',
			message: 'Last message...',
			messageTime: '14:56',
		},
		{
			id: 8,
			fname: 'Darius',
			lname: 'Tente',
			message: 'Last message...',
			messageTime: '14:56',
		},
		{
			id: 9,
			fname: 'Darius',
			lname: 'Tente',
			message: 'Last message...',
			messageTime: '14:56',
		},
	]);

	return (
		<ul className='contacts_list'>
			{friends.map((item) => (
				<li key={item.id}>
					<Contact
						fname={item.fname}
						lname={item.lname}
						message={item.message}
						messageTime={item.messageTime}
					/>
				</li>
			))}
		</ul>
	);
}

export default ContactsList;
