import { BiLogOutCircle } from 'react-icons/bi';
import { useContext } from 'react/cjs/react.development';
import { ContextDarkTheme, ContextLoggedUser } from '../AppContext';
import { CgRename } from 'react-icons/cg';

function UserSettings(props) {
	const { loggedUser } = useContext(ContextLoggedUser);
	const { darkTheme } = useContext(ContextDarkTheme);

	//! profile picture
	return (
		<ul className='user_settings'>
			<li>
				<p>Profile Picture</p>
				<img className='profile_pic' />
			</li>
			<li onClick={props.openChangeNamePopup}>
				<p>Set Name</p>
				<CgRename className='name_icon' />
			</li>
			<li className='theme_li'>
				<label htmlFor='theme'>
					<p>DarkTheme</p>
					<input type='checkbox' name='theme' id='theme' onChange={props.handleThemeChange} checked={darkTheme} />
					<div className='theme_toggle'></div>
				</label>
			</li>
			<li onClick={props.logout}>
				<p>Logout</p>
				<BiLogOutCircle className='logout_icon' />
			</li>
		</ul>
	);
}

export default UserSettings;
