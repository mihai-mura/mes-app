import { useContext, useState, useEffect } from 'react';
import { ContextLoggedUser } from '../AppContext';

function ChangeNamePopup(props) {
	const { loggedUser, setLoggedUser } = useContext(ContextLoggedUser);
	const [fnameForChange, setFnameForChange] = useState('');
	const [lnameForChange, setLnameForChange] = useState('');

	//enter button
	useEffect(() => {
		function listener(event) {
			if (event.code === 'Enter' || event.code === 'NumpadEnter') {
				changeName();
			}
		}
		document.addEventListener('keydown', listener);
		return () => {
			document.removeEventListener('keydown', listener);
		};
	});

	function fnameOnChange(event) {
		setFnameForChange(event.target.value);
	}

	function lnameOnChange(event) {
		setLnameForChange(event.target.value);
	}

	function changeName() {
		//*add alerts for incomplete inputs
		if (fnameForChange && lnameForChange) {
			//! change user name local
			localStorage.setItem(`${loggedUser.email}-fname`, fnameForChange);
			localStorage.setItem(`${loggedUser.email}-lname`, lnameForChange);
			setLoggedUser({
				fname: fnameForChange,
				lname: lnameForChange,
				email: loggedUser.email,
			});
			props.toggle();
		}
	}

	return (
		<div className='change_name'>
			<input type='text' name='fname' id='fname' placeholder='First name' onChange={fnameOnChange} />
			<input type='text' name='lname' id='lname' placeholder='Last name' onChange={lnameOnChange} />
			<footer>
				<button onClick={props.toggle}>Exit</button>
				<button onClick={changeName}>Ok</button>
			</footer>
		</div>
	);
}

export default ChangeNamePopup;
