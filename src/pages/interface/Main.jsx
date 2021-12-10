import './main.css';
import MainLeftPanel from '../../components/MainLeftPanel';
import MainRightPanel from '../../components/MainRightPanel';
import { useContext, useEffect } from 'react';
import { ContextLoggedUser } from '../../AppContext';
import { useNavigate } from 'react-router-dom';

function Main() {
	const { loggedUser, setLoggedUser } = useContext(ContextLoggedUser);
	const navigate = useNavigate();

	//check if user details are remembered
	useEffect(() => {
		if (loggedUser !== null) {
			if (sessionStorage.getItem('loggedUser')) {
				setLoggedUser(sessionStorage.getItem('loggedUser'));
			} else if (localStorage.getItem('loggedUser')) {
				setLoggedUser(localStorage.getItem('loggedUser'));
			}
		} else {
			navigate('/login');
		}
	});

	//todo context open friend

	return (
		<div className='page_main'>
			<MainLeftPanel />
			<MainRightPanel />
		</div>
	);
}

export default Main;
