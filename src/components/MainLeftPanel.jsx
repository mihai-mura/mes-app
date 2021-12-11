import Head from './Head';
import ContactsList from './ContactsList';
import { useState, useContext } from 'react';
import { ContextLoggedUser } from '../AppContext';

function MainLeftPannel() {
	const { loggedUser } = useContext(ContextLoggedUser);
	const [panelOpen, setPanelOpen] = useState(true);

	function menuClick() {
		setPanelOpen(!panelOpen);
	}

	const panelClass = panelOpen ? 'left_panel left_panel_open' : 'left_panel left_panel_closed';
	return (
		<div className={panelClass}>
			<Head menuClick={menuClick} name={loggedUser.fname} email={loggedUser.email} />
			<ContactsList />
		</div>
	);
}

export default MainLeftPannel;
