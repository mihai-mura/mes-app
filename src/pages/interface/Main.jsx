import './main.css';
import MainLeftPanel from '../../components/MainLeftPanel';
import MainRightPanel from '../../components/MainRightPanel';
import { useContext, useEffect } from 'react';
import { ContextFriends, ContextLoggedUser, ContextSelectedFriend } from '../../AppContext';
import { useNavigate } from 'react-router-dom';
import AddFriendPopup from '../../components/AddFriendPopup';
import { useState } from 'react/cjs/react.development';

function Main() {
	const { loggedUser, setLoggedUser } = useContext(ContextLoggedUser);
	const { friends } = useContext(ContextFriends);
	const { setSelectedFriend } = useContext(ContextSelectedFriend);
	const navigate = useNavigate();
	const [searchFriendPopup, setSearchFriendPopup] = useState(false);

	useEffect(() => {
		//check if user details are remembered
		if (!loggedUser.email) {
			navigate('/login');
		}

		//initialize the first selected friend
		setSelectedFriend({
			email: friends[0].email,
			fname: friends[0].fname,
			lname: friends[0].lname,
		});
	}, []);

	function userLogout() {
		if (localStorage.getItem('loggedUser')) localStorage.removeItem('loggedUser');
		else sessionStorage.removeItem('loggedUser');
		setLoggedUser({
			email: null,
			fname: null,
			lname: null,
		});
		navigate('/login');
	}

	//search friend func
	function toggleSearchPopup() {
		setSearchFriendPopup(!searchFriendPopup);
	}

	return (
		<div className='page_main'>
			<MainLeftPanel logout={userLogout} openSearchPopup={toggleSearchPopup} />
			<MainRightPanel />
			{searchFriendPopup ? (
				<>
					<div className='acrylic' />
					<AddFriendPopup close={toggleSearchPopup} />
				</>
			) : null}
		</div>
	);
}

export default Main;
