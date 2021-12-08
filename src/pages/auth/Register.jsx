import "./auth.css";
import RegisterForm from "../../components/RegisterForm";
import { createHash } from "crypto";
function Register() {
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

		if (searchIfAccountExistsLocal()) {
			alert("Email already exists!");
		} else {
			registerToLocal();
		}
	}

	//local stuff start
	function searchIfAccountExistsLocal() {
		if (localStorage.getItem(`${registerDetails.email}-email`)) {
			return true;
		}
		return false;
	}

	function registerToLocal() {
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
	//local stuff end

	function hash(input) {
		return createHash("sha256").update(input).digest("hex");
	}

	return (
		<div className='page_login'>
			<RegisterForm handleRegister={handleRegister} />
		</div>
	);
}

export default Register;
