import './auth.css';
import LoginForm from '../../components/LoginForm';
import { createHash } from 'crypto';
function Login() {
	const loginDetails = {
		email: null,
		passwd: null,
	};

	function handleLogin(email, passwd) {
		loginDetails.email = email;
		loginDetails.passwd = passwd;

		loginDetails.passwd = hash(loginDetails.passwd);

		if (searchUserLocal()) {
			if (verifyPass()) {
				//todo change logged action

				console.log('logged');
			} else {
				alert('Passwords do not match!');
			}
		} else {
			alert('User does not exist!');
		}
	}

	//local stuff start

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

	//local stuff end

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
