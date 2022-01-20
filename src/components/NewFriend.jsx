import { AiOutlineUserAdd } from 'react-icons/ai';

function NewFriend(props) {
	function handleClick() {
		props.onClick(props.id);
	}

	//! profile pic
	return (
		<div className='newfriend' onClick={handleClick}>
			<img className='profile_pic' />
			<p>{props.name}</p>
			<AiOutlineUserAdd />
		</div>
	);
}

export default NewFriend;
