import { useState, useEffect } from 'react';

function ChangePasswordPopup(props) {
	const [passwordForChange, setPasswordForChange] = useState('');
	const [passwordConfForChange, setPasswordConfForChange] = useState('');

	//enter button
	useEffect(() => {
		function listener(event) {
			if (event.code === 'Enter' || event.code === 'NumpadEnter') {
				changePassword();
			}
		}
		document.addEventListener('keydown', listener);
		return () => {
			document.removeEventListener('keydown', listener);
		};
	});

	function passwordOnChange(event) {
		setPasswordForChange(event.target.value);
	}

	function passwordConfOnChange(event) {
		setPasswordConfForChange(event.target.value);
	}

	async function changePassword() {
		if (passwordForChange && passwordConfForChange) {
			if (passwordForChange === passwordConfForChange) {
				const res = await fetch(`${process.env.REACT_APP_API_URI}/users/password`, {
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${sessionStorage.getItem('user-token') || localStorage.getItem('user-token')}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						value: passwordForChange,
					}),
				});
				if (res.status === 200) {
					props.toggle();
				}
			} else {
				alert('Passwords do not match!');
			}
		} else {
			alert('Enter both fields!');
		}
	}

	return (
		<div className='change_name'>
			<input type='password' name='passwd' id='passwd' placeholder='New password' onChange={passwordOnChange} />
			<input type='password' name='passwd' id='passwd' placeholder='Confirm password' onChange={passwordConfOnChange} />
			<footer>
				<button onClick={props.toggle}>Cancel</button>
				<button onClick={changePassword}>Confirm</button>
			</footer>
		</div>
	);
}

export default ChangePasswordPopup;
