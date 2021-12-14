import { AiOutlineUserAdd } from 'react-icons/ai';

function AddFriendPopup(props) {
	return (
		<div className='add_friend_popup'>
			<header>
				<input type='text' name='search-friend' id='search-friend' placeholder='Search Friend' />
				<AiOutlineUserAdd className='add_friend_icon' />
			</header>
			//! populate users list
			<div className='searched_users_list'></div>
			<footer>
				<button onClick={props.close}>Exit</button>
			</footer>
		</div>
	);
}

export default AddFriendPopup;
