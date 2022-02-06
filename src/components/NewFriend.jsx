import { AiOutlineUserAdd } from 'react-icons/ai';

function NewFriend(props) {
	function handleClick() {
		props.onClick(props._id);
	}

	return (
		<div className='newfriend' onClick={handleClick}>
			<img className='profile_pic' src={`${process.env.REACT_APP_API_URI}/users/profilePic/${props._id}`} />
			<p>{props.name}</p>
			<AiOutlineUserAdd />
		</div>
	);
}

export default NewFriend;
