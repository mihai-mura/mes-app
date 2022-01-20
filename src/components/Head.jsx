import { FiMenu, FiSettings } from 'react-icons/fi';

//! profile pic
function Head(props) {
	return (
		<div className='head'>
			<img className='profile_pic' />
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
