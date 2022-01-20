import { FiMenu } from 'react-icons/fi';

function ChatTitle(props) {
	//!profile pic
	return (
		<div className='chat_title'>
			<FiMenu className='mobile_menu' onClick={props.mobileMenuClick} />
			<img className='profile_pic' />
			<h4>
				{props.fname} {props.lname}
			</h4>
		</div>
	);
}

export default ChatTitle;
