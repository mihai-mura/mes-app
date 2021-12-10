import { createContext, useState } from 'react';

export const ContextLoggedUser = createContext(null);
export function LoggedUser(props) {
	const [loggedUser, setLoggedUser] = useState(null);

	return (
		<ContextLoggedUser.Provider value={{ loggedUser, setLoggedUser }}>
			{props.children}
		</ContextLoggedUser.Provider>
	);
}
