import { useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';

function Head(props) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	useEffect(() => {
		setName('Mihai');
		setEmail('mihai.mura2@gmail.com');
	});

	return (
		<div className='head'>
			<div className='user_info'>
				<h4>{name}</h4>
				<p>{email}</p>
			</div>
			<FiMenu className='menu_icon' onClick={props.menuClick} />
		</div>
	);
}

export default Head;
