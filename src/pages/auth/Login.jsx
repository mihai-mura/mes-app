import './auth.css';
import LoginForm from '../../components/LoginForm';
import { createHash } from 'crypto';
import { useContext, useEffect } from 'react';
import { ContextLoggedUser } from '../../AppContext';
import { useNavigate } from 'react-router-dom';

function Login() {
	const { setLoggedUser } = useContext(ContextLoggedUser);
	const navigate = useNavigate();

	//check if user details are remembered
	//! set logged user context based on local
	useEffect(() => {
		if (sessionStorage.getItem('loggedUser')) {
			setLoggedUser(
				{
					email: sessionStorage.getItem('loggedUser'),
					fname: localStorage.getItem(
						`${sessionStorage.getItem('loggedUser')}-fname`
					),
					lname: localStorage.getItem(
						`${sessionStorage.getItem('loggedUser')}-lname`
					),
				},
				navigate('/mes')
			);
		} else if (localStorage.getItem('loggedUser')) {
			setLoggedUser(
				{
					email: localStorage.getItem('loggedUser'),
					fname: localStorage.getItem(
						`${localStorage.getItem('loggedUser')}-fname`
					),
					lname: localStorage.getItem(
						`${localStorage.getItem('loggedUser')}-lname`
					),
				},
				() => navigate('/mes')
			);
		}
	}, []);
	//!

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

		if (searchUser()) {
			if (verifyPass()) {
				//* remember details
				//! set user from local
				if (loginDetails.rememberDetails) {
					localStorage.setItem('loggedUser', loginDetails.email);
				} else {
					sessionStorage.setItem('loggedUser', loginDetails.email);
				}
				setLoggedUser({
					email: localStorage.getItem(`${loginDetails.email}-email`),
					fname: localStorage.getItem(`${loginDetails.email}-fname`),
					lname: localStorage.getItem(`${loginDetails.email}-lname`),
				});
				//!
				navigate('/mes');
			} else {
				alert('Passwords do not match!');
			}
		} else {
			alert('User does not exist!');
		}
	}

	//! verify account local

	function verifyPass() {
		if (
			loginDetails.passwd ===
			localStorage.getItem(`${loginDetails.email}-passwd`)
		)
			return true;
		else return false;
	}

	function searchUser() {
		if (
			localStorage.getItem(`${loginDetails.email}-email`) ===
			loginDetails.email
		)
			return true;
		else return false;
	}

	//!

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
