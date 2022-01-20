import { useState, useEffect } from 'react';
import NewFriend from './NewFriend';

function AddFriendPopup(props) {
	const [input, setInput] = useState('');
	const [list, setList] = useState([]);

	useEffect(async () => {
		if (input.length > 1) {
			const res = await fetch(`${process.env.REACT_APP_API_URI}/users/name`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${sessionStorage.getItem('user-token') || localStorage.getItem('user-token')}`,
				},
				body: JSON.stringify({
					input: input,
				}),
			});
			const users = await res.json();
			setList(users);
		} else {
			setList([]);
		}
	}, [input]);

	function inputOnChange(event) {
		setInput(event.target.value);
	}

	async function addFriend(friendsId) {
		const res = await fetch(`${process.env.REACT_APP_API_URI}/users/friends`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('user-token') || sessionStorage.getItem('user-token')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				value: friendsId,
			}),
		});

		if (res.status === 404) {
			alert('something went wrong!');
		}
		// removes clicked user fromm list
		setList(
			list.filter((user) => {
				return user._id !== friendsId;
			})
		);
		props.refreshContacts();
	}

	return (
		<div className='add_friend_popup'>
			<input type='text' name='search-friend' autoFocus id='search-friend' placeholder='Search Friend' onChange={inputOnChange} />
			<div className='searched_users_list'>
				{list.map((item, index) => (
					<NewFriend key={index} id={item._id} name={`${item.firstName} ${item.lastName}`} onClick={addFriend} />
				))}
			</div>
			<footer>
				<button onClick={props.toggle}>Exit</button>
			</footer>
		</div>
	);
}

export default AddFriendPopup;
