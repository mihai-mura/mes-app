import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RegisterForm(props) {
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [email, setEmail] = useState('');
	const [passwd, setPasswd] = useState('');
	const [passwdConf, setPasswdConf] = useState('');

	//enter button
	useEffect(() => {
		function listener(event) {
			if (event.code === 'Enter' || event.code === 'NumpadEnter') {
				event.preventDefault();
				registerSubmit(event);
			}
		}
		document.addEventListener('keydown', listener);
		return () => {
			document.removeEventListener('keydown', listener);
		};
	});

	function fnameOnChange(event) {
		setFname(event.target.value);
	}
	function lnameOnChange(event) {
		setLname(event.target.value);
	}
	function emailOnChange(event) {
		setEmail(event.target.value);
	}
	function passwdOnChange(event) {
		setPasswd(event.target.value);
	}
	function passwdConfOnChange(event) {
		setPasswdConf(event.target.value);
	}

	function registerSubmit(event) {
		event.preventDefault();
		if (
			fname === '' ||
			lname === '' ||
			email === '' ||
			passwd === '' ||
			passwdConf === ''
		) {
			alert('Enter all fields!');
		} else {
			if (passwdConf !== passwd) {
				alert('Passwords do not match!');
			} else props.handleRegister(fname, lname, email, passwd);
		}
	}

	return (
		<form
			className='register_form'
			data-form-type='register'
			onSubmit={registerSubmit}>
			<h2 className='register_title'>Create an account</h2>
			<div className='register_name'>
				<input
					type='text'
					name='fname'
					placeholder='First name'
					onChange={fnameOnChange}
				/>
				<input
					type='text'
					name='lname'
					placeholder='Last name'
					onChange={lnameOnChange}
				/>
			</div>
			<input
				type='email'
				name='email'
				placeholder='Email'
				onChange={emailOnChange}
			/>
			<input
				type='password'
				name='passwd'
				placeholder='Password'
				onChange={passwdOnChange}
			/>
			<input
				type='password'
				name='confirm_passwd'
				placeholder='Confirm password'
				onChange={passwdConfOnChange}
			/>
			<Link className='auth_link' to='/login'>
				Back to Login
			</Link>
			<input type='submit' value='Register' className='register_button' />
		</form>
	);
}

export default RegisterForm;
