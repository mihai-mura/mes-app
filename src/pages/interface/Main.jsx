import './main.css';
import MainLeftPanel from '../../components/MainLeftPanel';
import MainRightPanel from '../../components/MainRightPanel';
import { useContext, useEffect, useState } from 'react';
import { ContextDarkTheme, ContextFriends, ContextLoggedUser, ContextMessages, ContextSelectedFriend } from '../../AppContext';
import { useNavigate } from 'react-router-dom';
import AddFriendPopup from '../../components/AddFriendPopup';
import ChangeNamePopup from '../../components/ChangeNamePopup';

function Main() {
	const { darkTheme, setDarkTheme } = useContext(ContextDarkTheme);
	const { loggedUser, setLoggedUser } = useContext(ContextLoggedUser);
	const { friends, setFriends } = useContext(ContextFriends);
	const { setSelectedFriend } = useContext(ContextSelectedFriend);
	const navigate = useNavigate();
	const [searchFriendPopup, setSearchFriendPopup] = useState(false);
	const [changeNamePopup, setChangeNamePopup] = useState(false);
	const [mobilePanelOpen, setMobilePanelOpen] = useState(true);

	useEffect(async () => {
		//check if user details are remembered
		await checkTokenAndSetContext();
		await getFriendsAndSetContext();

		//no initial selected friend if on mobile
		if (window.innerWidth > 800) {
			//! initialize the first selected friend
			// setSelectedFriend({
			// 	email: friends[0].email,
			// 	fname: friends[0].fname,
			// 	lname: friends[0].lname,
			// });
		}
	}, []);

	//set body dark class on theme change
	useEffect(() => {
		darkTheme ? document.body.classList.add('dark') : document.body.classList.remove('dark');
	}, [darkTheme]);

	//*get users friends
	const getFriendsAndSetContext = async () => {
		const res = await fetch(`${process.env.REACT_APP_API_URI}/users/friends`, {
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem('user-token') || localStorage.getItem('user-token')}`,
			},
		});
		const friendsRes = await res.json();
		setFriends(friendsRes);
	};

	//*context and redirect
	const checkTokenAndSetContext = async () => {
		if (sessionStorage.getItem('user-token') || localStorage.getItem('user-token')) {
			//get user data with token
			const res = await fetch(`${process.env.REACT_APP_API_URI}/users`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem('user-token') || localStorage.getItem('user-token')}`,
				},
			});

			if (res.status === 200) {
				const user = await res.json();
				await setLoggedUser({
					id: user._id,
					email: user.email,
					fname: user.fname,
					lname: user.lname,
					friends: user.friends,
					darkTheme: user.darkTheme,
				});
				await setDarkTheme(user.darkTheme);
			}
		} else {
			navigate('/login');
		}
	};

	function userLogout() {
		if (localStorage.getItem('user-token')) localStorage.removeItem('user-token');
		else sessionStorage.removeItem('user-token');
		setLoggedUser({
			email: null,
			fname: null,
			lname: null,
			id: null,
			friends: null,
			darkTheme: null,
		});
		navigate('/login');
	}

	function toggleSearchFriendPopup() {
		setSearchFriendPopup(!searchFriendPopup);
	}

	function toggleChangeNamePopup() {
		setChangeNamePopup(!changeNamePopup);
	}

	function mobileMenuClick() {
		setMobilePanelOpen(!mobilePanelOpen);
		setSelectedFriend({
			email: null,
			fname: null,
			lname: null,
		});
	}

	return (
		<div className='page_main'>
			<MainLeftPanel
				mobileShowPanel={mobilePanelOpen ? true : false}
				setMobileShowPanel={setMobilePanelOpen}
				logout={userLogout}
				openSearchFriendPopup={toggleSearchFriendPopup}
				openChangeNamePopup={toggleChangeNamePopup}
			/>
			<MainRightPanel mobileShowPanel={mobilePanelOpen ? false : true} mobileMenuClick={mobileMenuClick} />
			{changeNamePopup ? (
				<>
					<div className='acrylic' onClick={toggleChangeNamePopup} />
					<ChangeNamePopup toggle={toggleChangeNamePopup} />
				</>
			) : null}
			{searchFriendPopup ? (
				<>
					<div className='acrylic' onClick={toggleSearchFriendPopup} />
					<AddFriendPopup refreshContacts={getFriendsAndSetContext} toggle={toggleSearchFriendPopup} />
				</>
			) : null}
		</div>
	);
}

export default Main;
