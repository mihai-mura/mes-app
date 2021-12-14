import { BiLogOutCircle } from 'react-icons/bi';
import { useContext } from 'react/cjs/react.development';
import { ContextLoggedUser } from '../AppContext';
import { CgRename } from 'react-icons/cg';

function UserSettings(props) {
	const { loggedUser } = useContext(ContextLoggedUser);

	//! implement profile pic everywhere
	return (
		<ul className='user_settings'>
			<li>
				<p>Profile Picture</p>
				{/* implement profile pic */}
				{false ? (
					<div className='profile_img' />
				) : (
					<div className='profile_img_initials'>
						{loggedUser.fname.charAt(0)}
						{loggedUser.lname.charAt(0)}
					</div>
				)}
			</li>
			<li onClick={props.openChangeNamePopup}>
				<p>Set Name</p>
				<CgRename className='name_icon' />
			</li>
			<li onClick={props.logout}>
				<p>Logout</p>
				<BiLogOutCircle className='logout_icon' />
			</li>
		</ul>
	);
}

export default UserSettings;
