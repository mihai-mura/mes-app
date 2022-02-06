import './auth.css';
import LoginForm from '../../components/LoginForm';
import { useContext, useEffect } from 'react';
import { ContextLoggedUser } from '../../AppContext';
import { useNavigate } from 'react-router-dom';

function Login() {
	const { setLoggedUser } = useContext(ContextLoggedUser);
	const navigate = useNavigate();

	useEffect(async () => {
		//try server connection
		try {
			//check if user details are remembered
			await setUserContextAndRedirect();
		} catch (error) {
			if (error.message === 'Failed to fetch') navigate('/server-down');
			else throw error;
		}
	}, []);

	async function handleLogin(email, passwd, rememberDetails) {
		const res = await fetch(`${process.env.REACT_APP_API_URI}/users/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				password: passwd,
			}),
		});
		if (res.status === 200) {
			const token = await res.text();
			if (rememberDetails) {
				localStorage.setItem('user-token', token);
			} else {
				sessionStorage.setItem('user-token', token);
			}
			setUserContextAndRedirect();
		} else if (res.status === 404) {
			alert('Email does not exist!');
		} else if (res.status === 403) {
			alert('Incorect password!');
		}
	}

	//*context and redirect
	const setUserContextAndRedirect = async () => {
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
				navigate('/mes');
			}
		}
	};

	return (
		<div className='page_login'>
			<LoginForm handleLogin={handleLogin} />
		</div>
	);
}

export default Login;
