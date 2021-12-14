import { BiLogOutCircle } from 'react-icons/bi';
import { useContext } from 'react/cjs/react.development';
import { ContextLoggedUser } from '../AppContext';
import { CgRename } from 'react-icons/cg';

function UserSettings(props) {
	const { loggedUser, setLoggedUser } = useContext(ContextLoggedUser);

	function changeName() {
		const fname = prompt('Set first name');
		const lname = prompt('Set last name');
		if (fname && lname) {
			//! change user name local
			localStorage.setItem(`${loggedUser.email}-fname`, fname);
			localStorage.setItem(`${loggedUser.email}-lname`, lname);
			setLoggedUser({
				fname: fname,
				lname: lname,
				email: loggedUser.email,
			});
		}
	}

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
			<li onClick={changeName}>
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
