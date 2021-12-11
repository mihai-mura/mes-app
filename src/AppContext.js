import { createContext, useState } from 'react';

export const ContextLoggedUser = createContext(null);
export function LoggedUser(props) {
	const [loggedUser, setLoggedUser] = useState({
		fname: null,
		lname: null,
		email: null,
	});

	return (
		<ContextLoggedUser.Provider value={{ loggedUser, setLoggedUser }}>{props.children}</ContextLoggedUser.Provider>
	);
}

export const ContextFriends = createContext(null);
export function Friends(props) {
	const [friends, setFriends] = useState([
		{
			email: 'mihai@email.com',
			fname: 'Mihai',
			lname: 'Mura',
			message: 'Last message...',
			messageTime: '19:21',
		},
		{
			email: 'darius@email.com',
			fname: 'Darius',
			lname: 'Tente',
			message: 'Last message...',
			messageTime: '14:56',
		},
		{
			email: 'andrei@email.com',
			fname: 'Andrei',
			lname: 'Iacob',
			message: 'Last message...',
			messageTime: '14:56',
		},
		{
			email: 'iooo@email.com',
			fname: 'IOOO',
			lname: 'eooooo',
			message: 'Last message...',
			messageTime: '14:56',
		},
		{
			email: 'lorem@email.com',
			fname: 'lorem',
			lname: 'ipsum',
			message: 'Last message...',
			messageTime: '14:56',
		},
		{
			email: 'lorem@email.com',
			fname: 'Lorem',
			lname: 'Ipsum',
			message: 'Last message...',
			messageTime: '00:00',
		},
		{
			email: 'lorem@email.com',
			fname: 'Lorem',
			lname: 'Ipsum',
			message: 'Last message...',
			messageTime: '00:00',
		},
		{
			email: 'lorem@email.com',
			fname: 'Lorem',
			lname: 'Ipsum',
			message: 'Last message...',
			messageTime: '00:00',
		},
		{
			email: 'lorem@email.com',
			fname: 'Lorem',
			lname: 'Ipsum',
			message: 'Last message...',
			messageTime: '00:00',
		},
		{
			email: 'lorem@email.com',
			fname: 'Lorem',
			lname: 'Ipsum',
			message: 'Last message...',
			messageTime: '00:00',
		},
	]);

	return <ContextFriends.Provider value={{ friends, setFriends }}>{props.children}</ContextFriends.Provider>;
}

export const ContextSelectedFriend = createContext(null);
export function SelectedFriend(props) {
	const [selectedFriend, setSelectedFriend] = useState(null);

	return (
		<ContextSelectedFriend.Provider value={{ selectedFriend, setSelectedFriend }}>
			{props.children}
		</ContextSelectedFriend.Provider>
	);
}
