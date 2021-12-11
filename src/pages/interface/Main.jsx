import './main.css';
import MainLeftPanel from '../../components/MainLeftPanel';
import MainRightPanel from '../../components/MainRightPanel';
import { useContext, useEffect } from 'react';
import { ContextLoggedUser } from '../../AppContext';
import { useNavigate } from 'react-router-dom';

function Main() {
	const { loggedUser } = useContext(ContextLoggedUser);
	const navigate = useNavigate();

	//check if user details are remembered
	useEffect(() => {
		if (!loggedUser.email) {
			navigate('/login');
		}
	}, []);

	//todo context open friend

	return (
		<div className='page_main'>
			<MainLeftPanel />
			<MainRightPanel />
		</div>
	);
}

export default Main;
