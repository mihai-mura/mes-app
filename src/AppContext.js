import { createContext, useState } from 'react';

export const ContextLoggedUser = createContext();
export function LoggedUser(props) {
	const [loggedUser, setLoggedUser] = useState({
		fname: null,
		lname: null,
		email: null,
		_id: null,
	});

	return <ContextLoggedUser.Provider value={{ loggedUser, setLoggedUser }}>{props.children}</ContextLoggedUser.Provider>;
}

export const ContextFriends = createContext();
export function Friends(props) {
	const [friends, setFriends] = useState([]);

	return <ContextFriends.Provider value={{ friends, setFriends }}>{props.children}</ContextFriends.Provider>;
}

export const ContextSelectedFriend = createContext();
export function SelectedFriend(props) {
	const [selectedFriend, setSelectedFriend] = useState({
		_id: null,
		email: null,
		fname: null,
		lname: null,
		messagesCollection: null,
	});

	return <ContextSelectedFriend.Provider value={{ selectedFriend, setSelectedFriend }}>{props.children}</ContextSelectedFriend.Provider>;
}

export const ContextMessages = createContext();
export function Messages(props) {
	const [messages, setMessages] = useState([]);

	return <ContextMessages.Provider value={{ messages, setMessages }}>{props.children}</ContextMessages.Provider>;
}

export const ContextDarkTheme = createContext();
export function DarkTheme(props) {
	const [darkTheme, setDarkTheme] = useState(false);

	return <ContextDarkTheme.Provider value={{ darkTheme, setDarkTheme }}>{props.children}</ContextDarkTheme.Provider>;
}
