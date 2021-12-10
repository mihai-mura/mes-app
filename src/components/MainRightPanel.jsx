import { useState } from 'react';
import Chat from './Chat';
import ChatTitle from './ChatTitle';

function MainRightPannel() {
	const [openFriend, setOpenFriend] = useState({
		id: 0,
		fname: 'Mihai',
		lname: 'Mura',
	});

	return (
		<div className='right_panel'>
			<ChatTitle fname={openFriend.fname} lname={openFriend.lname} />
			<Chat friendId={openFriend.id} />
			<input
				className='message_input'
				type='text'
				name='message'
				id='message'
				placeholder='Message'
			/>
		</div>
	);
}

export default MainRightPannel;
