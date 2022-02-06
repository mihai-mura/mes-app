import './auth.css';
import RegisterForm from '../../components/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { ContextLoggedUser } from '../../AppContext';
import { useContext, useEffect } from 'react';

function Register() {
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

	async function handleRegister(fname, lname, email, passwd) {
		const res = await fetch(`${process.env.REACT_APP_API_URI}/users/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				password: passwd,
				fname: fname,
				lname: lname,
			}),
		});
		if (res.status === 201) {
			navigate('/login');
		} else if (res.status === 409) {
			alert('This email is already in use!');
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
			<RegisterForm handleRegister={handleRegister} />
		</div>
	);
}

export default Register;
