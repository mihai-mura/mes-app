import { FiMenu, FiSettings } from 'react-icons/fi';
import { useContext } from 'react';
import { ContextLoggedUser } from '../AppContext';

function Head(props) {
	const { loggedUser } = useContext(ContextLoggedUser);

	return (
		<div className='head'>
			<img className='profile_pic' src={`${process.env.REACT_APP_API_URI}/users/profilePic/${loggedUser._id}`} />
			<div>
				<h4>{props.name}</h4>
				<p>{props.email}</p>
			</div>
			<div>
				<FiSettings className='settings_icon' onClick={props.settingsClick} />
				<FiMenu className='menu_icon' onClick={props.menuClick} />
			</div>
		</div>
	);
}

export default Head;
