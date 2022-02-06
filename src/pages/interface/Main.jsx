import './main.css';
import MainLeftPanel from '../../components/MainLeftPanel';
import MainRightPanel from '../../components/MainRightPanel';
import { useContext, useEffect, useState } from 'react';
import { ContextDarkTheme, ContextFriends, ContextLoggedUser, ContextMessages, ContextSelectedFriend } from '../../AppContext';
import { useNavigate } from 'react-router-dom';
import AddFriendPopup from '../../components/AddFriendPopup';
import ChangeNamePopup from '../../components/ChangeNamePopup';
import ChangePasswordPopup from '../../components/ChangePasswordPopup';
import socket from '../../services/socketio';

function Main() {
	const { darkTheme, setDarkTheme } = useContext(ContextDarkTheme);
	const { loggedUser, setLoggedUser } = useContext(ContextLoggedUser);
	const { friends, setFriends } = useContext(ContextFriends);
	const { selectedFriend, setSelectedFriend } = useContext(ContextSelectedFriend);
	const { messages, setMessages } = useContext(ContextMessages);
	const [mobilePanelOpen, setMobilePanelOpen] = useState(true);
	const [searchFriendPopup, setSearchFriendPopup] = useState(false);
	const [changeNamePopup, setChangeNamePopup] = useState(false);
	const [passwordChangePopup, setPasswordChangePopup] = useState(false);
	const navigate = useNavigate();

	useEffect(async () => {
		//try server connection
		try {
			await checkTokenAndSetContext();
			await getFriendsAndSetContext();
		} catch (error) {
			if (error.message === 'Failed to fetch') navigate('/server-down');
			else throw error;
		}
	}, []);

	//set body dark class on theme change
	useEffect(() => {
		darkTheme ? document.body.classList.add('dark') : document.body.classList.remove('dark');
	}, [darkTheme]);

	//recieve message
	useEffect(() => {
		socket.on('message', async (data) => {
			if (data.user === selectedFriend._id) {
				setMessages((prevMessages) => [...prevMessages, data]);
			}
		});

		return () => {
			socket.off('message');
		};
	}, [selectedFriend]);

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
					_id: user._id,
					email: user.email,
					fname: user.fname,
					lname: user.lname,
				});
				await setDarkTheme(user.darkTheme);
				//connect ws
				socket.emit('userLogin', user._id);
			}
		} else {
			navigate('/login');
		}
	};

	function userLogout() {
		if (localStorage.getItem('user-token')) localStorage.removeItem('user-token');
		else sessionStorage.removeItem('user-token');
		socket.emit('userLogout', loggedUser._id);
		setLoggedUser({
			email: null,
			fname: null,
			lname: null,
			_id: null,
		});
		navigate('/login');
	}

	function toggleSearchFriendPopup() {
		setSearchFriendPopup(!searchFriendPopup);
	}

	function toggleChangeNamePopup() {
		setChangeNamePopup(!changeNamePopup);
	}

	function togglePasswordChangePopup() {
		setPasswordChangePopup(!passwordChangePopup);
	}

	function mobileMenuClick() {
		setMobilePanelOpen(!mobilePanelOpen);
		setSelectedFriend({
			_id: null,
			email: null,
			fname: null,
			lname: null,
			messagesCollection: null,
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
				openChangePasswordPopup={togglePasswordChangePopup}
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
			{passwordChangePopup ? (
				<>
					<div className='acrylic' onClick={togglePasswordChangePopup} />
					<ChangePasswordPopup toggle={togglePasswordChangePopup} />
				</>
			) : null}
		</div>
	);
}

export default Main;
