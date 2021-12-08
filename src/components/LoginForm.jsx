import { Link } from "react-router-dom";
import { useState } from "react";

function LoginForm(props) {
	const [email, setEmail] = useState("");
	const [passwd, setPasswd] = useState("");

	const emailOnChange = (event) => {
		setEmail(event.target.value);
	};

	const passwdOnChange = (event) => {
		setPasswd(event.target.value);
	};

	function loginSubmit(event) {
		event.preventDefault();
		if (email !== "" && passwd !== "") {
			props.handleLogin(email, passwd);
		} else {
			alert("Enter all fields!");
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
			<Link className='auth_link' to='/register'>
				Don't have an account? Sign up!
			</Link>
			<input type='submit' className='login_button' value='Submit' />
		</form>
	);
}

export default LoginForm;
