import Head from './Head';
import ContactsList from './ContactsList';
import UserSettings from './UserSettings';
import { useState, useContext } from 'react';
import { ContextDarkTheme, ContextLoggedUser } from '../AppContext';
import { useEffect } from 'react';

function MainLeftPannel(props) {
	const { setDarkTheme } = useContext(ContextDarkTheme);
	const { loggedUser, setLoggedUser } = useContext(ContextLoggedUser);
	const [panelOpen, setPanelOpen] = useState(true);
	const [settingsOpen, setSettingsOpen] = useState(false);

	useEffect(() => {
		props.mobileShowPanel ? setPanelOpen(true) : setPanelOpen(false);
	}, [props.mobileShowPanel]);

	function menuClick() {
		if (settingsOpen) setSettingsOpen(!settingsOpen);
		setPanelOpen(!panelOpen);
	}

	function settingsClick() {
		setSettingsOpen(!settingsOpen);
	}

	async function handleThemeChange(event) {
		setDarkTheme(event.target.checked);
		await fetch(`${process.env.REACT_APP_API_URI}/users/theme`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('user-token') || sessionStorage.getItem('user-token')}`,
			},
			body: JSON.stringify({
				value: event.target.checked,
			}),
		});
		setLoggedUser({
			id: loggedUser._id,
			email: loggedUser.email,
			fname: loggedUser.fname,
			lname: loggedUser.lname,
			friends: loggedUser.friends,
			darkTheme: event.target.checked,
		});
	}

	const panelClass = `${panelOpen ? 'left_panel left_panel_open' : 'left_panel left_panel_closed'} ${
		props.mobileShowPanel ? 'mobile_show' : 'mobile_noshow'
	}`;
	const listItem = settingsOpen ? (
		<UserSettings logout={props.logout} openChangeNamePopup={props.openChangeNamePopup} handleThemeChange={handleThemeChange} />
	) : (
		<ContactsList openSearchPopup={props.openSearchFriendPopup} setMobileShowPanel={props.setMobileShowPanel} />
	);
	return (
		<div className={panelClass}>
			<Head menuClick={menuClick} settingsClick={settingsClick} name={loggedUser.fname} email={loggedUser.email} />
			{listItem}
		</div>
	);
}

export default MainLeftPannel;
