import './auth.css';
import RegisterForm from '../../components/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { createHash } from 'crypto';
import { ContextLoggedUser } from '../../AppContext';
import { useContext, useEffect } from 'react';

function Register() {
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

	const registerDetails = {
		fname: null,
		lname: null,
		email: null,
		passwd: null,
	};

	function handleRegister(fname, lname, email, passwd) {
		registerDetails.fname = fname;
		registerDetails.lname = lname;
		registerDetails.email = email;
		registerDetails.passwd = passwd;

		registerDetails.passwd = hash(registerDetails.passwd);

		if (searchIfAccountExists()) {
			alert('Email already exists!');
		} else {
			registerAccount();
		}

		navigate('/login');
	}

	//! register user local
	function searchIfAccountExists() {
		if (localStorage.getItem(`${registerDetails.email}-email`)) {
			return true;
		}
		return false;
	}

	function registerAccount() {
		localStorage.setItem(
			`${registerDetails.email}-email`,
			registerDetails.email
		);
		localStorage.setItem(
			`${registerDetails.email}-fname`,
			registerDetails.fname
		);
		localStorage.setItem(
			`${registerDetails.email}-lname`,
			registerDetails.lname
		);
		localStorage.setItem(
			`${registerDetails.email}-passwd`,
			registerDetails.passwd
		);
	}
	//!

	function hash(input) {
		return createHash('sha256').update(input).digest('hex');
	}

	return (
		<div className='page_login'>
			<RegisterForm handleRegister={handleRegister} />
		</div>
	);
}

export default Register;
