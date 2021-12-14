import { useEffect, useState } from 'react';
import { useContext } from 'react/cjs/react.development';
import { ContextSelectedFriend } from '../AppContext';

function Contact(props) {
	const { selectedFriend, setSelectedFriend } = useContext(ContextSelectedFriend);
	const [friendDetails, setFriendDetails] = useState({
		email: null,
		fname: null,
		lname: null,
		lastMessage: null,
		lastMessageTime: null,
	});

	useEffect(() => {
		setFriendDetails({
			email: props.email,
			fname: props.fname,
			lname: props.lname,
			lastMessage: props.lastMessage,
			lastMessageTime: props.lastMessageTime,
		});
	}, []);

	function onContactClick() {
		setSelectedFriend({
			email: friendDetails.email,
			fname: friendDetails.fname,
			lname: friendDetails.lname,
		});
	}

	return (
		<div className={selectedFriend.email === friendDetails.email ? 'contact contact_selected' : 'contact'} onClick={onContactClick}>
			<h2>
				{props.fname.charAt(0)}
				{props.lname.charAt(0)}
			</h2>
			<div>
				<h4>
					{friendDetails.fname} {friendDetails.lname}
				</h4>
				<p>{friendDetails.lastMessage}</p>
			</div>
			<p>{friendDetails.lastMessageTime}</p>
		</div>
	);
}

export default Contact;
