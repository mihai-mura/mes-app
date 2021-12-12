import Head from './Head';
import ContactsList from './ContactsList';
import UserSettings from './UserSettings';
import { useState, useContext } from 'react';
import { ContextLoggedUser } from '../AppContext';

function MainLeftPannel(props) {
	const { loggedUser } = useContext(ContextLoggedUser);
	const [panelOpen, setPanelOpen] = useState(true);
	const [settingsOpen, setSettingsOpen] = useState(false);

	function menuClick() {
		setPanelOpen(!panelOpen);
	}

	function settingsClick() {
		setSettingsOpen(!settingsOpen);
	}

	const panelClass = panelOpen ? 'left_panel left_panel_open' : 'left_panel left_panel_closed';
	const listItem = settingsOpen ? <UserSettings logout={props.logout} /> : <ContactsList />;
	return (
		<div className={panelClass}>
			<Head menuClick={menuClick} settingsClick={settingsClick} name={loggedUser.fname} email={loggedUser.email} />
			{listItem}
		</div>
	);
}

export default MainLeftPannel;
