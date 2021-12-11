import { FiMenu } from 'react-icons/fi';

function Head(props) {
	return (
		<div className='head'>
			<div className='user_info'>
				<h4>{props.name}</h4>
				<p>{props.email}</p>
			</div>
			<FiMenu className='menu_icon' onClick={props.menuClick} />
		</div>
	);
}

export default Head;
