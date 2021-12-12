import { BiLogOutCircle } from 'react-icons/bi';

function UserSettings(props) {
	return (
		<ul className='user_settings'>
			<li onClick={props.logout}>
				<p>Logout</p>
				<BiLogOutCircle className='logout_icon' />
			</li>
		</ul>
	);
}

export default UserSettings;
