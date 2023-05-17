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

	async function changeName() {
		if (fnameForChange && lnameForChange) {
			await fetch(`${process.env.REACT_APP_API_URI}/users/name`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('user-token') || sessionStorage.getItem('user-token')}`,
				},
				body: JSON.stringify({
					fname: fnameForChange,
					lname: lnameForChange,
				}),
			});

			setLoggedUser({
				_id: loggedUser._id,
				email: loggedUser.email,
				fname: fnameForChange,
				lname: lnameForChange,
			});
			props.toggle();
		} else {
			alert('Enter both fields!');
		}
	}

	return (
		<div className='change_name'>
			<input type='text' name='fname' id='fname' placeholder='First name' onChange={fnameOnChange} />
			<input type='text' name='lname' id='lname' placeholder='Last name' onChange={lnameOnChange} />
			<footer>
				<button onClick={props.toggle}>Cancel</button>
				<button onClick={changeName}>Confirm</button>
			</footer>
		</div>
	);
}

export default ChangeNamePopup;
