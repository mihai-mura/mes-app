import './auth.css';
import LoginForm from '../../components/LoginForm';
import { createHash } from 'crypto';
import { useContext, useEffect } from 'react';
import { ContextLoggedUser } from '../../AppContext';
import { useNavigate } from 'react-router-dom';

function Login() {
	const { loggedUser, setLoggedUser } = useContext(ContextLoggedUser);
	const navigate = useNavigate();

	//check if user details are remembered
	useEffect(() => {
		if (sessionStorage.getItem('loggedUser')) {
			setLoggedUser(sessionStorage.getItem('loggedUser'));
		} else if (localStorage.getItem('loggedUser')) {
			setLoggedUser(localStorage.getItem('loggedUser'));
		}
		if (loggedUser !== null) {
			navigate('/mes');
		}
	});

	const loginDetails = {
		email: null,
		passwd: null,
		rememberDetails: false,
	};
	function handleLogin(email, passwd, rememberDetails) {
		loginDetails.email = email;
		loginDetails.passwd = passwd;
		loginDetails.rememberDetails = rememberDetails;

		loginDetails.passwd = hash(loginDetails.passwd);

		if (searchUserLocal()) {
			if (verifyPass()) {
				//* remember details
				if (loginDetails.rememberDetails) {
					localStorage.setItem('loggedUser', loginDetails.email);
				} else {
					sessionStorage.setItem('loggedUser', loginDetails.email);
				}
				setLoggedUser(loginDetails.email);
				navigate('/mes');
			} else {
				alert('Passwords do not match!');
			}
		} else {
			alert('User does not exist!');
		}
	}

	//!local stuff start

	function verifyPass() {
		if (
			loginDetails.passwd ===
			localStorage.getItem(`${loginDetails.email}-passwd`)
		)
			return true;
		else return false;
	}

	function searchUserLocal() {
		if (
			localStorage.getItem(`${loginDetails.email}-email`) ===
			loginDetails.email
		)
			return true;
		else return false;
	}

	//!local stuff end

	function hash(input) {
		return createHash('sha256').update(input).digest('hex');
	}

	return (
		<div className='page_login'>
			<LoginForm handleLogin={handleLogin} />
		</div>
	);
}

export default Login;
