import { BiLogOutCircle } from 'react-icons/bi';
import { useContext, useRef, useState } from 'react';
import { ContextDarkTheme, ContextLoggedUser } from '../AppContext';
import { CgRename, CgPassword } from 'react-icons/cg';
import imageCompression from 'browser-image-compression';

function UserSettings(props) {
	const { darkTheme } = useContext(ContextDarkTheme);
	const { loggedUser } = useContext(ContextLoggedUser);
	const profilePicInput = useRef(null);

	async function handleProfilePicChange() {
		profilePicInput.current.click();
		profilePicInput.current.onchange = async (event) => {
			//image compression
			const options = {
				maxSizeMB: 1,
				maxWidthOrHeight: 360,
				useWebWorker: true,
			};
			let compressedFile;

			try {
				compressedFile = await imageCompression(event.target.files[0], options);
			} catch (error) {
				console.log(error);
			}

			const formData = new FormData();
			formData.append('profilePic', compressedFile);

			const res = await fetch(`${process.env.REACT_APP_API_URI}/users/profilePic`, {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem('user-token') || localStorage.getItem('user-token')}`,
				},
				body: formData,
			});
			if (res.status === 200) {
				//! rerender profile pics
			}
		};
	}

	return (
		<ul className='user_settings'>
			<li onClick={handleProfilePicChange}>
				<p>Profile Picture</p>
				<img className='profile_pic' src={`${process.env.REACT_APP_API_URI}/users/profilePic/${loggedUser._id}`} />
				<input
					type='file'
					accept='.png, .jpeg, .jpg'
					name='profilePicPicker'
					id='profilePicPicker'
					ref={profilePicInput}
					style={{ display: 'none' }}
				/>
			</li>
			<li onClick={props.openChangeNamePopup}>
				<p>Change name</p>
				<CgRename className='settings_li_icon' />
			</li>
			<li onClick={props.openChangePasswordPopup}>
				<p>Change password</p>
				<CgPassword className='settings_li_icon' />
			</li>
			<li className='theme_li'>
				<label htmlFor='theme'>
					<p>DarkTheme</p>
					<input type='checkbox' name='theme' id='theme' onChange={props.handleThemeChange} checked={darkTheme} />
					<div className='theme_toggle'></div>
				</label>
			</li>
			<li onClick={props.logout}>
				<p>Logout</p>
				<BiLogOutCircle className='settings_li_icon' />
			</li>
		</ul>
	);
}

export default UserSettings;
