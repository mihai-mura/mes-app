import { AiOutlineUserAdd } from 'react-icons/ai';
import { useState } from 'react';

function AddFriendPopup(props) {
	const [input, setInput] = useState('');

	//* set add friends

	function inputOnChange(event) {
		setInput(event.target.value);
	}

	return (
		<div className='add_friend_popup'>
			<header>
				<input type='text' name='search-friend' id='search-friend' placeholder='Search Friend' onChange={inputOnChange} />
				<AiOutlineUserAdd className='add_friend_icon' />
			</header>
			//! populate users list
			<div className='searched_users_list'></div>
			<footer>
				<button onClick={props.toggle}>Exit</button>
			</footer>
		</div>
	);
}

export default AddFriendPopup;
