import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function LoginForm(props) {
	const [email, setEmail] = useState('');
	const [passwd, setPasswd] = useState('');
	const [rememberDetails, setRememberDetails] = useState(false);

	//enter button
	useEffect(() => {
		function listener(event) {
			if (event.code === 'Enter' || event.code === 'NumpadEnter') {
				event.preventDefault();
				loginSubmit(event);
			}
		}
		document.addEventListener('keydown', listener);
		return () => {
			document.removeEventListener('keydown', listener);
		};
	});

	const emailOnChange = (event) => {
		setEmail(event.target.value);
	};

	const passwdOnChange = (event) => {
		setPasswd(event.target.value);
	};

	const remDetailsOnChange = (event) => {
		setRememberDetails(event.target.checked);
	};

	function loginSubmit(event) {
		event.preventDefault();
		if (email !== '' && passwd !== '') {
			props.handleLogin(email, passwd, rememberDetails);
		} else {
			alert('Enter all fields!');
		}
	}

	return (
		<form
			className='login_form'
			data-form-type='login'
			onSubmit={loginSubmit}>
			<h2 className='login_title'>Login</h2>
			<input
				type='email'
				name='email'
				placeholder='Enter email'
				onChange={emailOnChange}
			/>
			<input
				type='password'
				name='passwd'
				placeholder='Enter password'
				onChange={passwdOnChange}
			/>
			<label htmlFor='rememberDetails' className='remember_checkbox'>
				<input
					type='checkbox'
					name='rememberDetails'
					id='rememberDetails'
					className='checkbox_input'
					onChange={remDetailsOnChange}
				/>
				<div className='checkbox_box'></div>
				Remember login details.
			</label>
			<Link className='auth_link' to='/register'>
				Don't have an account? Sign up!
			</Link>
			<input type='submit' className='login_button' value='Submit' />
		</form>
	);
}

export default LoginForm;
